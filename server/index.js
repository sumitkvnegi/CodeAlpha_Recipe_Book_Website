const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Recipe = require("./model/recipe");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/recipes');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post("/api/recipe", async (req, res) => {

  try {
    const {
        name,
        imageUrl,
        description,
        author,
        ingredients,
        method,
      } = req.body; 
    
      const newRecipe = new Recipe({
        name,
        imageUrl,
        description,
        author,
        ingredients: ingredients.split('\n').map(ingredient => ingredient.trim()),
        method,
      });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).send("Error adding recipe");
  }
});

// Assuming you have the Recipe model and app instance set up as before

app.put("/api/recipe/:id", async (req, res) => {
    const recipeId = req.params.id;
  
    try {
      const {
        name,
        imageUrl,
        description,
        author,
        ingredients,
        method,
      } = req.body;
  
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          name,
          imageUrl,
          description,
          author,
          ingredients: ingredients.split('\n').map(ingredient => ingredient.trim()),
          method,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedRecipe) {
        return res.status(404).send("Recipe not found");
      }
  
      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).send("Error updating recipe");
    }
  });

app.get('/api/recipe', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Use the Mongoose model to retrieve all recipes
        res.status(200).json(recipes);    
    } catch (error) {
        res.status(500).json({error: 'Error getting recipes'});
    }
});

app.delete('/api/recipe/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId); 
        if (deletedRecipe) {
            res.status(200).json(deletedRecipe);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
