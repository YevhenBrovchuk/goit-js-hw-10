
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from "./cat-api"

const BASE_URL="https://api.thecatapi.com/v1"
const END_POINT = "/breeds"
const NEXT_POINT="/images/search"




const elements = {
    selectEl: document.querySelector(".breed-select"),
    pElLoad: document.querySelector(".loader"),
    pElError: document.querySelector(".error"),
    divElCatInfo:document.querySelector(".cat-info")
    
}

elements.divElCatInfo.style.display="flex"
elements.selectEl.setAttribute("hidden", true)
elements.pElError.setAttribute("hidden", true)
    fetchBreeds(BASE_URL, END_POINT)
        .then(data => {
            elements.selectEl.innerHTML = data.data.map(element =>
                `<option value="${element.id}">${element.name}</option>`).join("")
            console.log(elements.selectEl);
            
        })
    .catch(() => { elements.pElError.removeAttribute("hidden")})
        .finally(() => {
            elements.selectEl.removeAttribute("hidden"),
            elements.pElLoad.setAttribute("hidden", true)
        })
        
   


 elements.selectEl.addEventListener("change", setOutput)


function setOutput(evt) {
    elements.pElLoad.removeAttribute("hidden")
    elements.pElError.setAttribute("hidden", true)
    const breedId = evt.target.value
    console.log(breedId);
    fetchCatByBreed(BASE_URL, NEXT_POINT, breedId)
        .then(data => {  
            elements.divElCatInfo.innerHTML = createMarkup(data.data[0])    
        })
        .catch(() => {
            elements.pElError.removeAttribute("hidden")
           elements.divElCatInfo.innerHTML=""
        })
        .finally(() => elements.pElLoad.setAttribute("hidden", true)
        )
}





function createMarkup({ url,  breeds: { 0: { description, temperament, name } } }, flag) {
    
return `<img src="${url}" alt="${description}" width=300px></img>
    <div><h3>${name}</h3><p>${description}</p>
    <h3 >Temperament:</h3><span>${temperament}</span></div>`
    
}