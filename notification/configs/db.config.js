require('dotenv').config();

module.exports = {
    DB_NAME:process.env.DATABASE,  //Database name from .env file
    DB_URL:process.env.DATABASE_URL //Database url from .env file
}