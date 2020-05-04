const tempo = document.querySelector('[cur_temp]')
const summary = document.querySelector('[cur_summary]')
const umidade = document.querySelector('[cur_umidade]')
const velvento = document.querySelector('[cur_velvento]')
const preciptation = document.querySelector('[cur_prec]')
const volume = document.querySelector('[cur_volume]')
const d_max = document.querySelector('[daily_max]')
const d_min = document.querySelector('[daily_min]')
const city_name = document.querySelector('[city_name]')
const con_time = document.querySelector('[con_time]')

var time = new Date('1970-01-01T00:00:00');


  
if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            
           
        fetch('/gettingcoord',{
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
              lat: lat,
              lon: lon
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            setdatatofront(data)
            })
        });
    } else {
         console.error("Geolocation is not supported by this browser!");
    }


function setdatatofront(data){
    tempo.textContent = parseInt(`${data.currently.temperature}`,10) + "°C"
    summary.textContent = data.currently.summary
    umidade.textContent = parseInt(`${data.currently.humidity * 100}`, 10) + "%"
    velvento.textContent = data.currently.windSpeed + " m/s"
    preciptation.textContent = `${data.currently.precipProbability * 100}%`
    volume.textContent = data.currently.precipIntensity + " mm"
    d_max.textContent = parseInt(`${data.daily.data[0].temperatureMax}`,10) + "°C"
    d_min.textContent = parseInt(`${data.daily.data[0].temperatureMin}`,10) + "°C" 
    time.setSeconds(time.getSeconds() + `${data.currently.time}`)
    con_time.textContent = "Consultado: " + time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " as " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    
}