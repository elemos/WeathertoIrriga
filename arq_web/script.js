const estado_ceu =      document.querySelector('[estado_ceu]')
const temp =            document.querySelector('[cur_temp]')
const umidade =         document.querySelector('[cur_umidade]')
const velvento =        document.querySelector('[cur_velvento]')
const preciptation =    document.querySelector('[cur_prec]')
const volume =          document.querySelector('[cur_volume]')
const d_max =           document.querySelector('[daily_max]')
const d_min =           document.querySelector('[daily_min]')
const city_name =       document.querySelector('[city_name]')
const con_time =        document.querySelector('[con_time]')

//constantes dos 5 dias
const dia1_min =        document.querySelector('[prox_dia_min]')
const dia1_max =        document.querySelector('[prox_dia_max]')
const dia2_min =        document.querySelector('[prox_dia_2_min]')
const dia2_max =        document.querySelector('[prox_dia_2_max]')
const dia3_min =        document.querySelector('[prox_dia_3_min]')
const dia3_max =        document.querySelector('[prox_dia_3_max]')
const dia4_min =        document.querySelector('[prox_dia_4_min]')
const dia4_max =        document.querySelector('[prox_dia_4_max]')
const dia5_min =        document.querySelector('[prox_dia_5_min]')
const dia5_max =        document.querySelector('[prox_dia_5_max]')
const dia1_velvento =   document.querySelector('[prox_dia_vento]')
const dia2_velvento =   document.querySelector('[prox_dia_2_vento]')
const dia3_velvento =   document.querySelector('[prox_dia_3_vento]')
const dia4_velvento =   document.querySelector('[prox_dia_4_vento]')
const dia5_velvento =   document.querySelector('[prox_dia_5_vento]')
const dia1_precip =     document.querySelector('[prox_dia_precip]')
const dia2_precip =     document.querySelector('[prox_dia_2_precip]')
const dia3_precip=      document.querySelector('[prox_dia_3_precip]')
const dia4_precip =     document.querySelector('[prox_dia_4_precip]')
const dia5_precip =     document.querySelector('[prox_dia_5_precip]')
const dia1 =            document.querySelector('[prox_dia]')
const dia2 =            document.querySelector('[prox_dia_2]')
const dia3 =            document.querySelector('[prox_dia_3]')
const dia4 =            document.querySelector('[prox_dia_4]')
const dia5 =            document.querySelector('[prox_dia_5]')

var time = new Date('1970-01-01T00:00:00');                                    //cria var de data com valor base.

//Altera os icones e o texto de definição
function alt_icon(icon, id){
    document.getElementById(id).src = "Imagens/" + icon + ".svg";
    if(id == "currently"){
    switch (icon){
        case 'clear-day': 
            estado_ceu.textContent = "Ensolarado"
            break;
        case 'clear-night': 
            estado_ceu.textContent = "Ceú aberto"
            break;
        case 'rain': 
            estado_ceu.textContent = "Chuvoso"
            break;
        case 'snow': 
            estado_ceu.textContent = "Neve"
            break;
        case 'sleet': 
            estado_ceueu.textContent = "Granizo"
            break;
        case 'wind': 
            estado_ceueu.textContent = "Ventos Fortes"
            break;
        case 'fog': 
            estado_ceu.textContent = "Neblina"
            break;
        case 'Cloudy': 
            estado_ceu.textContent = "Nublado"
            break;    
        case 'partly-cloudy-day': 
            estado_ceu.textContent = "Parcialmente nublado"
            break; 
        case 'partly-cloudy-day': 
            estado_ceu.textContent = "Parcialmente nublado"
            break;  
    }
    }
}

