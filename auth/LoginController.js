/**
 *
 * @param app
 * @param service
 * @param jsonParser
 * @param conn - Database connection
 */
module.exports.controller = function (app, service, {jsonParser, conn}) {
    app.post('/login', jsonParser, (req, res) => {
        console.log(req.body);
        return service.login(req.body).then(({data, code}) => {
            res.status(code).send(data);
        }).catch(({err, code}) => {
            res.status(code).send(err);
        });
    });
};