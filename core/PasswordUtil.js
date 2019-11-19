const bcrypt = require('bcrypt');

const iterations = 10;

class PasswordUtil {

    static hash(value) {
        return bcrypt.hashSync(value, iterations);
    }

    static equals(value, hash) {
        return bcrypt.compareSync(value, hash);
    }
}

module.exports = PasswordUtil;