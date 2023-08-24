import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../components/hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Form from 'react-bootstrap/Form';


export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://recipeapp-d04p.onrender.com/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe Created!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label><br></br>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="ingredients">Ingredients</Form.Label><br></br>
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              type="text"
              key={idx}
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          ))}
          <button type="button" onClick={addIngredient}>
            {" "}
            Add Ingredient
          </button>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="instructions">Instructions</Form.Label><br></br>
          <textarea
            name="instructions"
            id="instructions"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        
        <label htmlFor="imageUrl" name="imageUrl">
          Image Url
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <Form.Group className="mb-3">
          <Form.Label htmlFor="cookingTime">Cooking Time (minutes)</Form.Label><br></br>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            onChange={handleChange}
          />
        </Form.Group>
        
        <button type="submit"> Create Recipe</button>
      </Form>
    </div>
  );
};
