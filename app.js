const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/",(req,res)=>{
    console.log("Post request recieved");
    var cname = req.body.cname;
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=0494a0422434307e75b5ecb182b549e4&q=${cname}&units=${units}`;
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var icon = weatherData.weather[0].icon;
        
            res.write("<h1>The current temperture in " + cname + " is " + temp + " degree Celcius.</h1>");
            res.write("<h3>" + weatherData.weather[0].description + "</h3>");
            res.write(`<img src = "https://openweathermap.org/img/wn/${icon}@4x.png" alt="img">`);
            res.send();
        })
    });    
});
// app.get("/",(req,res)=>{
//     const url = "https://samples.openweathermap.org/data/2.5/weather?appid=0494a0422434307e75b5ecb182b549e4&q=London";
//     https.get(url,(response)=>{
//         console.log(response.statusCode);
//         response.on("data",(data)=>{
//             var weatherData = JSON.parse(data);
//             var temp = Math.floor((weatherData.main.temp-273)*100)/100;
//             var icon = weatherData.weather[0].icon;

//             res.write("<h1>The current temperture in London is " + temp + " degree Celcius.</h1>");
//             res.write("<h3>" + weatherData.weather[0].description + "</h3>");
//             res.write(`<img src = "https://openweathermap.org/img/wn/${icon}@4x.png" alt="img">`);
//             res.send();
//         })
//     })
// })

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});