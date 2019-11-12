The program offers fetching services to know more about: concerts, songs and movies.

liri.js is the main file
keys.js will get keys from .env file
random.txt will store a command for the terminal to run
log.txt will log all consults

Type node liri.js + one of the following commands: 

Available commands:

`concert-this`
`node liri.js concert-this <artist/band name here>`
This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
- Name of the venue
- Venue location
- Date of the Event (use moment to format this as "MM/DD/YYYY")



`spotify-this-song`
`node liri.js spotify-this-song '<song name here>'`
It will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
Then will show the following information about the song in your terminal/bash window
- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The album that the song is from
- If no song is provided then your program will default to "The Sign" by Ace of Base.



`movie-this`
`node liri.js movie-this '<movie name here>'`
This will output the following information to your terminal/bash window:
- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
It'll use the `axios` package to retrieve data from the OMDB API.



`do-what-it-says`
`node liri.js do-what-it-says`
Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
- It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
- You may edit the text in random.txt to test out the feature for movie-this and concert-this.



### BONUS
In addition to logging the data to the terminal/bash window, the program outputs the data to a .txt file called `log.txt`.


Hugo Bravo did tis program.