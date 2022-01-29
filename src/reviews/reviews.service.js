const knex = require("../db/connection");

async function relevantCritics() {
    return knex("critics")
      .select("*")
}

async function update( updatedReview, reviewId  ) {
    return knex("reviews")
      .select("*")
      .where({ review_id: reviewId })
      .update(updatedReview, "*")
}

async function read( reviewId ) {
    return knex("reviews")
      .select("*")
      .where({ review_id: reviewId })
      .first()
}

async function destroy( reviewId ) {
    return knex("reviews")
      .where({ review_id: reviewId })
      .del()
}

async function list() {
    return knex("reviews")
      .select("*")
}

module.exports = {
    read,
    update,
    destroy,
    list,
    relevantCritics,
}