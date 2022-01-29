const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function hasValidId(req, res, next) {
    const { movieId } = req.params;

    const movieList = await service.list();
    const isValid = movieList.some((movie) => movie.movie_id === Number(movieId))
    
    if (isValid) {
        res.locals.movieId = movieId
        next()
    } else {
        next({
            status: 404,
            message: `Request id, ${movieId}, does not exist.`
        })
    }
}

async function isShowing(req, res) {
    console.log("I'm testing!")
    const data = await service.isShowing();
    res.json({
        data,
    })
}

async function availableTheaters(req, res, next) {
    const data = await service.availableTheaters(res.locals.movieId)
    res.json({
        data,
    })
}

async function reviewList(req, res, next) {
    const reviewData = await service.reviewList(res.locals.movieId)
    const criticData = await service.criticList(res.locals.movieId)
    const data = reviewData.map((review) => {
        const critic = criticData.find((person) => person.critic_id === review.critic_id)
        return {
            ...review, 
            critic,
        }
    })
    res.json({
        data,
    })
}

async function read(req, res) {
    const data = await service.read(res.locals.movieId)
    res.json({
        data,
    })
}

async function list(req, res) {
    if (!req.query.is_showing) {
        const data = await service.list();
        res.json({
            data,
        })
    } else {
        const data = await service.isShowing();
        res.json({
            data,
        })
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    isShowing: asyncErrorBoundary(isShowing),
    read: [asyncErrorBoundary(hasValidId), asyncErrorBoundary(read)],
    availableTheaters: [asyncErrorBoundary(hasValidId), asyncErrorBoundary(availableTheaters)],
    reviewList: [asyncErrorBoundary(hasValidId), asyncErrorBoundary(reviewList)],
}