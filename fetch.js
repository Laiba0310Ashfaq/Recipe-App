
// fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=61e6c35303cf4318854d321111a0c9ea')
//   .then(response => response.json())
//   .then(characters=>{renderCharacters(characters.results)})
  
// const cardsContainer = document.querySelector('#cards-container');
// const searchInput = document.querySelector('#search-input');
// const searchButton = document.querySelector('#search-button');
// let parsedData = null;

// function renderCharacters(characters) {
// cardsContainer.innerHTML = ''; // Clear previous results
//  characters.forEach(character => {
//    const div = document.createElement('div');
//    const title = document.createElement('h3');
//    const image = document.createElement('img');
    
    // div.classList = 'card';
    // image.classList = 'card-img';
   
    // image.src = character.image;
    // title.innerText = `${character.title}`;

    // div.appendChild(title);
    // div.appendChild(image);
    // cardsContainer.appendChild(div);

    // // Add event listener to each card
    // div.addEventListener('click', () => {
    //   const modal = document.createElement('div');
    //   modal.classList = 'modal';

    //   const content = document.createElement('div');
    //   content.classList = 'modal-content';

    //   const closeButton = document.createElement('button');
    //   closeButton.classList = 'close-button';
    //   closeButton.innerText = 'Close';

    //   content.appendChild(closeButton);
//       modal.appendChild(content);
//       document.body.appendChild(modal);

//       // Add event listener to close button
//       closeButton.addEventListener('click', () => {
//         document.body.removeChild(modal);
//       });
//     });
//   });
// }


const cardsContainer = document.querySelector('#cards-container');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
let parsedData = null; // Declare parsedData outside of the block

function renderCharacters(characters) {
  cardsContainer.innerHTML = ''; // Clear previous results
  characters.forEach(character => {
    const div = document.createElement('div');
    const title = document.createElement('h3');
    const image = document.createElement('img');
    
    div.classList = 'card';
    image.classList = 'card-img';
   
    image.src = character.image;
    title.innerText = `${character.title}`;

    div.appendChild(title);
    div.appendChild(image);
    cardsContainer.appendChild(div);

    // Add event listener to each card
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


let dataKey = '';
let storedData = '';

// Check for data in local storage
if (localStorage.myData) {
  dataKey = 'myData';
  storedData = localStorage.getItem(dataKey);
} else if (localStorage.spoonacularData) {
  dataKey = 'spoonacularData';
  storedData = localStorage.getItem(dataKey);
}

// Set parsedData when storedData is available
if (storedData) {
  parsedData = JSON.parse(storedData);
  if (parsedData.results) {
    renderCharacters(parsedData.results);
  } else {
    console.error(`Data in ${dataKey} is empty`);
  }
} else {
  fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=f12690930a4446f4b2ffd3ccdef447db')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('spoonacularData', JSON.stringify(data));
      parsedData = data; // Set parsedData here
      renderCharacters(data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (parsedData && parsedData.results) { // Check that parsedData is available
    const filteredRecipes = parsedData.results.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
    renderCharacters(filteredRecipes);
  }
});








