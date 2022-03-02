const express = require('express');
const app = express();
const path = require("path");
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); //biblioteka cors pozwala nam na wyłączenie blokady
const port = process.env.PORT || 3001 ;
//db

mongoose.connect('mongodb+srv://siako:siako1234@notatka.yadtc.mongodb.net/node-siako?retryWrites=true&w=majority');

//parsery
//Content-Type: application/json
app.use(bodyParser.json());
//fix cors odblokowanie ścieżek na domenach
app.use(cors());


//routes
app.use('/', apiRouter);// /api/ zostanie dodane do wszystkich ścieżek automatycznie jak go tu umieścimy
///
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}
//serwer
app.listen(port, function(){
    console.log('serwer słucha ... http://localhost:'+ port);
});