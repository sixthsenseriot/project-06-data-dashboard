import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import "./NutritionChart.css";

const COLORS = ["#FFBB28", "#FF8042", "#00C49F", "#0088FE"];

const unitToMg = (name, amount, unit) => {
    if (!amount || isNaN(amount)) return 0;

    switch (name) {
        // Vitamins
        case "Vitamin A":
            return unit === "IU" ? amount * 0.0003 : amount;
        case "Vitamin D":
            return unit === "IU" ? amount * 0.000025 : amount;
        case "Vitamin K":
        case "Vitamin B12":
        case "Folate":
        case "Selenium":
            return unit === "µg" ? amount * 0.001 : amount;

        // Minerals
        case "Calcium":
        case "Iron":
        case "Magnesium":
        case "Zinc":
        case "Sodium":
        case "Potassium":
        case "Phosphorus":
        case "Copper":
        case "Manganese":
            return unit === "µg" ? amount * 0.001 : amount;

        default:
            return amount;
    }
};

// Custom handler for macronutrients
const getMacroNutrients = (nutrients) =>
    nutrients
        .filter((n) =>
            ["Calories", "Protein", "Fat", "Carbohydrates"].includes(n.name)
        )
        .map((n) => {
            let unit = n.unit;
            let value = n.amount;

            if (n.name === "Calories") {
                // Convert kcal to Cal
                unit = "Cal";
            }

            return {
                name: n.name,
                value: parseFloat(value.toFixed(2)),
                unit,
                display: `${parseFloat(value.toFixed(2))} ${unit}`,
            };
        });

const getNutrients = (names, nutrients) =>
    nutrients
        .filter((n) => names.includes(n.name))
        .map((n) => {
            const converted = unitToMg(n.name, n.amount, n.unit);
            return {
                name: n.name,
                value: parseFloat(converted.toFixed(2)),
                display: `${parseFloat(converted.toFixed(2))} mg`,
            };
        });

const NutritionChart = ({ nutrients }) => {
    if (!nutrients) return null;

    const macroData = getMacroNutrients(nutrients);

    const vitaminNames = [
        "Vitamin A",
        "Vitamin C",
        "Vitamin D",
        "Vitamin E",
        "Vitamin K",
        "Vitamin B1",
        "Vitamin B2",
        "Vitamin B3",
        "Vitamin B5",
        "Vitamin B6",
        "Vitamin B12",
        "Folate",
    ];

    const mineralNames = [
        "Calcium",
        "Iron",
        "Magnesium",
        "Zinc",
        "Sodium",
        "Potassium",
        "Phosphorus",
        "Copper",
        "Manganese",
        "Selenium",
    ];

    const vitaminData = getNutrients(vitaminNames, nutrients);
    const mineralData = getNutrients(mineralNames, nutrients);

    return (
        <div className="nutrition-section">
            {/* Macronutrients */}
            <div className="nutrition-block">
                <h4>Macronutrient Breakdown</h4>
                <div className="nutrition-flex">
                    <ResponsiveContainer width="60%" height={250}>
                        <PieChart>
                            <Pie
                                data={macroData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={80}
                                label
                            >
                                {macroData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="nutrient-list">
                        {macroData.map((n, index) => (
                            <div key={index} className="nutrient-item">
                                <strong>{n.name}:</strong> {n.display}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vitamins */}
            <div className="nutrition-block">
                <h4>Vitamins</h4>
                <div className="nutrition-flex">
                    <ResponsiveContainer width="60%" height={250}>
                        <RadarChart outerRadius={90} data={vitaminData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <Radar
                                name="Vitamins"
                                dataKey="value"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                    <div className="nutrient-list">
                        {vitaminData.map((n, index) => (
                            <div key={index} className="nutrient-item">
                                <strong>{n.name}:</strong> {n.display}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Minerals */}
            <div className="nutrition-block">
                <h4>Minerals</h4>
                <div className="nutrition-flex">
                    <ResponsiveContainer width="60%" height={250}>
                        <BarChart data={mineralData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="nutrient-list">
                        {mineralData.map((n, index) => (
                            <div key={index} className="nutrient-item">
                                <strong>{n.name}:</strong> {n.display}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionChart;
