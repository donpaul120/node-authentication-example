const jwt = require('jsonwebtoken');

//Modularize using closures!

module.exports = (function () {

    class Session {
        constructor(token, user, expiryTime, extras) {
            Object.defineProperties(this, {
                "token": {value: token, writable: false},
                "extras": {value: extras, writable: false},
                "user": {value: user, writable: false},
                "expiryTime": {value: expiryTime, writable: false},
            })
        }
        getToken() {
            return this.token;
        }

        getUser(token) {
            return this.user;
        }

        getExpiryTime(){
            return this.expiryTime;
        }
    }

    //Builder for creating Sessions....
    Session.Builder = function () {
        let token = {},
            user,/* @type user */
            expiryTime = 3600 * 3600,
            extras = {};
        return {
            setUser(_user){
                user = _user;
                return this;
            },

            setExpiryTime(time){
                expiryTime = time;
                return this;
            },

            addExtra(key, value){
                if (value) extras[key] = value;
                return this;
            },


            build(){
                token = {
                    sub: user.id,
                    exp: Math.floor(Date.now() / 1000) + expiryTime,
                    name: user.username,
                    extras
                };
                token = jwt.sign(token, process.env.JWT_SECRET_KEY);
                //Hmmm... we can as well save the token on a storage like redis
                return new Session(token, user, expiryTime)
            }
        }
    };

    Session.Validator = function(){
        return {
            validate(_token){
                //promisify it...
                return new Promise((res, rej)=>{
                    jwt.verify(_token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                        if(err) return rej(err);
                        const user =  {id:decoded.sub, username:decoded.name};
                        let extras = decoded.extras;
                        let expiryTime = decoded.exp;
                        return res(new Session(_token, user, expiryTime, extras))
                    })
                });
            }
        }
    }();

    return Session;

})();