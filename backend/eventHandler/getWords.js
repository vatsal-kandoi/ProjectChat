var request = require('request')

let getWords = (question) => {
    console.log(process.env.PARSER)
    return new Promise((resolve,reject) => {
        request.post(process.env.PARSER, {
            json: {
                question,
            }
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                return reject({status:false, message: "Error getting data"})
            }
            if (res.statusCode === 200){
                return resolve({status: true, data: body.data});
            }
            return resolve({status: false, message: "Couldn't decode."})
        });
    });
}

module.exports = { getWords } ;