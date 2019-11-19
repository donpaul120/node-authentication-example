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
            'username': 'required|email',
            'first_name':'string'
        }
    }

    customError() {
        return {
            'regex.password': "Password must be between a minimum of 5 and a maximum of 8 with at-least one special character",
            'email.username': "Username must be a valid email address"
        }
    }

}

module.exports = LoginValidator;