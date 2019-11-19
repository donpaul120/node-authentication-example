require('dotenv').config();
const LoginService = require('../modules/auth/LoginService');


it("Should fail if the login credentials are invalid",  function(){
    //Arrange

    const loginSvc = new LoginService({
        findByUsername(username) {
            return Promise.resolve({});
        }
    });

    const username = null, password = null;

    return expect(loginSvc.login({username, password})).rejects.toEqual(expect.objectContaining({
        code:400
    }));

});

it("Should pass if the login credentials are invalid",  function(){
    //Arrange
    const loginSvc = new LoginService({
        findByUsername(username) {
            return Promise.resolve({
                username:"admin@andela.com",
                password:"$2y$10$ExOtM6qRNc/fQd7NYyMpZ.vrBuyoGyq4DTjyWWYFO9rMx07L/aurK"
            });
        }
    });

    const username = "admin@andela.com", password = "adebim$";

    return expect(loginSvc.login({username, password})).resolves.toEqual(expect.objectContaining({
        status:'success'
    }));

});
