const LoginValidator = require('../auth/LoginValidator');

it("Should fail if the password is less than 5", ()=>{
    //Arrange
    const loginValidator = new LoginValidator();
    //Act
    const validate = loginValidator.validate({password:"ab", username:"admin@andela.com"});

    //Assert
    expect(validate.passes()).toBeFalsy();

    console.log(validate.errors);

});

it("Should fail if the password doesn't contain atleast 5 to 8 alpha-numeric characters with at-least a special character/symbol", ()=>{
    //Arrange
    const loginValidator = new LoginValidator();
    //Act
    const validate = loginValidator.validate({password:"abcde", username: "admin@andela.com"});

    //Assert
    expect(validate.passes()).toBeFalsy();
});



it("Should fail if the username is not an email address", ()=>{
    //Arrange
    const loginValidator = new LoginValidator();
    //Act
    const validate = loginValidator.validate({username:"admin@", password:"abcde@"});

    //Assert
    expect(validate.passes()).toBeFalsy();
});

it("Should pass if the the username and password are valid", ()=>{
    //Arrange
    const loginValidator = new LoginValidator();
    //Act
    const validate = loginValidator.validate({username:"admin@andela.com", password:"abcde@"});

    //Assert
    expect(validate.passes()).toBeTruthy();
});