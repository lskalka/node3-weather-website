const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Resistance is futile!',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    const address = req.query.address

    geocode(address, (geoError, geoData) => {
        if (geoError) {
            return res.send({ error: geoError })
        }
        
        const {latitude, longitude, location} = geoData
        forecast(latitude, longitude, (weatherError, weatherData) => {
            if (weatherError) {
                return res.send({ error: weatherError})
            }

            const { temperature, feelslike, description } = weatherData

            res.send({
                address,
                location,
                temperature,
                feelslike,
                description
                
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }


    
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Not Found',
        message: 'Help article not found.',
        name: 'Lukasz'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        message: 'Page not found',
        name: 'Lukasz'
    })
})

app.listen(port, () => {
    console.log('Server started on port 3000')
})