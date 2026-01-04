
// Food Logic
const foodBtn = document.getElementById('food-btn');
const foodCityInput = document.getElementById('food-city');
const foodCuisineInput = document.getElementById('food-cuisine');
const foodResult = document.getElementById('food-result');

if (foodBtn) {
    foodBtn.addEventListener('click', async () => {
        const city = foodCityInput.value;
        const cuisine = foodCuisineInput.value;

        if (!city) {
            alert('Please enter a city or area');
            return;
        }

        foodResult.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Searching for delicious food...</p>';

        try {
            // Construct query: e.g., "Italian restaurants in Mumbai"
            const query = `${cuisine ? cuisine + ' ' : ''}restaurants in ${city}`;
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=20`);
            const data = await res.json();

            if (data && data.length > 0) {
                foodResult.innerHTML = data.map(place => {
                    // Use a generic food image since API doesn't provide one
                    const randomImage = `https://source.unsplash.com/featured/?restaurant,food&sig=${place.place_id}`;
                    const type = place.type ? place.type.replace('_', ' ') : 'Restaurant';

                    return `
                    <div class="food-card">
                        <img src="${randomImage}" alt="${place.display_name}">
                        <div class="food-card-content">
                            <h3>${place.name || place.display_name.split(',')[0]}</h3>
                            <span class="cuisine" style="text-transform: capitalize;">${type}</span>
                            <div class="details">
                                <span><i class="fas fa-map-marker-alt"></i> ${place.display_name.split(',').slice(1, 3).join(',')}</span>
                            </div>
                        </div>
                    </div>
                `}).join('');
            } else {
                foodResult.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No food places found matching your criteria. Try a different city or cuisine.</p>';
            }
        } catch (error) {
            console.error('Error fetching food:', error);
            foodResult.innerHTML = '<p class="error" style="text-align: center; grid-column: 1/-1;">Error fetching food suggestions</p>';
        }
    });
}
