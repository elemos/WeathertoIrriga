var darkskyURL = 'https://api.darksky.net/forecast/cc57eded744c264838f0f10fec22fca4/';
        var request = new XMLHttpRequest();
        request.open('GET', darkskyURL);
        request.responseType = 'json';
        request.send();
        request.onload = function(){
            var teste = request.response;
            console.log(teste);
        }