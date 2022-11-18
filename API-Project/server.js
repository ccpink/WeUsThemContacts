const express = require ('express');
const routes = require('./routes/contact'); // import the routes
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
var cors = require('cors')
require('dotenv').config();


const app = express();

app.use(helmet());
app.use(compression());
app.use(cors())
app.use('/uploads', express.static('./uploads'));

mongoose.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

app.use(express.json());

app.use('/', routes); //to use the routes

app.route('/')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/index.html');
    });

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})


