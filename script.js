document.addEventListener("DOMContentLoaded", function () {
    getAllRecipes();
    getDefaultRecipes();
});
const recipeList = document.getElementById("recipe-list");

async function getDefaultRecipes(){
const response = await fetch('./defaultRecipes.json');
const data = await response.json();
data.forEach((recipe, index) => {
    const {
      author,
      description,
      ingredients,
      method,
      name,
      imageUrl,
    } = recipe;

    console.log(recipe);

    const ul = document.createElement("ul");

    ingredients.forEach(ingredient => {
    const li = document.createElement("li");
    li.innerText = ingredient;
    ul.appendChild(li);
    })

    const li = document.createElement("li");
    li.innerHTML = ` 
    <div class="recipe"><img
        src="${imageUrl}"
        alt="Recipe Image"
    />
</div>
    <div class="info">
        <div class="head">
            <h2 class="recipe-name">${name}</h2>
            <p class="author">@${author}</p>
        </div>

        <p class="description">
            ${description}
        </p>
        <p class="label">Ingredients</p>
        <ul class="ingredient-list">
        ${ul.innerHTML}
        </ul>
        <p class="label">Directions</p>
        <p class="method">
            ${method}
        </p>
    </div>
`;
    recipeList.appendChild(li);
    if(index>=2) return;
  });

}

async function getAllRecipes() {
  try {
    const response = await fetch("http://localhost:3000/api/recipe");
    if (response.status === 200) {
      const recipes = await response.json();

      recipes.forEach((recipe) => {
        const {
          _id,
          author,
          description,
          imageUrl,
          ingredients,
          method,
          name,
        } = recipe;

        const ul = document.createElement("ul");

        ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.innerText = ingredient;
        ul.appendChild(li);
        })
    

        const li = document.createElement("li");
        li.dataset.recipeId = _id; // Set the recipe ID as a data attribute
        li.innerHTML = `
        <div class="recipe"><img
            src="${imageUrl}"
            alt="Recipe Image"
        />
        <div class="tools">
            <a href="./edit.html?id=${_id}" class="edit">✍</a>
            <button class="delete" onclick="remove('${_id}')">🚮</button>
        </div>
    </div>
        <div class="info">
            <div class="head">
                <h2 class="recipe-name">${name}</h2>
                <p class="author">@${author}</p>
            </div>
    
            <p class="description">
                ${description}
            </p>
            <p class="label">Ingredients</p>
            <ul class="ingredient-list">
            ${ul.innerHTML}
            </ul>
            <p class="label">Directions</p>
            <p class="method">
                ${method}
            </p>
        </div>`;
        recipeList.appendChild(li);
      });

      console.log("All Recipes:", recipes);
    } else {
      console.error("Error retrieving Recipes:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
