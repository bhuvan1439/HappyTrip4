const getPlaces = async (req, res) => {
    const { city, category } = req.query;

    // Mock Data for Places (India Focused)
    const mockPlaces = [
        {
            id: 1,
            name: "Taj Mahal",
            category: "Monument",
            rating: 4.9,
            image: "https://source.unsplash.com/featured/?tajmahal",
            description: "An immense mausoleum of white marble, built in Agra.",
            location: "Agra"
        },
        {
            id: 2,
            name: "Gateway of India",
            category: "Monument",
            rating: 4.7,
            image: "https://source.unsplash.com/featured/?gatewayofindia",
            description: "An arch-monument built in the 20th century in Mumbai.",
            location: "Mumbai"
        },
        {
            id: 3,
            name: "Red Fort",
            category: "History",
            rating: 4.6,
            image: "https://source.unsplash.com/featured/?redfort",
            description: "A historic fort in the city of Delhi.",
            location: "Delhi"
        },
        {
            id: 4,
            name: "Hawa Mahal",
            category: "History",
            rating: 4.5,
            image: "https://source.unsplash.com/featured/?hawamahal",
            description: "The Palace of Winds, a palace in Jaipur.",
            location: "Jaipur"
        },
        {
            id: 5,
            name: "Kerala Backwaters",
            category: "Nature",
            rating: 4.8,
            image: "https://source.unsplash.com/featured/?keralabackwaters",
            description: "A network of brackish lagoons and lakes.",
            location: "Kerala"
        },
        {
            id: 6,
            name: "Goa Beaches",
            category: "Beach",
            rating: 4.7,
            image: "https://source.unsplash.com/featured/?goabeach",
            description: "Famous for its sandy beaches and nightlife.",
            location: "Goa"
        }
    ];

    let results = mockPlaces;
    if (category) {
        results = results.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    // Simple city filter simulation
    if (city) {
        results = results.filter(p => p.location.toLowerCase().includes(city.toLowerCase()));
    }

    res.json({
        city: city || "India",
        results: results
    });
};

module.exports = { getPlaces };
