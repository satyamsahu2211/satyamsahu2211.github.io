const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const  fetchRecipes = async (query) =>{
  recipeContainer.innerHTML = "fetching Recipes . . .";
    const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";

    // console.log(response.meals[0]);
    response.meals.forEach(meals => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');
      recipeDiv.innerHTML = `
      <img src = "${meals.strMealThumb}">
      <h3>${meals.strMeal}</h3>
      <p><span>${meals.strArea}</span> Dish<p>
      <p>Belong to <span>${meals.strCategory}</span> Category<p>
      `
      const button = document.createElement('button');
      button.textContent = "view recipe";
      recipeDiv.appendChild(button);
       
      button.addEventListener('click',()=>{
        openRecipePopup(meals);
      })


      recipeContainer.appendChild(recipeDiv);
    });
}
const fetchIngredients = (meals) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meals[`strIngredient${i}`]; // Corrected typo here
    if (ingredient) {
      const measure = meals[`strMeasure${i}`]; // Corrected typo here
      ingredientsList += `<li>${measure}  ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipePopup = (meals) => {
    recipeDetailsContent.innerHTML=`
        <h2 class ="recipeName">${meals.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class ="ingredientList">${fetchIngredients(meals)}</ul>
        <div>
        <h3>Ingredients:</h3>
        <p class = "recipeIngredients">${meals.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
  recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
  // console.log("Button Clicked");
});