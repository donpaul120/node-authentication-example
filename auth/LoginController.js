/**
 *
 * @param app
 * @param service
 * @param jsonParser
 * @param conn - Database connection
 */
module.exports.controller = function (app, service, {jsonParser, conn}) {
    app.post('/login', jsonParser, (req, res) => {
        return service.login(req.body).then(({data, code=200}) => {
            res.status(code).send(data);
        }).catch(({err, code=500}) => {
            res.status(code).send(err);
        });
    });
};