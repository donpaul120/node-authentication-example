require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
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
const LoginService = require('./modules/auth/LoginService');
const UserService = require('./modules/user/UserService');
const UserRepo = require('./modules/user/UserRepo');

require('./modules/auth/LoginController').controller(app, new LoginService(new UserRepo(conn)), {jsonParser});
require('./modules/user/UserController').controller(app, new UserService(new UserRepo(conn)), {jsonParser});





http.listen(9003, () => console.log(`Started Server at 9003`));