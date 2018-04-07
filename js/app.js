
function pingSeatGeek() {
  event.preventDefault();
  ZIP = $("#zipcodeInput").val().trim();
  DIST = $("#distInput").val().trim();
  DATE = moment().format("YYYY-MM-DD");
  console.log(DATE)
  var queryURL = "https://api.seatgeek.com/2/events?type=concert&per_page=1000&postal_code=" + ZIP + "&range=" + DIST + "mi&client_id=MTExMzAwNzR8MTUyMjk4NDcwNS4xNg"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    for (var i = 0; i < response.events.length; i++) {
      var timeChecker = response.events[i].datetime_local
      var timeCheckerTwo = moment(timeChecker).format("YYYY-MM-DD")
      if (timeCheckerTwo == DATE) {
      $("#artistsDiv").append(
        `
        <div class="tile col resultCard">
            <p class="tileTitle">${response.events[i].performers[0].name} | <i>${response.events[i].venue.name}</i></p>
          </div>
        </div>
      </div>
      `
      )}
    } 
  })
}

function pingSpotify() {
  // Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '5d271f5f1df9427cbd92da2e6241045d';
const redirectUri = 'https://joewrightnc.github.io/ListenHearAPITesting/';
const scopes = [
  'user-top-read'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// Make a call using the token
$.ajax({
   url: "https://api.spotify.com/v1/me/top/artists",
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   success: function(response) { 
     // Do something with the returned data
     console.log(response)
     }
});

}
/*   var accessToken = "BQANNJyFnwB_kQxvYnD5WM7I1Sscd-tHoFNE_nZGOcK5rl8HxE7WTHatSHimCQHyzWKs4bkzSlRXU3Ba3NmCNzocIktjkOysZBkeGh_jXtx50UGxueQsUXOH4RugPEAle7_XaBsOZuZywyYidUp5VOroBStMPRTyoDyBN-HQR9ROyfs"
  $.ajax({
    url: 'https://api.spotify.com/v1/search?q=Sarah%20Shook&type=artist',
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function(response) {
        console.log(response)
    }
    
 });
  }; */


  /* var client_id = '5d271f5f1df9427cbd92da2e6241045d'; // Your client id
  var client_secret = '02d6461d16e34a7d8159753edeb67d19'; // Your secret

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + ((client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  }); */


$("#submitBtn").on("click", pingSeatGeek);

$("#spotifyBtn").on("click", pingSpotify);
