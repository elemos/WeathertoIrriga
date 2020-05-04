if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const APIKEY=process.env.APIKEY
const axios = require('axios')
const express = require('express')
const app = express()


app.use(express.json())
app.use(express.static("arq_web"))


app.post('/gettingcoord', (req, res) => {
    const api_url = `https://api.darksky.net/forecast/${APIKEY}/${req.body.lat},${req.body.lon}?units=auto`
    
  axios({
    url: api_url,
    responseType: 'json'
  }).then(data => res.json(data.data))
})
    
         
app.listen(8080, () => {
  console.log('Server Started')
})