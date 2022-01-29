const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function hasValidId(req, res, next) {
    const { reviewId } = req.params;

    const reviewList = await service.list();
    const isValid = reviewList.some((review) => review.review_id === Number(reviewId))
    
    if (isValid) {
        res.locals.reviewId = reviewId
        next()
    } else {
        next({
            status: 404,
            message: `Review cannot be found.`
        })
    }
}

async function destroy(req, res) {
    await service.destroy( res.locals.reviewId )
    res.sendStatus(204)
}

async function update(req, res) {
    await service.update( req.body.data, res.locals.reviewId )
    const review = await service.read( res.locals.reviewId )
    const criticList = await service.relevantCritics()
    const critic = criticList.find((person) => person.critic_id === review.critic_id)
    const data = {
        ...review,
        critic,
    }
    res.json({
        data,
    })
}

module.exports = {
  update: [asyncErrorBoundary(hasValidId), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(hasValidId), asyncErrorBoundary(destroy)]
}
