const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    
    const movieData = await service.relevantMovies();
    const showingData = await service.isPlaying()
    const theaterData = await service.list();

    const data = theaterData.map((theater) => {
        // Each theater object is mapped to add relevant movies
        const movies = movieData.filter((movie) => {
            // Each movie object if filtered to determine whether it is showing at the movie currently being mapped
            const showing = showingData.some((showing) => 
              // Each showing is checked to see if the movie is showing at the currently mapped theater
              showing.movie_id === movie.movie_id && 
              showing.theater_id === theater.theater_id &&
              // We're not using strict equality here because the data returned return '1' instead of true
              showing.is_showing == true 
              )
            return showing
        })
        return {
            ...theater,
            movies,
        }
    })

    res.json({
        data, 
    })
}

module.exports = {
    list: asyncErrorBoundary(list),
}