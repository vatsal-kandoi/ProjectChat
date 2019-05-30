var fs = require("fs");
var { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

var { findMatch } = require("./findMatch");

if (isMainThread) {
    var getData = (inputData) => {
        return new Promise((resolve,reject) => {
            try {
                fs.readFile('./data.json', (err, data) => {  
                    if (err) throw err;
                    let dataRead = JSON.parse(data);
                    let keys = Object.keys(dataRead);
                    let key;
                    let worker = new Worker(__filename, { workerData: { data: inputData[0], keys } });
                    worker.on('message', (outputData) => {
                        key = outputData;
                        if (key === "None") {
                            return resolve({status: false, message: "Not found"});
                        } else{
                            return resolve({status:true, message:"Found", data: dataRead[key]});
                        }
                    });
                    worker.on('error', (err) => {
                        console.log(err);
                        throw new Error("Error in worker thread");
                    });
                    worker.on('exit', (code) => {
                        if (code !== 0) throw new Error();
                    });
                });
            } catch (err) {
                return reject({status: false, message: "Error"});
            }
        })
    } 
    module.exports = { getData };
} else {
    let match = findMatch(workerData.data,workerData.keys);
    parentPort.postMessage(match);
}
