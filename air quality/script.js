const { response } = require("express")

let weather = {
    "apiKey":"1c0ce1800a7dde654e654313bd432df7"
    fetchWeather: function(){
        fetch(

        ).then((response) => response.json())
        .then((data)=> console.log(data));
    }, 
};