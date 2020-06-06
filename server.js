var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

app.use(formidable());
app.use(express.static("public"));


app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
  });

// app.get("/", function (req, res) {
//    console.log(req) 
// });

const postsUrl = __dirname + '/data/posts.json';

app.post('/create-post', function (req, res) {

    fs.readFile(postsUrl, function(error, file){
        var parsedFile = JSON.parse(file);        
        let date = JSON.stringify(Date.now());
        if (parsedFile[date] == undefined){
            let blogpost = req.fields['blogpost'];
            parsedFile[date] = blogpost;
            fs.writeFile(postsUrl, JSON.stringify(parsedFile), function (error) {    
                if(error) {
                    console.log(error);
                }else {
                    console.log(`${date} was added successfully`);
                }
            });
        }else{
            console.log(`${date} was already added`);
        }
    });
});

app.get('/get-posts', function(req, res){
    fs.readFile(postsUrl, function (error, file) {    
        var parsedFile = JSON.parse(file);
        res.send(parsedFile);
    });
});