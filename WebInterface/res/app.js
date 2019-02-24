var MYAPPID = '7c1521895b69ec9cfd07c9fe6652b735';
var forecast_json;

window.onload=function() {
  f('insertHour');
  updateDays();
  getDataWeather();
};

var f = function() {
       var date = new Date();
       var heure =date.getHours();
       var minutes=date.getMinutes();
       var seconde=date.getSeconds();
       var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
       document.getElementById("insertDate").innerHTML=(new Date()).toLocaleDateString("fr-FR", options) ;
       document.getElementById("insertHour").innerHTML=heure+":"+(minutes > 9 ? "" + minutes: "0" + minutes)+":"+(seconde > 9 ? "" + seconde: "0" + seconde);
       setTimeout(f, 1000);}
       setTimeout(f, 1000);

function  init_Vue()
{
    var weather_0 = forecast_json.list[0].valueOf();
    var weather0 = new Vue({
                        el: '#weather',
                        data: {
                            dataWeather : weather_0,
                        },
                        mounted: function () {
                          var code = weather_0.weather[0].id;
                          document.getElementById("weather_icon").className = "owf owf-"+code+" owf-7x owf-pull-left";
                        },
                    });
    var weather_1 = getForecast(1);
    var weather1 = new Vue({
              el: '#weather1',
              data: {
                  dataWeather : weather_1
              },
              methods: {
                minMaxCalc: function(days) {
                  return getMinMaxTemp(days);
                }

              },
              mounted: function () {
                var code = weather_1.weather[0].id;
                document.getElementById("weather1_icon").className = "owf owf-"+code+" owf-5x owf-pull-left";
              },
    });

    var weather_2 = getForecast(2);
    var weather2 = new Vue({
              el: '#weather2',
              data: {
                  dataWeather : weather_2
                },
                methods: {
                  minMaxCalc: function(days) {
                    return getMinMaxTemp(days);
                  }
                },
                mounted: function () {
                  var code = weather_2.weather[0].id;
                  document.getElementById("weather2_icon").className = "owf owf-"+code+" owf-5x owf-pull-left";
                },
    });
    var weather_3 = getForecast(3);
    var weather3 = new Vue({
              el: '#weather3',
              data: {
                  dataWeather : weather_3
                },
                methods: {
                  minMaxCalc: function(days) {
                    return getMinMaxTemp(days);
                  }
                },
                mounted: function () {
                  var code = weather_3.weather[0].id;
                  document.getElementById("weather3_icon").className = "owf owf-"+code+" owf-5x owf-pull-left";
                }
    });
    var weather_4 = getForecast(4);
    var weather4 = new Vue({
              el: '#weather4',
              data: {
                  dataWeather : weather_4
                },
                methods: {
                  minMaxCalc: function(days) {
                    return getMinMaxTemp(days);
                  }
                },
                mounted: function () {
                  var code = weather_4.weather[0].id;
                  document.getElementById("weather4_icon").className = "owf owf-"+code+" owf-5x owf-pull-left";
                }
    });

}

function updateDays()
{
    var today = new Date();
    var j_2 = new Date();
    var j_3 = new Date();
    var j_4 = new Date();
    j_2.setDate(today.getDate()+2);
    j_3.setDate(today.getDate()+3);
    j_4.setDate(today.getDate()+4);
    document.getElementById("day_J+2").innerHTML = j_2.toLocaleDateString("fr-FR", { weekday: 'long',day: 'numeric' }).charAt(0).toUpperCase() +  j_2.toLocaleDateString("fr-FR", { weekday: 'long',day: 'numeric' }).substring(1).toLowerCase();
    document.getElementById("day_J+3").innerHTML = j_3.toLocaleDateString("fr-FR", { weekday: 'long',day: 'numeric' }).charAt(0).toUpperCase() +  j_3.toLocaleDateString("fr-FR", { weekday: 'long',day: 'numeric' }).substring(1).toLowerCase();
    document.getElementById("day_J+4").innerHTML = j_4.toLocaleDateString("fr-FR", { weekday: 'long',day: 'numeric' }).charAt(0).toUpperCase() +  j_4.toLocaleDateString("fr-FR", { weekday: 'long',day: 'numeric' }).substring(1).toLowerCase();
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
