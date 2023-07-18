import axios from "axios";
const API_KEY = " live_BnyQkd9V335XZBwU0glg26zTBmwV0EDnhC79Q2MqqIVAAOHcEz34OwSeTjV7qUAX"
axios.defaults.headers.common["x-api-key"] = API_KEY;
function fetchBreeds(BASE_URL, END_POINT) {

    return axios.get(`${BASE_URL}${END_POINT}`)
        .then(response => response
        )
}


function fetchCatByBreed(BASE_URL, NEXT_POINT,breedId) {
    return axios.get(`${BASE_URL}${NEXT_POINT}?breed_ids=${breedId}`)
        .then(response => 
             response
        )
}







export {
    fetchBreeds,
    fetchCatByBreed
};