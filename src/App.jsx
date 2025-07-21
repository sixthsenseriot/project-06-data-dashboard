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
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [defaultQuery, setDefaultQuery] = useState("");
    const [defaultRecipeNumber, setDefaultRecipeNumber] = useState(12);

    const handleRecipeFetch = (recipes) => {
        setHasSearched(true);
        setRecipeResults(recipes || []);
    };

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleBackToResults = () => {
        setSelectedRecipe(null);
    };

    // DEBUG KTN
    // useEffect(() => {
    //     const fetchDefaultRecipes = async () => {
    //         const spoonApiKey = import.meta.env.VITE_SPOON_API_KEY;

    //         try {
    //             const result = await fetch(
    //                 `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonApiKey}&query=${defaultQuery}&addRecipeInformation=true&number=${defaultRecipeNumber}`
    //             );
    //             const data = await result.json();
    //             setRecipeResults(data.results);
    //         } catch (error) {
    //             console.error("Failed to load default recipes:", error);
    //         }
    //     };

    //     fetchDefaultRecipes();
    // }, []);
    // DEBUG KTN

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
