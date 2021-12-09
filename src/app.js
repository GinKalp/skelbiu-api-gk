const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')
const config = require('./dbConfig')

const PORT = config.serverPort || 3000


// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})
