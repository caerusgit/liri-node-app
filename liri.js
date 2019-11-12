require("dotenv").config();
var keys = require("./keys.js");
// Grab the axios package...
var axios = require("axios");
// Grab the spotify package...
var Spotify = require('node-spotify-api');
// Grab the moment package...
var moment = require('moment');
// fs is a core Node package for reading and writing files
var fs = require("fs");
// Node.js inbuilt module child_process to Run Shell or bash command using Nodejs
const { exec } = require('child_process');




// You should then be able to access your keys information like so
// var spotify = new Spotify(keys.spotify);



// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var command = process.argv.slice(2);
var arg = process.argv.slice(3);

switch (command[0]) {
    case "concert-this":
        fs.appendFile("log.txt", `\n concert-this ${arg} @ ${moment().format("MMMM Do YYYY, h:mm:ss")}`, function (err) {
            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
            // Otherwise, it will print: "movies.txt was updated!"
            console.log("new log entry!");
        });
        // 1. `node liri.js concert-this <artist/band name here>`
        //    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
        //      * Name of the venue
        //      * Venue location
        //      * Date of the Event (use moment to format this as "MM/DD/YYYY")
        //     * **Important**: There is no need to sign up for a Bands in Town `api_id` key. Use the `codingbootcamp` as your `app_id`. For example, the URL used to search for "Celine Dion" would look like the following:
        //       * `https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp`
        axios
            .get(`https://rest.bandsintown.com/artists/${arg}/events?app_id=codingbootcamp`)
            .then(function (response) {
                // If the axios was successful...
                // Then log the body from the site!
                // console.log(response.data);
                response.data.forEach(element => {
                    console.log("\n" + element.venue.name + "\n" + element.venue.city + ", " + element.venue.country)
                    console.log(moment(element.datetime).format("MM/DD/YYYY"))
                });
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
        break;
    case "spotify-this-song":
        fs.appendFile("log.txt", `\n spotify-this-song ${arg} @ ${moment().format("MMMM Do YYYY, h:mm:ss")}`, function (err) {
            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
            // Otherwise, it will print: "movies.txt was updated!"
            console.log("new log entry!");
        });
        // 2. `node liri.js spotify-this-song '<song name here>'`
        // * This will show the following information about the song in your terminal / bash window
        //     * Artist(s)
        //     * The song's name
        //     * A preview link of the song from Spotify
        //     * The album that the song is from
        //     * If no song is provided then your program will default to "The Sign" by Ace of Base.
        //     * You will utilize the[node - spotify - api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
        //     * The Spotify API requires you sign up as a developer to generate the necessary credentials.You can follow these steps in order to generate a ** client id ** and ** client secret **:
        //     * Step One: Visit < https://developer.spotify.com/my-applications/#!/>
        //     * Step Two: Either login to your existing Spotify account or create a new one(a free account is fine) and log in.
        //     * Step Three: Once logged in, navigate to < https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
        //     * Step Four: On the next screen, scroll down to where you see your client id and client secret.Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        });

        if (arg != "") {
            spotify.search({ type: 'track', query: arg }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                data.tracks.items.forEach(element => {
                    element.artists.forEach(element => {
                        console.log("Artists: ", element.name)
                    });
                    console.log("Song name: ", element.name)
                    console.log("Preview URL: ", element.preview_url)
                    console.log("Album: ", element.album.name)
                    console.log("\n----------------\n");
                })
            });
        } else {
            spotify.search({ type: 'track', query: 'Ace of Base The sign' }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                data.tracks.items.forEach(element => {
                    element.artists.forEach(element => {
                        console.log("Artists: ", element.name)
                    });
                    console.log("Song name: ", element.name)
                    console.log("Preview URL: ", element.preview_url)
                    console.log("Album: ", element.album.name)
                    console.log("\n----------------\n");
                })
            });
        }
        break;
    case "movie-this":
        fs.appendFile("log.txt", `\n movie-this ${arg} @ ${moment().format("MMMM Do YYYY, h:mm:ss")}`, function (err) {
            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
            // Otherwise, it will print: "movies.txt was updated!"
            console.log("new log entry!");
        });
        // 3. `node liri.js movie-this '<movie name here>'`
        // * This will output the following information to your terminal/bash window:
        // ```
        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.
        // ```

        // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

        //     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

        //     * It's on Netflix!

        // * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
        if (arg != "") {
            axios
                .get(`http://www.omdbapi.com/?t=${arg}&apikey=trilogy`)
                .then(function (response) {
                    // If the axios was successful...
                    // Then log the body from the site!
                    // console.log(response.data);
                    // console.log(response.data);
                    console.log(response.data.Title);
                    console.log(response.data.Year);
                    console.log(response.data.Ratings[0].Value);
                    console.log(response.data.Ratings[1].Value);
                    console.log(response.data.Country);
                    console.log(response.data.Language);
                    console.log(response.data.Plot);
                    console.log(response.data.Actors);
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
        } else {
            axios
                .get(`http://www.omdbapi.com/?t=Mr.Nobody&apikey=trilogy`)
                .then(function (response) {
                    // If the axios was successful...
                    // Then log the body from the site!
                    // console.log(response.data);
                    console.log("\n----------------\n");
                    console.log(response.data.Title);
                    console.log(response.data.Year);
                    console.log(response.data.Ratings[0].Value);
                    console.log(response.data.Ratings[1].Value);
                    console.log(response.data.Country);
                    console.log(response.data.Language);
                    console.log(response.data.Plot);
                    console.log(response.data.Actors);
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
        }
        break;
    case "do-what-it-says":
        fs.appendFile("log.txt", `\n do-what-it-says @ ${moment().format("MMMM Do YYYY, h:mm:ss")}`, function (err) {
            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }
            // Otherwise, it will print: "movies.txt was updated!"
            console.log("new log entry!");
        });
        //4. `node liri.js do-what-it-says`
        // * Using the`fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        //     * It should run`spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        // * Edit the text in random.txt to test out the feature for movie - this and concert - this.

        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            console.log(dataArr);

            // exec("spotify-this-song I Want it That Way")

            exec(`node liri.js ${dataArr[0]} ${dataArr[1]}`, (err, stdout, stderr) => {
                if (err) {
                    //some err occurred
                    console.error(err)
                } else {
                    // the *entire* stdout and stderr (buffered)
                    console.log(`stdout: ${stdout}`);
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                    }
                }
            });

        });
        break;
    default:
        console.log("Enter a valid command")
}


