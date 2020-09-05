const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY29yd2lud2VmZWluIiwiYSI6ImNrZWx3Z2VuYjA0MDUydG84dnAya3dkenYifQ.tfaYJKIiN3PEzplfF57WBQ&limit=1'
    
    request({ url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services.');
        } else if (response.body.features.length == 0) {
            callback('Unable to geocode specified address.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode