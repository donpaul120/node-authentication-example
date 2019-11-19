const ValidatorJS = require('validatorjs');

/**
 * let this serves as an abstract class
 * @abstract
 */
class Validator {

    constructor() {}

    /**
     * Subclasses should override
     * @returns {{}}
     */
    rules() {
        return {}
    }

    validate(data = {}) {
        return new ValidatorJS(data, this.rules(), this.customError());
    }

    customError(){
        return null;
    }


}

module.exports = Validator;
