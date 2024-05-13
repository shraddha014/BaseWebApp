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
  showPosts();
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

function firebaseSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
    // IdP data available in result.additionalUserInfo.profile.
      // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function addMessageToDb(postTitle, postBody) {
  $("#post-body").text("");
  $("#post-title").text("");
  var postData = {
    title: postTitle,
    body: postBody
  }

  var database = firebase.database().ref("posts");
  var newPostRef = database.push();
  newPostRef.set(postData);
}

function handleMessageSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessageToDb(postTitle, postBody);
}

function showPosts() {
  return firebase.database().ref('posts').once('value').then((snapshot) => {
    var posts = snapshot.val();
    for(var postKey in posts) {
      var post = posts[postKey];
      $("#post-list").append("<div>"+post.title+"-"+post.body+"</div>")
    }
  });
}
