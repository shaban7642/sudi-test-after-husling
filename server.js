// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const { ExpressPeerServer } = require('peer');

const app = express();
app.use(cors('*'));
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// View Engine
app.set('view engine', 'ejs');
// set the views "folder" is the views
app.set('views', 'views');

// app.use(express.static(path.join(__dirname, '/views/build')));

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render('index');
});

app.get('/chat', (req, res) => {
    // res.sendFile(__dirname + '/views/user-media.html');
    // res.redirect('http://127.0.0.1:3000')


    res.render("user-media")
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});

// peerjs server
const peerServer = ExpressPeerServer(listener, {
    debug: true,
    path: '/myapp',
});

app.use('/peerjs', peerServer);
