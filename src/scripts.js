import './css/styles.css';
import './images/turing-logo.png'
import { fetchUfoData } from './apiCalls';

let sightings

let submitButton = document.getElementById('submit')
let locationInput = document.getElementById('location')
let descriptionInput = document.getElementById('description')

const generateUfoCards = (sightings) => {
  let cards = sightings.map(sighting => {
    return (
      `<div id=${sighting.id}>
        <h1>${sighting.location}</h1>
        <p>${sighting.description}</p>
        <button id=${sighting.id} class='delete'>Delete</button>
      </div>`
    )
  })
  document.getElementById('container').innerHTML = cards
}

const fetchData = () => {
  fetchUfoData()
    .then(data => sightings = data)
    .then(() => generateUfoCards(sightings))
}

const clearInputs = () => {
  locationInput.value = ''
  descriptionInput.value = ''
}

const addNewSighting = () => {
  event.preventDefault()

  const newSighting = {
    location: locationInput.value, 
    description: descriptionInput.value
  }

  clearInputs()

  fetch('http://localhost:3001/sightings', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(newSighting)
  })
    .then(response => response.json())
    .then(data => generateUfoCards([...sightings, data]))
}

const removeSighting = (id) => {
  event.preventDefault()
  fetch(`http://localhost:3001/sightings/${id}`, {
    method: 'DELETE', 
  })
    .then(response => response.json())
    .then(data => generateUfoCards(data))
}

window.addEventListener('load', fetchData)
submitButton.addEventListener('click', addNewSighting)
document.addEventListener('click', function (event) {
  if (!event.target.matches('.delete')) return;
  event.preventDefault();
  removeSighting(event.target.id)
})