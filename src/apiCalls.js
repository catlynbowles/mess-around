export const fetchUfoData = () => {
  return fetch('http://localhost:3001/sightings') 
    .then(response => response.json())
}