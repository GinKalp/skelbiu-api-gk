const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')

const PORT = process.env.PORT || 3000

const authRouter = require('./routes/authRouter')
const listingsRouter = require('./routes/listingsRouter')
const favoritesRouter = require('./routes/favoritesRouter')

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
// app.use('/images', express.static(path.resolve('src', 'assets/images')));
app.use('/auth', authRouter)
app.use('/listings', listingsRouter)
app.use('/favorites', favoritesRouter)

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})

app.all('*', (req, res) =>{
    res.status(404).send('Page not found')
})