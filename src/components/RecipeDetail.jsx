import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./RecipeDetail.css";
import NutritionChart from "./NutritionChart";

const RecipeDetail = ({ onBack }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fullRecipe, setFullRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const spoonApiKey = import.meta.env.VITE_SPOON_API_KEY;

            try {
                const result = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonApiKey}&includeNutrition=true`
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
    }, [id]);

    if (loading) {
        return (
            <div className="RecipeDetail">
                <button onClick={onBack} className="back-button">
                    <i class="fa-solid fa-arrow-left"></i> Back
                </button>
                <p>Loading recipe details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="RecipeDetail">
                <button onClick={onBack} className="back-button">
                    <i class="fa-solid fa-arrow-left"></i> Back
                </button>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="RecipeDetail">
            <div className="recipe-top-container">
                <button onClick={() => navigate(-1)} className="back-button">
                    <i class="fa-solid fa-arrow-left"></i> Back
                </button>
                <h2>{fullRecipe.title}</h2>
            </div>

            {/* rest of your layout remains unchanged */}
            <div className="image-container">
                <img
                    src={fullRecipe.image}
                    alt={fullRecipe.title}
                    className="food-image"
                />
            </div>

            <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {fullRecipe.extendedIngredients?.map((ing, i) => (
                        <li key={i}>{ing.original}</li>
                    ))}
                </ul>
            </div>

            <div className="instructions">
                <h3>Instructions</h3>
                {fullRecipe.instructions ? (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: fullRecipe.instructions,
                        }}
                    />
                ) : (
                    <p>No instructions available.</p>
                )}
            </div>

            <div className="nutrition">
                <h3>Nutrition</h3>
                {fullRecipe.nutrition ? (
                    <NutritionChart
                        nutrients={fullRecipe.nutrition.nutrients}
                    />
                ) : (
                    <p>No nutrition info available.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeDetail;
