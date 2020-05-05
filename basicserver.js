if (process.env.NODE_ENV !== 'production') { //busca o .env
  require('dotenv').config()
}


const APIKEY=process.env.APIKEY             //cria var com a chave da API
const axios = require('axios')
const express = require('express')
const app = express()


app.use(express.json())
app.use(express.static("arq_web"))

//função para receber lat e long do front
app.post('/gettingcoord', (req, res) => {
    const api_url = `https://api.darksky.net/forecast/${APIKEY}/${req.body.lat},${req.body.lon}?units=auto` //busca JSON na API
    
  axios({
    url: api_url,
    responseType: 'json'
  }).then(data => res.json(data.data))      // returna JSON pego
})
    
         
app.listen(8080, () => {                    //abre servidor na porta 8080
  console.log('Server Started')
})