
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
    console.log(timeCheckerTwo)
    for (var i = 0; i < response.events.length; i++) {
      var timeChecker = response.events[i].datetime_local
      var timeCheckerTwo = moment(timeChecker).format("YYYY-MM-DD")
      if (timeCheckerTwo == DATE) {
      $("#artistsDiv").append(
        `
        <div class="tile col resultCard">
            <p class="tileTitle">${response.events[i].performers[0].name}</p>
          </div>
        </div>
      </div>
      `
      )}
    } 
  })
}

$("#submitBtn").on("click", pingSeatGeek);
