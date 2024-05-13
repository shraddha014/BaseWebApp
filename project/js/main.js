function showPicture(){
  // use jQuery ($ is shorthand) to find the div on the page and then change the html
  // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
  $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
  $("p").html("High five! You're building your first web app!");

  // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more
  
}


function showProjectList(){
  $("#projects").html("<ul class='nav'><li class='nav-item'>Weather<ul class='nav'><li class='nav-item'><a class='nav-link' href='/cities'>Cities</a></li><li class='nav-item'><a class='nav-link' href='/temp'>Temperatures</a></li></ul></li></ul>");
}

$(document).ready(function(){
  getWeather("Austin");
})

function getWeather(city) {
  $("#temp").text("");
    $("#city").text("");
    $("#error").text("");
  console.log(apiKey);
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey;
  $.ajax(url, {success: function(data){
    console.log(data);
    $("#temp").text("Temperature is :"+data.main.temp);
    $("#city").text("City name is: "+data.name);
    
  },error:function(error){
    
    $("#error").text("An error occured");
  }})
}

function getWeatherData() {
  var serach = $(".search").val();
  getWeather(serach);
}

