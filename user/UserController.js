const LoginService = require('../auth/LoginService');
/**
 *
 * @param app
 * @param service
 * @param jsonParser
 * @param conn - Database connection
 */
module.exports.controller = function (app, service, {jsonParser, conn}) {
    app.use(['/users*'], (req, res, next) => LoginService.authorize(req, res, next));

    /**
     * creates a new user
     */
    app.post('/users', jsonParser, (req, res) => {
        return service.createUser(req.body).then(({data, code = 200}) => {
            return res.status(code).send(data);
        }).catch(({err, code = 500}) => {
            return res.status(code).send(err);
        });
    });


    /**
     * Fetches a user
     */
    app.get('/users/:id', jsonParser, (req, res) => {
        return service.getUser(req.params['id'], req['session']).then(({data, code = 200}) => {
            return res.status(code).send(data)
        }).catch(({err, code}) => {
            return res.status(code).send(err);
        });
    });
};