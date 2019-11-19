const Validator = require('../../core/Validator');

//min length 5, max 8
//contain alpha-numeric with atleast one symbol


//username should be an email and it's validated
//store this
class LoginValidator extends Validator {

    constructor(props) {
        super(props);
    }


    rules() {
        return {
            'password': ['required', 'min:5', 'max:8', 'regex:/^(?=.*[A-Za-z])(?=.*?[#?!@$%^&*-]).{5,}$/'],
            'username': 'required|email'
        }
    }

    customError() {
        return {
            'regex.password': "Invalid username or password",
            'email.username': "Invalid username or password"
        }
    }

}

module.exports = LoginValidator;