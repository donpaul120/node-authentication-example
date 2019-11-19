const UserValidator = require('./UserValidator');
const ErrorUtil = require('../core/ErrorUtils');
const PasswordUtil = require('../core/PasswordUtil');

class UserService {

    constructor(repo) {
        this.validator = new UserValidator();
        this.userRepo = repo;
    }

    async createUser(body = {}) {
        //validate
        let validate = this.validator.validate(body);

        if (validate.fails()) return Promise.reject(ErrorUtil.BadRequest("Bad Request", validate.errors));

        const {username, password} = body;

        //check
        const user = await this.userRepo.findByUsername(username);

        if (user) return Promise.reject(ErrorUtil.RecordAlreadyExist(`username '${username}' already exist`));

        //Ideally we'd use a user model and create user
        const newUser = {...body};

        newUser.password = PasswordUtil.hash(body.password);

        newUser.id = await this.userRepo.create(body);

        //TODO we can use a response builder or an util
        return {
            status: 'success',
            data: newUser,
        }
    }

    async getUser(userId, session) {
        const user = await this.userRepo.findById(userId);
        if(!user) return Promise.reject(ErrorUtil.ResourceNotFound())

        return {
            status:'success',
            data: user
        }
    }

}

module.exports = UserService;