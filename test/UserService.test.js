require('dotenv').config();
const UserService = require('../modules/user/UserService');


it("Should fail if the user details doesn't match the criteria",  function(){
    //Arrange
    const userService = new UserService({
        findByUsername(username) {
            return Promise.resolve({});
        }
    });

    const username = null, password = null;

    return expect(userService.createUser({username, password})).rejects.toEqual(expect.objectContaining({
        code:400
    }));

});

it("Should create a user if the credentials are correct",  function(){
    //Arrange
    const userService = new UserService({
        findByUsername(username) {
            return Promise.resolve(null);
        },
        create(data){
            return Promise.resolve(1)
        }
    });

    const user = {username:"admin@andela.com", password :"adebim$"};

    return expect(userService.createUser(user)).resolves.toEqual(expect.objectContaining({
        status:'success'
    }));
});



it("getUser should return a user successfully",  function(){
    //Arrange
    const userService = new UserService({
        findById(id) {
            return {"id":1, username:"andela@admin.com"};
        }
    });

    return expect(userService.getUser(1)).resolves.toEqual(expect.objectContaining({
        status:'success',
        data:{
            id:1,
            username:"andela@admin.com"
        }
    }));
});
