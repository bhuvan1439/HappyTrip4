const getFoodSuggestions = async (req, res) => {
    const { city, cuisine } = req.query;

    // Mock Data (India Focused)
    const mockPlaces = [
        {
            id: 1,
            name: "Karim's",
            cuisine: "Mughlai",
            rating: 4.8,
            priceRange: "$$",
            image: "https://source.unsplash.com/featured/?kebab",
            location: "Delhi"
        },
        {
            id: 2,
            name: "Britannia & Co.",
            cuisine: "Parsi",
            rating: 4.7,
            priceRange: "$$",
            image: "https://source.unsplash.com/featured/?berrypulao",
            location: "Mumbai"
        },
        {
            id: 3,
            name: "Saravana Bhavan",
            cuisine: "South Indian",
            rating: 4.6,
            priceRange: "$",
            image: "https://source.unsplash.com/featured/?dosa",
            location: "Chennai"
        },
        {
            id: 4,
            name: "Paradise Biryani",
            cuisine: "Biryani",
            rating: 4.9,
            priceRange: "$$",
            image: "https://source.unsplash.com/featured/?biryani",
            location: "Hyderabad"
        },
        {
            id: 5,
            name: "Peter Cat",
            cuisine: "Continental",
            rating: 4.8,
            priceRange: "$$$",
            image: "https://source.unsplash.com/featured/?sizzler",
            location: "Kolkata"
        }
    ];

    // Simple filter simulation
    let results = mockPlaces;
    if (cuisine) {
        results = results.filter(p => p.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
    }

    if (city) {
        results = results.filter(p => p.location.toLowerCase().includes(city.toLowerCase()));
    }

    res.json({
        city: city || "India",
        results: results
    });
};

module.exports = { getFoodSuggestions };
