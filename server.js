const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.static('public'));
const { DB_URI } = require('./config/keys');
//Bring in Model
const Img = require('./models/Images')


//Setup to read data from body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Connection to db
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('DB Connected'))
.catch(err => console.log('Error connecting to DB', err));



//When page loads on front end, find all collections and send as Json
 app.get('/scores', (req, res) => {
    Img.find({}, (err, result) => err ? console.log(err) : res.json(result));
 })

//Initial Post route to set up collections easier. After collections exist I want to update existing collections, not create new ones so other requests now send to PUT route.
app.post('/scores', (req, res) => {
    //Pull data from req.body
    const { imgIndex, score } = req.body;
    //Create instance of Img model. Saving id as imgIndex to track each images respective score
    let newScore = new Img({
        id: imgIndex,
        score
    });
    //Save data
    newScore.save((err, result) => err ? console.log(err) : res.json(result));
})
    
app.put('/scores', (req, res) => {
    //Pull out values from req.body object;
    const { imgIndex, score } = req.body;
    //Find the collection that has id equal to imageIndex --> ensures I'm saving data to correct image collection. After finding image acore is updated
    Img.findOneAndUpdate({ id: imgIndex }, { score }, (err, score) => (
        //If error, console.log, otherwise send client receipt
        err ? console.log(err) : res.json(score)
    ))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));