const cardsContainer = document.querySelector('#cards-container');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
let parsedData = null;

if (localStorage.getItem('items')) {
  const items = JSON.parse(localStorage.getItem('items'));
  parsedData = { recipes: items };
  renderitems(items);
  console.log("from local")
} else {
  fetch('https://api.spoonacular.com/recipes/random?apiKey=3dac005e3e3b4988b539913a929d000d&number=10')
    .then(response => response.json())
    .then(items => {
      localStorage.setItem('items', JSON.stringify(items.recipes));
      parsedData = items;
      renderitems(items.recipes);
      console.log("from api")
    });
}

function renderitems(items) {
  cardsContainer.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    const title = document.createElement('h3');
    const image = document.createElement('img');
    
    div.classList = 'card'
    image.classList = 'card-img'
   
    image.src = item.image
    title.innerText = `${item.title}`

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
}

function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (parsedData && parsedData.recipes) {
    const filteredRecipes = parsedData.recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
    renderitems(filteredRecipes);
  }
}

searchButton.addEventListener('click', handleSearch);
