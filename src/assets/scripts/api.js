import axios from 'axios';

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

const API = {
    fetchBreweries(page = 1, perPage = 20) {
        const url = `${BASE_URL}?page=${page}&perPage=${perPage}`;
        return axios.get(url);
    },
};
export default API;

