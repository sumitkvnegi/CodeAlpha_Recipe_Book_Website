async function editRecipe() {
    const form = document.getElementById('recipeForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");
  
    try {
        const response = await fetch(`http://localhost:3000/api/recipe/${recipeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          if (response.status === 200) {
            const updatedRecipe = await response.json();
            console.log("Recipe updated successfully:", updatedRecipe);
            window.location.href = './index.html';
          } else {
            console.error("Error updating recipe:", response.statusText);
          }
        } catch (error) {
          console.error("Network error:", error);
        }
    form.reset();
  }
  