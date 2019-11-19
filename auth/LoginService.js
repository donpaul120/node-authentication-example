const LoginValidator = require('./LoginValidator');
const ErrorUtil = require('../core/ErrorUtils');
const PasswordUtil = require('../core/PasswordUtil');
const SessionManager = require('../core/SessionManager');

class LoginService {

    constructor(repo) {
        this.validator = new LoginValidator();
        this.userRepo = repo;
    }

    async login(body = {}) {
        //validate
        let validate = this.validator.validate(body);

        if (validate.fails()) return Promise.reject(ErrorUtil.BadRequest("Bad Request", validate.errors));

        const {username, password} = body;

        //check
        const user = await this.userRepo.findByUsername(username).catch(err=> Promise.reject({status:'fail', err, code:500}));

        /*
         * If the user is null or the password doesn't match we simply return invalid login response.
         */
        if (!user || PasswordUtil.equals(user.password, password)) {
            console.log("Test", ErrorUtil.InvalidLogin);
            return Promise.reject(ErrorUtil.InvalidLogin);
        }

        const session = SessionManager.Builder().setUser(user).setExpiryTime(120000).build();

        //TODO we can use a response builder or an util
        console.log(session.getToken());
        return {
            status: 'success',
            token: session.getToken(),
            data: user
        }
    }

    //serves as middle ware
     static async authorize(req, res, next) {
        const token = req.header('x-andela-token');
        console.log(token);
        if (!token) return res.status(401).send(ErrorUtil.UnAuthorizedAccess);
        req.session =  await SessionManager.Validator.validate(token).catch(err => {
            //We can equally check if the error is a bad json token etc
            return res.status(401).send(ErrorUtil.UnAuthorizedAccess);
        });
        if (req.session) return next();
    }
}

module.exports = LoginService;