//altera dia da semana para previsões futuras
function at_week_day_default(){
    //atualiza dias da semana 
    var temp_date = new Date();
    dia1.textContent = at_week_day(temp_date.getDay(temp_date.setDate(temp_date.getDate() + 1)))
    dia2.textContent = at_week_day(temp_date.getDay(temp_date.setDate(temp_date.getDate() + 1)))
    dia3.textContent = at_week_day(temp_date.getDay(temp_date.setDate(temp_date.getDate() + 1)))
    dia4.textContent = at_week_day(temp_date.getDay(temp_date.setDate(temp_date.getDate() + 1)))
    dia5.textContent = at_week_day(temp_date.getDay(temp_date.setDate(temp_date.getDate() + 1)))
}
//função para retornar a data
function at_week_day(dia){
    switch (dia){
        case 0:
            return 'Domingo';
        case 2:
            return 'Segunda-feira';
        case 2:
            return 'Terça-feira';
        case 3:
            return 'Quarta-feira';
        case 4:
            return 'Quinta-feira';
        case 5:
            return 'Sexta-feira';
        case 6:
            return 'Sabado';
    }
}

//função para setar valores no .html
function set_data_to_front(data){
    temp.textContent =          Math.round(`${data.currently.temperature}`) + "°C"         //temperatura                                      //estado
    umidade.textContent =       Math.round(`${data.currently.humidity * 100}`) + "%"      //umidade
    velvento.textContent =      data.currently.windSpeed + " m/s"                           //velocidade do vento
    preciptation.textContent =  `${data.currently.precipProbability * 100}%`                //possibilidade de chuva
    volume.textContent =        data.currently.precipIntensity + " mm"                      // volume de chuva
    d_max.textContent =         Math.round(`${data.daily.data[0].temperatureMax}`) + "°C"  //temperatura máxima estimada 
    d_min.textContent =         Math.round(`${data.daily.data[0].temperatureMin}`) + "°C"  //temperatua miníma estimada
    
    alt_icon(data.currently.icon, 'currently')                                             //altera icone
    
    //converte UTC baseado no offset dentro do JSON da API
    if (data.offset < 0){ 
        console.log("deu erro aqui")
         time.setSeconds(time.getSeconds() + `${data.currently.time}` - (Math.abs(data.offset * 3600)))
    }
    else time.setSeconds(time.getSeconds() + `${data.currently.time}` + (Math.abs(data.offset * 3600)))
     
    con_time.textContent = "Consultado: " + time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " as " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    
    
    
    //atualiza valores do front-end dos 5 próximos dias
    //atualiza temperatura min e max
    dia1_min.textContent = Math.round(`${data.daily.data[1].temperatureMin}`) + "°C"
    dia1_max.textContent = Math.round(`${data.daily.data[1].temperatureMax}`) + "°C"
    dia2_min.textContent = Math.round(`${data.daily.data[2].temperatureMin}`) + "°C"
    dia2_max.textContent = Math.round(`${data.daily.data[2].temperatureMax}`) + "°C"
    dia3_min.textContent = Math.round(`${data.daily.data[3].temperatureMin}`) + "°C"
    dia3_max.textContent = Math.round(`${data.daily.data[3].temperatureMax}`) + "°C"
    dia4_min.textContent = Math.round(`${data.daily.data[4].temperatureMin}`) + "°C"
    dia4_max.textContent = Math.round(`${data.daily.data[4].temperatureMax}`) + "°C"
    dia5_min.textContent = Math.round(`${data.daily.data[5].temperatureMin}`) + "°C"
    dia5_max.textContent = Math.round(`${data.daily.data[5].temperatureMax}`) + "°C"
    

    //atualiza velocidade do vento
    dia1_velvento.textContent = data.daily.data[1].windSpeed + "m/s"
    dia2_velvento.textContent = data.daily.data[2].windSpeed + "m/s"
    dia3_velvento.textContent = data.daily.data[3].windSpeed + "m/s"
    dia4_velvento.textContent = data.daily.data[4].windSpeed + "m/s"
    dia5_velvento.textContent = data.daily.data[5].windSpeed + "m/s"
    
    //atualiza prepciptação
    dia1_precip.textContent = `${data.daily.data[1].precipProbability * 100}` + "%"
    dia2_precip.textContent = `${data.daily.data[2].precipProbability * 100}` + "%"
    dia3_precip.textContent = `${data.daily.data[3].precipProbability * 100}` + "%"
    dia4_precip.textContent = `${data.daily.data[4].precipProbability * 100}` + "%"
    dia5_precip.textContent = `${data.daily.data[5].precipProbability * 100}` + "%"
    
    //atualiza os icones
    alt_icon(data.daily.data[1].icon, "icon_day_1")
    alt_icon(data.daily.data[2].icon, "icon_day_2")
    alt_icon(data.daily.data[3].icon, "icon_day_3")
    alt_icon(data.daily.data[4].icon, "icon_day_4")
    alt_icon(data.daily.data[5].icon, "icon_day_5")
    
    at_week_day_default()
    
}


