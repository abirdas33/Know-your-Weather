const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var city = 'Kolkata';
  
app.get('/',(req,res) => {
    var url = 'https://api.apixu.com/v1/forecast.json?key=6dba922084174fc597555605192003&q=' + city + '&days=5';

     request( url, (error,response,body) => {
        var dates = [];
        var temp = [];
        var humidity = [];
        var precipitation = [];     
     if(!error){
             weather_json = JSON.parse(body);
             items = weather_json.forecast.forecastday;
             //console.log(items);
                items.forEach(result => {
                    temp.push(result.day.avgtemp_c);
                    humidity.push(result.day.avghumidity);
                    precipitation.push(result.day.totalprecip_mm);
                    dates.push(result.date);
                });
           
                res.render('./second',{
                    city: city,
                    list: weather_json,
                    temp: JSON.stringify(temp),
                    humidity: JSON.stringify(humidity),
                    precipitation:JSON.stringify(precipitation),
                    dates:JSON.stringify(dates)
                });
            
         }else{
             console.log(error);
         } 
     });
});

app.post('/',(req,res) => {
    city = req.body.city_name;
    res.redirect('/');
});




const PORT = process.env.PORT || 3000;
app.listen(PORT);