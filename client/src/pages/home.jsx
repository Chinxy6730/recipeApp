import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../components/hooks/useGetUserID";
import { useCookies } from "react-cookie";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://recipeapp-d04p.onrender.com/recipes"
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeapp-d04p.onrender.com/recipes/savedRecipes/ids/${userID}`,
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();

    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const savedRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipeapp-d04p.onrender.com/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1> Recipes</h1>
      <ul>
        <CardGroup>
          {
            <Card style={{ width: "30%" }}>
              {recipes.map((recipe) => (
                <li key={recipe._id}>
                  <Card.Img src={recipe.imageUrl} alt={recipe.name} />
                  <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text className="instructions">
                      <p>{recipe.instructions}</p>
                    </Card.Text>
                    <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
                    <button
                      onClick={() => savedRecipe(recipe._id)}
                      disabled={isRecipeSaved(recipe._id)}
                    >
                      {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                    </button>
                  </Card.Body>
                </li>
              ))}
            </Card>
          }
        </CardGroup>
      </ul>
    </div>
  );
};
/* {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => savedRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))} */
