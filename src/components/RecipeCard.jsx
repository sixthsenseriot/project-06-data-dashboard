import "./RecipeCard.css";
import recipePlaceHolderImage from "../assets/images/recipe-placeholder-image.jpg";

const RecipeCard = ({ recipe, onClick }) => {
    function capitalizeWord(word) {
        if (typeof word !== "string" || word.length === 0) return "";
        return word
            .split(" ")
            .map(
                (part) =>
                    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join(" ");
    }

    return (
        <div
            className="RecipeCard"
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >
            <img
                src={recipe.image || recipePlaceHolderImage}
                alt={recipe.title}
                className="recipe-image"
                onError={(e) => (e.target.src = recipePlaceHolderImage)}
            />
            <div className="recipe-info-container">
                <h3 className="recipe-title">{recipe.title}</h3>

                <div className="recipe-cuisines">
                    {/* Cuisine tag */}
                    {recipe.cuisines &&
                        recipe.cuisines.slice(0, 1).map((cuisine, index) => (
                            <span key={index} className="cuisine-tag">
                                {cuisine}
                            </span>
                        ))}

                    {/* Dish type tag */}
                    {recipe.dishTypes &&
                        recipe.dishTypes.slice(0, 1).map((type, index) => (
                            <span key={`type-${index}`} className="type-tag">
                                {capitalizeWord(type)}
                            </span>
                        ))}

                    {/* Calories tag */}
                    {recipe.nutrition?.nutrients
                        .filter((n) => n.name === "Calories")
                        .slice(0, 1)
                        .map((n, index) => (
                            <span key={`cal-${index}`} className="calorie-tag">
                                {Math.round(n.amount)}{" "}
                                {n.unit.toLowerCase() === "kcal"
                                    ? "Calories"
                                    : n.unit}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