//função para armazenar dados na memória do browser
function set_data_to_cache(data){
    localStorage.setItem('time',          data.currently.time)
    localStorage.setItem('temp',          data.currently.temperature)
    localStorage.setItem('icon',          data.currently.icon)
    localStorage.setItem('umidade',       data.currently.humidity)
    localStorage.setItem('velvento',      data.currently.windSpeed)
    localStorage.setItem('preciptation',  data.currently.precipProbability)
    localStorage.setItem('volume',        data.currently.precipIntensity)
    localStorage.setItem('temp_max',      data.daily.data[0].temperatureMax)
    localStorage.setItem('temp_min',      data.daily.data[0].temperatureMin)
    localStorage.setItem('dia_1_max',     data.daily.data[1].temperatureMax)
    localStorage.setItem('dia_1_min',     data.daily.data[1].temperatureMin)
    localStorage.setItem('dia_2_max',     data.daily.data[2].temperatureMax)
    localStorage.setItem('dia_2_min',     data.daily.data[2].temperatureMin)
    localStorage.setItem('dia_3_max',     data.daily.data[3].temperatureMax)
    localStorage.setItem('dia_3_min',     data.daily.data[3].temperatureMin)
    localStorage.setItem('dia_4_max',     data.daily.data[4].temperatureMax)
    localStorage.setItem('dia_4_min',     data.daily.data[4].temperatureMin)
    localStorage.setItem('dia_5_max',     data.daily.data[5].temperatureMax)
    localStorage.setItem('dia_5_min',     data.daily.data[5].temperatureMin)
    
    localStorage.setItem('dia_1_precip',     data.daily.data[1].precipProbability)
    localStorage.setItem('dia_2_precip',     data.daily.data[2].precipProbability)
    localStorage.setItem('dia_3_precip',     data.daily.data[3].precipProbability)
    localStorage.setItem('dia_4_precip',     data.daily.data[4].precipProbability)
    localStorage.setItem('dia_5_precip',     data.daily.data[5].precipProbability)
    
    
    localStorage.setItem('dia_1_vento',     data.daily.data[1].windSpeed)
    localStorage.setItem('dia_2_vento',     data.daily.data[2].windSpeed)
    localStorage.setItem('dia_3_vento',     data.daily.data[3].windSpeed)
    localStorage.setItem('dia_4_vento',     data.daily.data[4].windSpeed)
    localStorage.setItem('dia_5_vento',     data.daily.data[5].windSpeed)
    
    localStorage.setItem("icon_day_1",   data.daily.data[1].icon)
    localStorage.setItem("icon_day_2",   data.daily.data[2].icon)
    localStorage.setItem("icon_day_3",   data.daily.data[3].icon)
    localStorage.setItem("icon_day_4",   data.daily.data[4].icon)
    localStorage.setItem("icon_day_5",   data.daily.data[5].icon)
    
    localStorage.setItem('offset', data.offset)
    
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
                set_data_to_front(data)
                set_data_to_cache(data)
                })
            });
        } else {
             console.error("Geolocation is not supported by this browser!");
        }
}


