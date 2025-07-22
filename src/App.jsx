import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import SideNavBar from "./components/SideNavBar";
import APIForm from "./components/APIForm";
import RecipeCard from "./components/RecipeCard";
import RecipeDetail from "./components/RecipeDetail";
import About from "./components/About";

const App = () => {
    const [recipeResults, setRecipeResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [diet, setDiet] = useState("");
    const [type, setType] = useState("");
    const [maxCalories, setMaxCalories] = useState("");

    const handleRecipeFetch = (recipes) => {
        setHasSearched(true);
        setRecipeResults(recipes || []);
    };

    useEffect(() => {
        const fetchDefaultRecipes = async () => {
            const spoonApiKey = import.meta.env.VITE_SPOON_API_KEY;

            const url = new URL(
                "https://api.spoonacular.com/recipes/complexSearch"
            );
            url.searchParams.append("apiKey", spoonApiKey);
            url.searchParams.append("addRecipeInformation", "true");
            url.searchParams.append("addRecipeNutrition", "true");
            url.searchParams.append("addRecipeInstructions", "true");
            url.searchParams.append("number", "12");

            try {
                const response = await fetch(url.toString());
                const data = await response.json();
                setRecipeResults(data.results || []);
                setHasSearched(true);
            } catch (error) {
                console.error("Auto-load failed:", error);
            }
        };

        if (!hasSearched && recipeResults.length === 0) {
            fetchDefaultRecipes();
        }
    }, []);

    return (
        <div className="App">
            <SideNavBar />
            <main className="main-content">
                {/* Restore scrollable wrapper */}
                <div className="content-wrapper">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <div className="api-form-container">
                                        <APIForm
                                            onRecipeFetch={handleRecipeFetch}
                                            inputValue={inputValue}
                                            setInputValue={setInputValue}
                                            cuisine={cuisine}
                                            setCuisine={setCuisine}
                                            diet={diet}
                                            setDiet={setDiet}
                                            type={type}
                                            setType={setType}
                                            maxCalories={maxCalories}
                                            setMaxCalories={setMaxCalories}
                                        />
                                    </div>
                                    <div className="recipe-results-wrapper">
                                        <div
                                            className={`recipe-results ${
                                                hasSearched &&
                                                recipeResults.length === 0
                                                    ? "empty"
                                                    : ""
                                            }`}
                                        >
                                            {hasSearched &&
                                            recipeResults.length === 0 ? (
                                                <p className="no-results-message">
                                                    No recipes found. Try
                                                    another search!
                                                </p>
                                            ) : (
                                                recipeResults.map((recipe) => (
                                                    <RecipeCard
                                                        key={recipe.id}
                                                        recipe={recipe}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            }
                        />

                        {/* Recipe Detail */}
                        <Route path="/recipes/:id" element={<RecipeDetail />} />

                        {/* About Page */}
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default App;
