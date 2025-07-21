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

    const handleRecipeFetch = (recipes) => {
        setHasSearched(true);
        setRecipeResults(recipes || []);
    };

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
