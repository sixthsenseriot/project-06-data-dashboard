import { useState, useEffect } from "react";
import "./APIForm.css";

const APIForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [cuisine, setCuisine] = useState("");
    const [diet, setDiet] = useState("");
    const [type, setType] = useState("");
    const [maxCalories, setMaxCalories] = useState("");

    const [resetFilters, setResetFilters] = useState(false);

    const fetchRecipes = async () => {
        setLoading(true);
        const spoonApiKey = import.meta.env.VITE_SPOON_API_KEY;

        const url = new URL(
            "https://api.spoonacular.com/recipes/complexSearch"
        );
        url.searchParams.append("apiKey", spoonApiKey);
        url.searchParams.append("query", inputValue);
        url.searchParams.append("addRecipeInformation", "true");
        url.searchParams.append("addRecipeNutrition", "true");
        url.searchParams.append("addRecipeInstructions", "true");
        url.searchParams.append("number", "12");

        if (cuisine) url.searchParams.append("cuisine", cuisine);
        if (diet) url.searchParams.append("diet", diet);
        if (type) url.searchParams.append("type", type);
        if (maxCalories) url.searchParams.append("maxCalories", maxCalories);

        try {
            const result = await fetch(url.toString());
            const recipesData = await result.json();
            props.onRecipeFetch(recipesData.results);
        } catch (error) {
            console.error("Failed to load recipes:", error);
            setError("Failed to load recipes. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchRecipes();
    };

    const toggleFilters = () => setShowFilters(!showFilters);

    const clearFilters = () => {
        setCuisine("");
        setDiet("");
        setType("");
        setMaxCalories("");
        setShowFilters(false);
        setResetFilters(true);
    };

    // Clears filters and ensures next render cycle sees updated values
    useEffect(() => {
        if (resetFilters) {
            fetchRecipes();
            setResetFilters(false);
        }
    }, [resetFilters]);

    // Auto-fetch recipes on applying filters
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchRecipes();
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [cuisine, diet, type, maxCalories]);

    return (
        <div className="APIForm">
            <form onSubmit={handleSubmit}>
                <div className="search-group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Find your next meal"
                    />
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <button
                    type="button"
                    onClick={toggleFilters}
                    className="filter-button"
                >
                    Filters
                </button>
            </form>

            {showFilters && (
                <div className="filter-popup">
                    <label>
                        Cuisine:
                        <select
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="african">African</option>
                            <option value="american">American</option>
                            <option value="british">British</option>
                            <option value="cajun">Cajun</option>
                            <option value="caribbean">Caribbean</option>
                            <option value="chinese">Chinese</option>
                            <option value="eastern european">
                                Eastern European
                            </option>
                            <option value="european">European</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                            <option value="greek">Greek</option>
                            <option value="indian">Indian</option>
                            <option value="irish">Irish</option>
                            <option value="italian">Italian</option>
                            <option value="japanese">Japanese</option>
                            <option value="jewish">Jewish</option>
                            <option value="korean">Korean</option>
                            <option value="latin american">
                                Latin American
                            </option>
                            <option value="mediterranean">Mediterranean</option>
                            <option value="mexican">Mexican</option>
                            <option value="middle eastern">
                                Middle Eastern
                            </option>
                            <option value="nordic">Nordic</option>
                            <option value="southern">Southern</option>
                            <option value="spanish">Spanish</option>
                            <option value="thai">Thai</option>
                            <option value="vietnamese">Vietnamese</option>
                        </select>
                    </label>
                    <label>
                        Diet:
                        <select
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="gluten free">Gluten Free</option>
                            <option value="ketogenic">Ketogenic</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="lacto-vegetarian">
                                Lacto-Vegetarian
                            </option>
                            <option value="ovo-vegetarian">
                                Ovo-Vegetarian
                            </option>
                            <option value="vegan">Vegan</option>
                            <option value="pescetarian">Pescetarian</option>
                            <option value="paleo">Paleo</option>
                            <option value="primal">Primal</option>
                            <option value="whole30">Whole30</option>
                        </select>
                    </label>
                    <label>
                        Type:
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="main course">Main Course</option>
                            <option value="side dish">Side Dish</option>
                            <option value="dessert">Dessert</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="salad">Salad</option>
                            <option value="bread">Bread</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="soup">Soup</option>
                            <option value="beverage">Beverage</option>
                            <option value="sauce">Sauce</option>
                            <option value="marinade">Marinade</option>
                            <option value="fingerfood">Fingerfood</option>
                            <option value="snack">Snack</option>
                            <option value="drink">Drink</option>
                        </select>
                    </label>
                    <label>
                        Max Calories:
                        <input
                            type="number"
                            value={maxCalories}
                            onChange={(e) => setMaxCalories(e.target.value)}
                            placeholder="e.g. 500"
                            className="calories-input"
                        />
                    </label>
                    {/* <button
                        onClick={(e) => {
                            toggleFilters();
                            handleSubmit(e);
                        }}
                        className="apply-filter-button"
                    >
                        Apply Filters
                    </button> */}
                    <button
                        onClick={clearFilters}
                        className="clear-filter-button"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            <div className="loading-container">
                {loading && <p className="loading">Loading...</p>}
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default APIForm;
