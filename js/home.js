$(document).ready(function(){

    $('#getWeatherButton').click(function(){
        var zipcode = $('#zipCodeSearchBox').val();
        var units = $('#unitSelector').val();
        clearInformation();

        if(validateZipcode(zipcode)){  //validate zip code length and if anything is in the input
            getCurrentWeather(zipcode, units);
            getFiveDayForecast(zipcode, units);
        }else{
            $('#errorMessagesDiv').append($('<li>').attr({class:'list-group list-group-item-danger'}).text('Zipcode:You must enter a valid 5 digit Zipcode'));
        }
    });
});

function getCurrentWeather(zipCode, units){
    var appId = 'b41f53f7ba27916b26666d458b054c52'
    $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode,
        data:{
            units: units,
            appid: appId

        },
        success: function(weatherArray){
            var currentWeatherIconUrl = 'https://openweathermap.org/img/w/'+ weatherArray.weather[0].icon +'.png';
            
            
            $('#currentConditionsDiv').show();

            //Current day forecast
            $('#cityName').append('Current Conditions for ' + weatherArray.name)
            $('#iconHeading').append($('<img>').attr({src:currentWeatherIconUrl})).append(weatherArray.weather[0].main + ': '+ weatherArray.weather[0].description);
            
            //Select whether  metric or imperial will be displayed
            if(units === 'metric'){
                $('#cityTemperatureP').append('<b>Temperature: </b>' + weatherArray.main.temp + ' C<br>');
                $('#cityTemperatureP').append('<b>Humidity: </b>' + weatherArray.main.humidity + '%<br>');
                $('#cityTemperatureP').append('<b>Wind: </b>' + weatherArray.wind.speed + 'miles/hour');
            }else{
                $('#cityTemperatureP').append('<b>Temperature: </b>' + weatherArray.main.temp + ' F<br>');
                $('#cityTemperatureP').append('<b>Humidity: </b>' + weatherArray.main.humidity + '%<br>');
                $('#cityTemperatureP').append('<b>Wind: </b>' + weatherArray.wind.speed + 'miles/hour');
            }
        },
        error: function(){
            alert('Zipcode not found!');
        }

    });
}
function getFiveDayForecast(zipCode, units){
    var appId = 'b41f53f7ba27916b26666d458b054c52'

    $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?zip='+zipCode,
        data:{
            units: units,
            appid: appId

        },
        success: function(weatherArray){
            var dateRegex = /\d\d\d\d-\d\d-\d\d/;
            var monthsNames = ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'];

            //Icons for each day
            var day1IconUrl = 'https://openweathermap.org/img/w/'+ weatherArray.list[0].weather[0].icon  +'.png';
            var day2IconUrl = 'https://openweathermap.org/img/w/'+ weatherArray.list[8].weather[0].icon  +'.png';
            var day3IconUrl = 'https://openweathermap.org/img/w/'+ weatherArray.list[16].weather[0].icon  +'.png';
            var day4IconUrl = 'https://openweathermap.org/img/w/'+ weatherArray.list[24].weather[0].icon  +'.png';
            var day5IconUrl = 'https://openweathermap.org/img/w/'+ weatherArray.list[32].weather[0].icon  +'.png';           
            //Dates for forecast
            var day1Date = new Date(dateRegex.exec(weatherArray.list[0].dt_txt));
            var day2Date = new Date(dateRegex.exec(weatherArray.list[8].dt_txt));
            var day3Date = new Date(dateRegex.exec(weatherArray.list[16].dt_txt));
            var day4Date = new Date(dateRegex.exec(weatherArray.list[24].dt_txt));
            var day5Date = new Date(dateRegex.exec(weatherArray.list[32].dt_txt));
            //Shows forecast div
            $('#fiveDayForecastDiv').show();

            //Loop to populate days
            for(i=1;i<6;i++){
                for(j=0; j<32; j+=8){
                    $('#day'+ i +'Div').append(day1Date.getDate()+1 + ' ' + monthsNames[day1Date.getMonth()] + '<br>');
                    $('#day1Div').append($('<img>').attr({src:day1IconUrl}));
                    $('#day1Div').append(weatherArray.list[0].weather[0].main + '<br>');
                    if(units === 'metric'){
                        $('#day1Div').append('H'+ weatherArray.list[0].main.temp_max + ' C  '
                            + 'L' + weatherArray.list[0].main.temp_min + ' C');
                    }else{
                        $('#day1Div').append('H'+ weatherArray.list[0].main.temp_max + ' F  '
                        + 'L' + weatherArray.list[0].main.temp_min + ' F');
                    }
                }
            }
            //This will be refactored after implementing a working solution
            //Day 1 Information
            $('#day1Div').append(day1Date.getDate()+1 + ' ' + monthsNames[day1Date.getMonth()] + '<br>');
            $('#day1Div').append($('<img>').attr({src:day1IconUrl}));
            $('#day1Div').append(weatherArray.list[0].weather[0].main + '<br>');
            if(units === 'metric'){
                $('#day1Div').append('H'+ weatherArray.list[0].main.temp_max + ' C  '
                    + 'L' + weatherArray.list[0].main.temp_min + ' C');
            }else{
                $('#day1Div').append('H'+ weatherArray.list[0].main.temp_max + ' F  '
                + 'L' + weatherArray.list[0].main.temp_min + ' F');
            }

            //Day 2 Information
            $('#day2Div').append(day2Date.getDate()+1 +' '+ monthsNames[day2Date.getMonth()] + '<br>');
            $('#day2Div').append($('<img>').attr({src:day2IconUrl}));
            $('#day2Div').append(weatherArray.list[8].weather[0].main + '<br>');
            if(units === 'metric'){
                $('#day2Div').append('H'+ weatherArray.list[8].main.temp_max + ' C  '
                    + 'L' + weatherArray.list[8].main.temp_min + ' C');
            }else{
                $('#day2Div').append('H'+ weatherArray.list[8].main.temp_max + ' F  '
                + 'L' + weatherArray.list[8].main.temp_min + ' F');
            }

            //Day 3 Information
            $('#day3Div').append(day3Date.getDate()+1 +' ' + monthsNames[day3Date.getMonth()] +'<br>');
            $('#day3Div').append($('<img>').attr({src:day3IconUrl}));
            $('#day3Div').append(weatherArray.list[16].weather[0].main + '<br>');
            if(units === 'metric'){
                $('#day3Div').append('H'+ weatherArray.list[16].main.temp_max + ' C  '
                    + 'L' + weatherArray.list[16].main.temp_min + ' C');
            }else{
                $('#day3Div').append('H'+ weatherArray.list[16].main.temp_max + ' F  '
                + 'L' + weatherArray.list[16].main.temp_min + ' F');
            }

            //Day 4 Information
            $('#day4Div').append(day4Date.getDate()+1 + ' ' +monthsNames[day4Date.getMonth()]+ '<br>');
            $('#day4Div').append($('<img>').attr({src:day4IconUrl}));
            $('#day4Div').append(weatherArray.list[24].weather[0].main + '<br>');
            if(units === 'metric'){
                $('#day4Div').append('H'+ weatherArray.list[24].main.temp_max + ' C  '
                    + 'L' + weatherArray.list[24].main.temp_min + ' C');
            }else{
                $('#day4Div').append('H'+ weatherArray.list[24].main.temp_max + ' F  '
                + 'L' + weatherArray.list[24].main.temp_min + ' F');
            }

            //Day 5 Information
            $('#day5Div').append(day5Date.getDate()+1 +' '+ monthsNames[day5Date.getMonth()] + '<br>');
            $('#day5Div').append($('<img>').attr({src:day5IconUrl}));
            $('#day5Div').append(weatherArray.list[32].weather[0].main + '<br>');
            if(units === 'metric'){
                $('#day5Div').append('H'+ weatherArray.list[32].main.temp_max + ' C  '
                    + 'L' + weatherArray.list[32].main.temp_min + ' C');
            }else{
                $('#day5Div').append('H'+ weatherArray.list[32].main.temp_max + ' F  '
                + 'L' + weatherArray.list[32].main.temp_min + ' F');
            }
  
        },
        error: function(){
            alert('Zipcode not found!');
        }

    });
}

function validateZipcode(zipCode){
    if(zipCode.length > 5 || zipCode.length < 5|| zipCode ===""|| zipCode===null){
        clearInformation();
        return false;
    }else{
        clearInformation();
        return true;
    }
}

function clearInformation(){
    $('#errorMessagesDiv').empty();
    $('#cityName').empty();
    $('#iconHeading').empty();
    $('#cityTemperatureP').empty();
    $('#day1Div').empty();
    $('#day2Div').empty();
    $('#day3Div').empty();
    $('#day4Div').empty();
    $('#day5Div').empty();
}