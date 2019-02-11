var MYAPPID = '7c1521895b69ec9cfd07c9fe6652b735';
var forecast_json;

window.onload=function() {
  f('insertHour');
  getDataWeather();
};

var f = function() {
       var date = new Date();
       var heure =date.getHours();
       var minutes=date.getMinutes();
       var seconde=date.getSeconds();
       document.getElementById("insertHour").innerHTML="Bonjour il est "+heure+":"+(minutes > 9 ? "" + minutes: "0" + minutes)+":"+(seconde > 9 ? "" + seconde: "0" + seconde);
       setTimeout(f, 1000);}
       setTimeout(f, 1000);

function  init_Vue()
{

    var weather_0 = forecast_json.list[0].valueOf();
    var weather = new Vue({
                        el: '#weather',
                        data: {
                            dataWeather : weather_0
                        }
                    });
}

function getDataWeather()
{

  var xmlhttp = new XMLHttpRequest();
  var url = 'https://api.openweathermap.org/data/2.5/forecast?lon=3.066667&lat=50.633333&APPID='+MYAPPID+'&units=metric&lang=fr';

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          forecast_json = JSON.parse(this.responseText);
          init_Vue();
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}


function getMinMaxTemp(days) {
    var today = new Date();
    var day = new Date();
    var min;
    var max;
    day.setDate(today.getDate()+days);
    day_str = formatDate(day);
    for(i in forecast_json.list)
    {
      if(forecast_json.list[i].dt_txt.includes(day_str)  )
      {
        if(min==null)
        {
          min = forecast_json.list[i].main.temp_min;

        }
        else if (min>parseInt(forecast_json.list[i].main.temp_min.valueOf())) {
          min = forecast_json.list[i].main.temp_min;
        }

        if(max==null)
        {
          max = forecast_json.list[i].main.temp_max;

        }
        else if (max<parseInt(forecast_json.list[i].main.temp_max.valueOf())) {
          max = forecast_json.list[i].main.temp_max;
        }

      }
    }
    return [min,max];
}

function getForecast(days)
{
  var today = new Date();
  var day = new Date();
  day.setDate(today.getDate()+days);
  tomorrow_str = formatDate(day)+" 12:00:00";
  for(i in forecast_json.list)
  {
    if(forecast_json.list[i].dt_txt == tomorrow_str)
    {
      return forecast_json.list[i].valueOf()
    }
  }

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
