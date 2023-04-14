
fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=e0815a2c28a7417883c044c619eec0b7')
  .then(response => response.json())
  .then(characters=>{renderCharacters(characters.results)})
  
const cardsContainer = document.querySelector('#cards-container');
function renderCharacters(characters) {
  characters.forEach(character => {
    const div = document.createElement('div');
    const title = document.createElement('h3');
    const image = document.createElement('img');
    
    div.classList = 'card'
    image.classList = 'card-img'
   
    image.src = character.image
    title.innerText = `${character.title}`

    div.appendChild(title)
    div.appendChild(image)
    cardsContainer.appendChild(div)
  });
};





