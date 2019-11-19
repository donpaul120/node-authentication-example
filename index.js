require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({extended: false, limit: '5mb'});
const jsonParser = bodyParser.json();

const app = express();
const http = require('http').Server(app);
const conn = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    }
});

//Service and Repo Declaration
const LoginService = require('./auth/LoginService');
const UserService = require('./user/UserService');
const UserRepo = require('./user/UserRepo');

require('./auth/LoginController').controller(app, new LoginService(new UserRepo(conn)), {jsonParser});
require('./user/UserController').controller(app, new UserService(new UserRepo(conn)), {jsonParser});





http.listen(9003, () => console.log(`Started Server at 9003`));