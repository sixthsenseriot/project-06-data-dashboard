import "./About.css";

const About = () => {
    return (
        <div className="about-page">
            <h2>About Yommers</h2>
            <p>
                <strong>Yommers</strong> is your all-in-one recipe search app
                designed for food lovers and health-conscious cooks alike.
                Easily discover a wide variety of recipes complete with
                ingredients, step-by-step cooking instructions, and detailed
                nutrition facts.
            </p>
            <p>
                Whether you're in the mood for a specific cuisine, following a
                particular diet, or tracking your calorie intake, Yommers helps
                you filter and find the perfect dish for any craving or
                lifestyle.
            </p>
            <p>
                Our app also visualizes nutritional data using beautiful and
                easy-to-read charts and graphs to help you make more informed
                decisions about what you eat.
            </p>
            <p>
                This web app was created as part of a lab for
                <strong> CodePath’s WEB102</strong> course.
            </p>
            <p>
                Eat smart. Cook better. Explore delicious possibilities with
                Yommers.
            </p>

            <hr style={{ margin: "2rem 0" }} />

            <div className="about-links">
                <a
                    href="https://github.com/sixthsenseriot"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>

                <a
                    href="https://www.linkedin.com/in/khanh-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>

                <a
                    href="https://starchdev.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Portfolio
                </a>
            </div>

            <div className="created-by-container">
                <p className="created-by">
                    Created by Khanh Nguyen - 2025/07/21
                </p>
            </div>
        </div>
    );
};

export default About;
