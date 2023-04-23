var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//MongoDB connection
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://kaurbanwait46:admin@cluster0.sc9swk7.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})
let dbCollection;

//Project Collection
function dbConnection(collectionName) {
    client.connect(err => {
        dbCollection = client.db().collection(collectionName);
        if(!err){
            console.log('DB Connected')
            console.log(dbCollection);
        }
        else {
            console.error(err);
            process.exit(1);
        }
    });
}

//insert project
const insertcat = (cat,callback) => {
    dbCollection.insertOne(cat, callback);
}
//post api
app.post('/api/cats',(req,res) => {
    let cat = req.body;
    var newProject = req.body;
    insertcat(newProject,(err,result) => {
        if(err){
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message: "Cat Successfully added", data: result})
        }
    });
});



//const cardList = [
    //{
     //   title: "Kitten 2",
     //   image: "images/kitten-2.jpg",
     //   link: "About Kitten 2",
     //   desciption: "Demo desciption about kitten 2"
    //},
   // {
     //   title: "Kitten 3",
     //   image: "images/kitten-3.jpg",
     //   link: "About Kitten 3",
     //   desciption: "Demo desciption about kitten 3"
   // }
//];


app.get('/api/cats',(req,res) => {
    getAllCats((err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
    res.json({statusCode: 200, data: cardList, message:'Successful'})
        }
    });
})

function insert(cat, callback) {
    dbCollection.insertOne(cat, callback);
}

function getAllCats(callback){
    dbCollection.find().toArray(callback);
}


var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log('App listening to: ' + port);
    dbConnection('Cats');
})
