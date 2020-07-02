import axios from 'axios';


const urlBaseMarvel = 'https://gateway.marvel.com:443/v1/public/';
const apiKey = 'af4b4566925ba7ba9e73e60273ee76b5';

export default {
    getAllCharacters: (limit, callback) => {
        const urlCharacters = urlBaseMarvel + 'characters?apikey=' + apiKey + '&limit=' + limit;
        axios.get(urlCharacters).then((characters) => {
            if (callback) {
                callback(characters);
            }
        })
    }
}