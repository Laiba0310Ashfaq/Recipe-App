const cardsContainer = document.querySelector('#cards-container')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')
let parsedData = null

if (localStorage.getItem('items')) 
{
  const items = JSON.parse(localStorage.getItem('items'))
  parsedData = { recipes: items }
  renderitems(items)
  console.log("from local")
}
 else if (localStorage.getItem('items') === null) 
{
  fetch('https://api.spoonacular.com/recipes/random?apiKey=3dac005e3e3b4988b539913a929d000d&number=10')
    .then(response => response.json())
    .then(items =>
    {
      localStorage.setItem('items', JSON.stringify(items.recipes))
      parsedData = items
      renderitems(items.recipes)
      console.log("from api")
    })
} 
else
{
  console.log("Error")
}

function renderitems(items)
{
  cardsContainer.innerHTML = ''
  items.forEach(item =>
  {
    const div = document.createElement('div')
    const title = document.createElement('h3')
    const image = document.createElement('img')
    const recipeIngredients = document.createElement('ul')
    
    div.classList = 'card'
    image.classList = 'card-img'
    recipeIngredients.classList='ingredients'
   
    image.src = item.image
    title.innerText = `${item.title}`
    recipeIngredients.innerHTML = item.extendedIngredients.map(ingredient =>`<li>${ingredient.name}</li>`).join('')

    div.appendChild(title)
    div.appendChild(image)
    div.appendChild(recipeIngredients)
    cardsContainer.appendChild(div)
    

    div.addEventListener('click', () =>
    {
      const box = document.createElement('div')
      box.classList = 'box'

      const content = document.createElement('div')
      content.classList = 'box-content'

      const Quantity = document.createElement('h3')
      Quantity.innerHTML='Quantity of Ingredients: '

       const IngredientsQuantity = document.createElement('ul')
       IngredientsQuantity.innerHTML = item.extendedIngredients.map(ingredient =>
         `<li>${ingredient.original}</li>`).join('')

      const heading = document.createElement('h3')
      heading.innerHTML='Recipe: '

      const recipeInstructions = document.createElement('ol')
      recipeInstructions.innerHTML = item.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('')

      const closeButton = document.createElement('button')
      closeButton.classList = 'close-button'
      closeButton.innerText = 'Close'

      content.appendChild(Quantity)
      content.appendChild(IngredientsQuantity)
      content.appendChild(heading)
      content.appendChild(recipeInstructions)
      content.appendChild(closeButton)
      box.appendChild(content)
      document.body.appendChild(box)

      
      closeButton.addEventListener('click', () => 
      {
        document.body.removeChild(box)
      })
    })
  })
}

function handleSearch() 
{
  const searchTerm = searchInput.value.trim()
  if (parsedData && parsedData.recipes) {
    const filteredRecipes = parsedData.recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
    renderitems(filteredRecipes)
  }  
}
searchButton.addEventListener('click', handleSearch)
