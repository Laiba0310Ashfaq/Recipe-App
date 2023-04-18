
// fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=61e6c35303cf4318854d321111a0c9ea')
//   .then(response => response.json())
//   .then(characters => {
//     localStorage.setItem('characters', JSON.stringify(characters.results));
//     renderCharacters(characters.results);
//   });

const cardsContainer = document.querySelector('#cards-container');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
let parsedData = null; // Declare parsedData outside of the functions


if(localStorage.getItem('characters')) {
  const characters = JSON.parse(localStorage.getItem('characters'));
  parsedData = { results: characters }; // Set parsedData to an object with results property
  renderCharacters(characters);
} else {
  // Fetch data from API and store in local storage
  fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=61e6c35303cf4318854d321111a0c9ea')
    .then(response => response.json())
    .then(characters => {
      localStorage.setItem('characters', JSON.stringify(characters.results));
      parsedData = characters; // Set parsedData to the fetched data
      renderCharacters(characters.results);
    });
} 

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
    

    div.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList = 'modal';

      const content = document.createElement('div');
      content.classList = 'modal-content';

      const closeButton = document.createElement('button');
      closeButton.classList = 'close-button';
      closeButton.innerText = 'Close';

      content.appendChild(closeButton);
      modal.appendChild(content);
      document.body.appendChild(modal);

      // Add event listener to close button
      closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    });
  });
};
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (parsedData && parsedData.results) {
    const filteredRecipes = parsedData.results.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
    cardsContainer.innerHTML = ''; // clear the cardsContainer
    renderCharacters(filteredRecipes);
  }
});













