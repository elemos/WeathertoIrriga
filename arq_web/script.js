const temp =            document.querySelector('[cur_temp]')
const summary =         document.querySelector('[cur_summary]')
const umidade =         document.querySelector('[cur_umidade]')
const velvento =        document.querySelector('[cur_velvento]')
const preciptation =    document.querySelector('[cur_prec]')
const volume =          document.querySelector('[cur_volume]')
const d_max =           document.querySelector('[daily_max]')
const d_min =           document.querySelector('[daily_min]')
const city_name =       document.querySelector('[city_name]')
const con_time =        document.querySelector('[con_time]')

var time =              new Date('1970-01-01T00:00:00');
var today =             new Date();


//função para setar valores no .html
function setdatatofront(data){
    temp.textContent =          parseInt(`${data.currently.temperature}`,10) + "°C"
    summary.textContent =       data.currently.summary
    umidade.textContent =       parseInt(`${data.currently.humidity * 100}`, 10) + "%"
    velvento.textContent =      data.currently.windSpeed + " m/s"
    preciptation.textContent =  `${data.currently.precipProbability * 100}%`
    volume.textContent =        data.currently.precipIntensity + " mm"
    d_max.textContent =         parseInt(`${data.daily.data[0].temperatureMax}`,10) + "°C"
    d_min.textContent =         parseInt(`${data.daily.data[0].temperatureMin}`,10) + "°C" 
    
    time.setSeconds(time.getSeconds() + `${data.currently.time}` - 10800)
    con_time.textContent = "Consultado: " + time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " as " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    
}


//função para armazenar dados na memória do browser
function setdatatocache(data){
    localStorage.setItem('time',         data.currently.time)
    localStorage.setItem('temp',         data.currently.temperature)
    localStorage.setItem('summary',      data.currently.summary)
    localStorage.setItem('umidade',      data.currently.humidity)
    localStorage.setItem('velvento',     data.currently.windSpeed)
    localStorage.setItem('preciptation', data.currently.precipProbability)
    localStorage.setItem('volume',       data.currently.precipIntensity)
    localStorage.setItem('temp_max',     data.daily.data[0].temperatureMax)
    localStorage.setItem('temp_min',     data.daily.data[0].temperatureMin)
}


//função para pegar localização atual do browser
function getlocation(){
    if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude


            fetch('/gettingcoord',{
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Accept' :      "application/json"
                },
                body: JSON.stringify({
                  lat: lat,
                  lon: lon
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                setdatatofront(data)
                setdatatocache(data)
                })
            });
        } else {
             console.error("Geolocation is not supported by this browser!");
        }
}


//MAIN
//testa se já existe item na memória do navegador, se não tiver chama a API
if(localStorage.getItem('time') == null){  
    console.log("cheguei")
    getlocation()
}
else{
    
    //criar váriaveis de data para verificar o timestamp no browser do cliente
    var old_date = new Date('1970-01-01T00:00:00')
    var new_date = new Date()
    old_date.setSeconds(old_date.getSeconds() + localStorage.getItem('time') - 10800)
    var diff = (new_date - old_date) / 1000 / 60;  //calcula difenreça do timestamp da ultima consulta com o horário atual.
    
    //se a diferença for maior que 15 chama a API para nova consulta, se não busca os dados armazenados no browser do client
    if(diff >=15){
        getlocation()    
    }
    else {
        //pega os dados do browser do cliente e manda para o html
        temp.textContent =          localStorage.getItem('temp')
        summary.textContent =       localStorage.getItem('summary')
        umidade.textContent =       localStorage.getItem('umidade')
        velvento.textContent =      localStorage.getItem('velvento')
        preciptation.textContent =  localStorage.getItem('preciptation')
        volume.textContent =        localStorage.getItem('volume')
        d_max.textContent =         localStorage.getItem('temp_max')
        d_min.textContent =         localStorage.getItem('temp_min')
        
        con_time.textContent =      "Consultado: " + old_date.getDate() + "/" + (old_date.getMonth()+1) + "/" + old_date.getFullYear() + " as " + old_date.getHours() + ":" + old_date.getMinutes() + ":" + old_date.getSeconds()
    }
   
}