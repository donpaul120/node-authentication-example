const AppRepo = require('../core/AppRepo');

class UserRepo extends AppRepo {

    constructor(conn) {
        super(conn);
        this.tableName = "users";
    }

    findByUsername(username) {
        return this.db.table(this.tableName).where({username})
            //optionally format database response
            .then(results => results.shift())
    }

}

module.exports = UserRepo;