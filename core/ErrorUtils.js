module.exports = function () {

    return {
        BadRequest: (msg = "Invalid Request", data = {}) => {
            return {
                status: 'fail',
                msg,
                data: {data},
                code: 400
            }
        },
        InvalidLogin: {
            "status": "fail",
            err: {
                message: "Invalid Username or Password"
            },
            code: 401
        },
        UnAuthorizedAccess: {
            "status": "fail",
            msg: "Unauthorized Access!!!",
        },
        ResourceNotFound:(message)=>{
            return {
                status:'fail',
                err:{
                    message
                },
                code: 404
            }
        },
        RecordAlreadyExist: (message='Record Already Exist')=> {
            return {
                status: "fail",
                err: {
                    message
                },
                code: 400
            }
        }
    }
}();