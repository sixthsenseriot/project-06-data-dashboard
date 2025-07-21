import { useState, useEffect } from "react";
import "./RecipeDetail.css";
import NutritionChart from "./NutritionChart";

const RecipeDetail = ({ recipe, onBack }) => {
    const [fullRecipe, setFullRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            if (recipe.extendedIngredients) {
                // Recipe already has full details
                setFullRecipe(recipe);
                setLoading(false);
                return;
            }

            const spoonApiKey = import.meta.env.VITE_SPOON_API_KEY;

            try {
                const result = await fetch(
                    `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${spoonApiKey}&includeNutrition=true`
                );
                const recipeData = await result.json();
                setFullRecipe(recipeData);
            } catch (error) {
                console.error("Failed to load recipe details:", error);
                setError("Failed to load recipe details.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipe]);

    if (loading) {
        return (
            <div className="RecipeDetail">
                <button onClick={onBack} className="back-button">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <p>Loading recipe details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="RecipeDetail">
                <button onClick={onBack} className="back-button">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="RecipeDetail">
            <div className="recipe-top-container">
                <button onClick={onBack} className="back-button">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <h2>{fullRecipe.title}</h2>
            </div>

            <div className="image-container">
                <img
                    src={fullRecipe.image}
                    alt={fullRecipe.title}
                    className="food-image"
                />
            </div>

            <div className="ingredients">
                <h3>Ingredients</h3>
                {fullRecipe.extendedIngredients &&
                fullRecipe.extendedIngredients.length > 0 ? (
                    <ul>
                        {fullRecipe.extendedIngredients.map(
                            (ingredient, index) => (
                                <li key={index}>{ingredient.original}</li>
                            )
                        )}
                    </ul>
                ) : (
                    <p>No ingredients available.</p>
                )}
            </div>

            <div className="instructions">
                <h3>Instructions</h3>
                {fullRecipe.instructions ? (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: fullRecipe.instructions,
                        }}
                    />
                ) : fullRecipe.analyzedInstructions &&
                  fullRecipe.analyzedInstructions.length > 0 ? (
                    <ol>
                        {fullRecipe.analyzedInstructions[0].steps.map(
                            (step, index) => (
                                <li key={index}>{step.step}</li>
                            )
                        )}
                    </ol>
                ) : (
                    <p>No instructions available.</p>
                )}
            </div>

            <div className="nutrition">
                <h3>Nutrition</h3>
                {fullRecipe.nutrition ? (
                    <>
                        <NutritionChart
                            nutrients={fullRecipe.nutrition.nutrients}
                        />
                    </>
                ) : (
                    <p>No nutrition info available.</p>
                )}
            </div>

            {/* <div className="nutrition">
                <h3>Nutrition</h3>
                {fullRecipe.nutrition ? (
                    <ul>
                        {fullRecipe.nutrition.nutrients.map(
                            (nutrient, index) => (
                                <li key={index}>
                                    {nutrient.name}: {nutrient.amount}
                                    {nutrient.unit}
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <p>No nutrition info available.</p>
                )}
            </div> */}
        </div>
    );
};

export default RecipeDetail;
