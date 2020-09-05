const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a84955679503184f0ef3a79f99e6b831&query=${lat},${lng}&units=f`
    console.log('Weather URL', url)
    request({url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services.')
        } else if ( response.body.error ) {
            callback('Unable to get weather data for specified coordinates')
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                description: response.body.current.weather_descriptions[0]
            })
        }
    })
}


module.exports = forecast