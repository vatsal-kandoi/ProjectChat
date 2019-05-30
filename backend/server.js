var express = require("express");
var bodyParser = require("body-parser");

var { getWords } = require("./eventHandler/getWords");
var { getData } = require("./eventHandler/getData");
var { storeQuestion } = require("./eventHandler/addQuestion");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/static",express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    return res.render("index");
})

app.post('/', (req,res) => {
    let flag = false;
    getWords(req.body.question).then((result) => {
        if (result.status === false) {
            flag = true;
            return res.json({status:false, message: "Couldn't find message"});
        }
        return getData(result.data);
    })
    .then((result) => {
        if(!flag){
            if (result.status === false) {
                flag = true;
                res.send({status:false, message: "Couldn't find message"});
                return storeQuestion(req.body.question);
            }
            flag = true;
            return res.json({status:true, message: "Found", data: result.data});
        }
    })
    .then((result) => {
        
    })
    .catch((err) => {
        if (!flag) return res.json({status: false, message: "Error"});
        else console.log(err);
    })
});
app.use('*', (req,res) => {
    return res.render("404");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Application is running.");
})
