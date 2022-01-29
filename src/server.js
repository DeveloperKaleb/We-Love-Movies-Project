const { PORT = 5000 } = process.env;
const sqllite3 = require("sqlite3").verbose();

const app = require("./app");
const knex = require("./db/connection");

let db = new sqllite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log("Connected to the in-memory SQLite database")
});

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);

  
