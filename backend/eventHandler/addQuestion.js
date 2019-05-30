var { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

var fs = require("fs");

if (isMainThread) {
    let storeQuestion = (question) => {
        let worker = new Worker(__filename, { workerData: { question } });
        let message = "";
        worker.on('message', (outputData) => {
            message += outputData;
        });
        worker.on('error', (err) => {
            return Promise.reject({status:false, error:err})
        });
        worker.on('exit', (code) => {
            if (message === "Done") return Promise.resolve({status: true, message: "Done"});
            else Promise.resolve({status: false, message: "Error writing to file"});
        });
    }     
    module.exports = { storeQuestion }
} else {
    let readable = fs.createReadStream('./unanswered.txt',{encoding:"utf-8"});
    let writable = fs.createWriteStream('./unanswered1.txt',{encoding:"utf-8"});
    readable.on('data', (chunk) => {
        writable.write(chunk);
    });
    readable.on('end', () => {
        writable.write("\n"+workerData.question);
        writable.end();
    });
    fs.unlinkSync('./unanswered.txt');
    fs.renameSync('./unanswered1.txt', './unanswered.txt' );
    parentPort.postMessage("Done");   
}

