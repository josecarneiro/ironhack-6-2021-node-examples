const axios = require('axios');

console.log('Hello world');

// Callback pattern for asynchronous programming
setTimeout(() => {
  console.log('Hola Mundo');
}, 0);

console.log('Ciao Mondo');

const searchTerm = 'kubrick';

// Promises
// Calling axios.get() returns promise
// To react to the resolution of a promise,
// we need to call the method .then() on that promise
// and pass it a function that will be called once the promise has resolved
axios
  .get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=596e5cb0`)
  .then((result) => {
    console.log('The API responded successfully.');
    // result.data holds the response body
    const responseBody = result.data;
    // console.log(responseBody);
    const searchResults = responseBody.Search;
    console.log(searchResults);
  })
  .catch((error) => {
    console.log('There was an error calling the API', error);
  });

/*
const apiCallPromise = axios.get('https://www.omdbapi.com/?s=sharknado&apikey=596e5cb0');

apiCallPromise.then((data) => {
  console.log('The API responded successfully.');
  console.log(data);
});

apiCallPromise.catch((error) => {
  console.log('There was an error calling the API', error);
});
*/
