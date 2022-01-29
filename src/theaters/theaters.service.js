const knex = require("../db/connection");

async function relevantMovies() {
    return knex("movies").select("*")
}

async function isPlaying() {
    return knex("movies_theaters").select("*")
}

async function list() {
    return knex("theaters").select("*")
}

module.exports = {
    list,
    relevantMovies,
    isPlaying,
}