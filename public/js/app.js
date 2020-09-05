console.log('cs')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('click', (e) => {
    e.preventDefault();
    const location = search.value
    
    if (location.length === 0) {
        return console.log('Please enter something')
    }

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = `Error: ${data.error}`
                return console.log('Error', data.error)
            } else {
                messageOne.textContent = `Weather at Location: ${data.location}`
                messageTwo.textContent = `${data.temperature} degrees (feels like ${data.feelslike} degreees). 
                    ${data.description}. Humiditiy is ${data.humidity}`
                console.log(data)
            }
        })
    })
})
