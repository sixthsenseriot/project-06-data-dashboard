import "./RecipeCard.css";
import recipePlaceHolderImage from "../assets/images/recipe-placeholder-image.jpg";

const RecipeCard = ({ recipe, onClick }) => {
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
                    {recipe.cuisines &&
                        recipe.cuisines.map((cuisine, index) => (
                            <span key={index} className="cuisine-tag">
                                {cuisine}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
