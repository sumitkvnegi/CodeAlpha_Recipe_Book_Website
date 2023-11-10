function isValidUrl(url) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(url);
}

function preview(){
  const imageUrlInput = document.getElementsByName("imageUrl")[0];

  if(isValidUrl(imageUrlInput.value)){
    const previewImage = document.getElementById("previewImage");
    previewImage.src = imageUrlInput.value;
  }
}

async function addRecipe() {
  const form = document.getElementById('recipeForm');
  const formData = new FormData(form);
  const data = {};

  for (let [key, value] of formData.entries()) {
    data[key] = value.trim();

    // Check if any form input value is empty
    if (!data[key]) {
      alert(`"${key}" cannot be empty`);
      return;
    }
  }

  // Check if the URL is valid
  if (!isValidUrl(data.imageUrl)) {
    alert("Invalid URL");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      console.log("Recipe created successfully.");
      console.log(await response.json());
      window.location.href = './index.html';
    } else {
      console.error("Error creating recipe.");
    }
  } catch (error) {
    console.error("Network error:", error);
  }

  form.reset();
}