//MAIN
//testa se já existe o timestamp na memória do navegador, se não tiver chama a API
if(localStorage.getItem('time') == null){  
    getlocation()
}
else{
    
    //criar váriaveis de data para verificar o timestamp no browser do cliente
    var old_date = new Date('1970-01-01T00:00:00')
    var new_date = new Date()
    var offset = (localStorage.getItem('offset'))                                                           //Pega o offset do navegador
    
    if (offset < 0){
        
        old_date.setSeconds(old_date.getSeconds() + localStorage.getItem('time') - Math.abs(offset * 3600)) // correção de UTC baseado no offset
    }
    else {
        old_date.setSeconds(old_date.getSeconds() + localStorage.getItem('time') + Math.abs(offset * 3600))
    }
    var diff = (new_date - old_date) / 1000 / 60;                                                           //calcula difenreça do timestamp da ultima                                                                                                             //consulta com o horário atual. 
    
    //se a diferença for maior que 15 chama a API para nova consulta, se não busca os dados armazenados no browser do client
    if(diff >=15){
        getlocation()    
    }
    else {
        //pega os dados do browser do cliente e manda para o html
        temp.textContent =          Math.round(localStorage.getItem('temp'))     + "°C"
        umidade.textContent =       localStorage.getItem('umidade') * 100  + "%"
        velvento.textContent =      localStorage.getItem('velvento') + "m/s"
        preciptation.textContent =  `${localStorage.getItem('preciptation') * 100 }` + "%"
        volume.textContent =        localStorage.getItem('volume')  + "mm"
        d_max.textContent =         Math.round(localStorage.getItem('temp_max')) + "°C"
        d_min.textContent =         Math.round(localStorage.getItem('temp_min')) + "°C"
        
        con_time.textContent =      "Consultado: " + old_date.getDate() + "/" + (old_date.getMonth()+1) + "/" + old_date.getFullYear() + " as " + old_date.getHours() + ":" + old_date.getMinutes() + ":" + old_date.getSeconds()

        alt_icon(localStorage.getItem('icon'), "currently")                                                  //altera icone
        
        //atualiza o front dos próximos dias pegando do browser do cliente 
        dia1_min.textContent = Math.round(localStorage.getItem('dia_1_min')) + "°C"
        dia1_max.textContent = Math.round(localStorage.getItem('dia_1_max')) + "°C"
        dia2_min.textContent = Math.round(localStorage.getItem('dia_2_min')) + "°C"
        dia2_max.textContent = Math.round(localStorage.getItem('dia_2_max')) + "°C"
        dia3_min.textContent = Math.round(localStorage.getItem('dia_3_min')) + "°C"
        dia3_max.textContent = Math.round(localStorage.getItem('dia_3_max')) + "°C"
        dia4_min.textContent = Math.round(localStorage.getItem('dia_4_min')) + "°C"
        dia4_max.textContent = Math.round(localStorage.getItem('dia_4_max')) + "°C"
        dia5_min.textContent = Math.round(localStorage.getItem('dia_5_min')) + "°C"
        dia5_max.textContent = Math.round(localStorage.getItem('dia_5_max')) + "°C"
        
        //atualiza o front dos próximos dias pegando do browser do cliente  
        dia1_velvento.textContent = localStorage.getItem('dia_1_vento') + "m/s"
        dia2_velvento.textContent = localStorage.getItem('dia_2_vento') + "m/s"
        dia3_velvento.textContent = localStorage.getItem('dia_3_vento') + "m/s"
        dia4_velvento.textContent = localStorage.getItem('dia_4_vento') + "m/s"
        dia5_velvento.textContent = localStorage.getItem('dia_5_vento') + "m/s"
        
        //atualiza o front dos próximos dias pegando do browser do cliente
        dia1_precip.textContent = `${localStorage.getItem('dia_1_precip') * 100}` + "%"
        dia2_precip.textContent = `${localStorage.getItem('dia_2_precip') * 100}` + "%"
        dia3_precip.textContent = `${localStorage.getItem('dia_3_precip') * 100}` + "%"
        dia4_precip.textContent = `${localStorage.getItem('dia_4_precip') * 100}` + "%"
        dia5_precip.textContent = `${localStorage.getItem('dia_5_precip') * 100}` + "%"
        
        //atualiza os icons pegando do browser do cliente
        alt_icon(localStorage.getItem('icon_day_1'), "icon_day_1")
        alt_icon(localStorage.getItem('icon_day_2'), "icon_day_2")
        alt_icon(localStorage.getItem('icon_day_3'), "icon_day_3")
        alt_icon(localStorage.getItem('icon_day_4'), "icon_day_4")
        alt_icon(localStorage.getItem('icon_day_5'), "icon_day_5")
        
        at_week_day_default()
    }
   
}