const knex = require("../db/connection")

async function isShowing() {
    return knex("movies as m")
      .distinct()
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
}

async function availableTheaters( movieId ) {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.is_showing": true, "m.movie_id": movieId })
}

async function reviewList( movieId ) {
    return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId })
}

async function criticList( movieId ) {
    return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("c.*")
    .where({ "m.movie_id": movieId })
}

async function read( movieId ) {
    return knex("movies")
      .select("*")
      .where({ movie_id: movieId })
      .first()     
}

async function list() {
    return knex("movies").select("*")
};

module.exports = {
    list,
    isShowing,
    read,
    availableTheaters,
    reviewList,
    criticList,
}