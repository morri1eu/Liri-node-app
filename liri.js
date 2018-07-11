require("dotenv").config();

var keys = require('./keys')
var fs= require('fs')

var Twitter = require('twitter');
var request = require('request')
var Spotify = require('node-spotify-api')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify + client)

var input = ""

for (var i = 2; i < process.argv.length; i++) {
    input = input + process.argv[i]
    if (i == process.argv.length - 1) {
        break
    }
    else {

        input = input + " "
    }

}
function spotifyFunction(){
    console.log('spotify song')

    var song = ""
    for (k = 1; k < inputArray.length; k++) {
        song = song + inputArray[k]
        if (k == inputArray.length - 1) {
            break
        }
        else {
    
            song = song + " "
        }
    }
   // song = "'" + song + "'"
   console.log(song)
    if (song== ""){
        song = 'The Sign Ace of Base'
    }

    console.log(song)
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songInfo= data.tracks.items[0]
       
        console.log('--------------------------------')
        console.log('The Artist '+songInfo.artists[0].name)
        console.log('The Name of the Song ' +songInfo.name)
        console.log('The Preview URL ' +songInfo.preview_url)
        console.log('The Album Name '+songInfo.album.name)
    });

}

console.log(input)
var inputArray = input.split(" ")
if (inputArray[0]== 'do-what-it-says'){
    fs.readFile('random.txt', 'utf8', function(error,data){
        console.log(data)
        console.log('between readdata and data')
        var readData= data.split(',')
        console.log(readData)
        inputArray=readData
        spotifyFunction()
    })
}
console.log('here')
console.log(inputArray[0])
if (input == 'my-tweets') {
    var params = {
        screen_name: "Liribot6",
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            throw (error)
        }
        if (response.statusCode == 200) {
            var parsedResponse = (JSON.parse(response.body))
            console.log(parsedResponse)
            for (var j = 0; j < parsedResponse.length; j++) {

                console.log('Tweet # ' + (j + 1) + ": " + parsedResponse[j].text)
            }
        }
    }
    )
}

else if (inputArray[0] == 'spotify-this-song') {
    spotifyFunction()
}

else if (inputArray[0]== 'movie-this'){
    var movie = ""
    for (l = 1; l < inputArray.length; l++) {
        movie = movie + inputArray[l]
        if (l == inputArray.length - 1) {
            break
        }
        else {
    
            movie = movie + " "
        }
    }
   // movie = "'" + movie + "'"
   console.log(movie)
    if (movie== ""){
        movie = 'Mr. Nobody'
    }
    request('http://www.omdbapi.com/?t='+ movie +"&apikey=trilogy", function(error,response,body){
        var movieData= JSON.parse(body)
        
        console.log('Movie Title: '+movieData.Title)
        console.log('Movie Year: '+movieData.Year)
        console.log('IMDB Rating: ' +movieData.imdbRating)
        console.log('Rotten Tomatoes Rating: '+movieData.Ratings[1].Value)
        console.log('Movie Country: '+movieData.Country)
        console.log('Movie Language: '+ movieData.Language)
        console.log('Movie Plot: '+ movieData.Plot)
        console.log('Stars: '+ movieData.Actors)

    } )
}

