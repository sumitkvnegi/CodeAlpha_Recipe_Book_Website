async function remove(id){
    try {
        const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          console.log("Recipe deleted successfully.");
          location.reload();
          // You can update the UI or take further actions as needed.
        } else if (response.status === 404) {
          console.error("Recipe not found.");
        } else {
          console.error("Error deleting recipe:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      };
}