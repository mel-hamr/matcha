const checkDbExist = "SELECT 1 FROM pg_database WHERE datname = 'matcha'";
const createDb = "CREATE DATABASE matcha";
const createTable = ` 
  CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL,
    "email_address" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255),
    "sexual_preference" VARCHAR(255),
    "biography" VARCHAR(255),
    "images" VARCHAR(255)[],
    "tags" VARCHAR(255)[],
    "fame_rating" INT [],
    "latitude" VARCHAR(255),
    "longitude" VARCHAR(255),
    "verified" BOOLEAN,
    PRIMARY KEY ("id")
  );
  CREATE TABLE views (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    view_id INT REFERENCES users(id),
    UNIQUE (user_id, view_id)
  );

`;
module.exports = {
  checkDbExist,
  createDb,
  createTable,
};

