var client_ID = "6faa4506df6e4d3ab6c894bfa461fdb4";

console.log(client_ID)
// // var client_Secret = "43e0f49befb44083bb8549c5b5c204ac";

// // var search = "Reggee";
// // var type = "playlist";
// // var limit = "10";

// // var queryURL = "https://api.spotify.com/v1/search?" + "q=" + search + "&type=" + type + "&limit=" + limit + -"H "Authorization: Bearer {your access token};

// // console.log(queryURL)
    
// // // Do an AJAX Request
// // $.ajax({url: queryURL,method: "GET"}).then(function(response) {
// //     // Assign Variables to Request
    
// //     console.log(response)
    
    
// // })  


// // $.ajax({
// //     method: "GET",
// //     url: `https://api.spotify.com/v1/search?q=track:antarctica&type=track/api/token`
// //   }).then(function(data) {
// //     console.log(data);
// //   });

// //   function getTopTracks(access_token) {
// //     $.ajax({
// //       url: 'https://api.spotify.com/v1/me/top/tracks?limit=10',
// //       headers: {
// //         'Authorization': 'Bearer ' + access_token
// //       },
// //       success: function(response) {
// //         $(".recommendations").show();
// //         mapOverSongs(response.items);
// //       }
// //     });
// //   }


// // Get the hash of the url
// const hash = window.location.hash
// .substring(1)
// .split('&')
// .reduce(function (initial, item) {
//   if (item) {
//     var parts = item.split('=');
//     initial[parts[0]] = decodeURIComponent(parts[1]);
//   }
//   return initial;
// }, {});
// window.location.hash = '';

// // Set token
// let _token = hash.access_token;

// const authEndpoint = 'https://accounts.spotify.com/authorize';

// // Replace with your app's client ID, redirect URI and desired scopes
// const clientId = '6faa4506df6e4d3ab6c894bfa461fdb4';
// const redirectUri = 'http://localhost:8888';
// const scopes = [
//   'user-read-birthdate',
//   'user-read-email',
//   'user-read-private'
// ];

// // If there is no token, redirect to Spotify authorization
// if (!_token) {
//   window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
// }