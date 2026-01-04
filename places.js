const placesBtn = document.getElementById('places-btn');
const placesCityInput = document.getElementById('places-city');
const placesCategoryInput = document.getElementById('places-category');
const placesResult = document.getElementById('places-result');

if (placesBtn) {
    placesBtn.addEventListener('click', async () => {
        const city = placesCityInput.value;
        const category = placesCategoryInput.value;

        if (!city) {
            alert('Please enter a city');
            return;
        }

        placesResult.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Searching for heritage sites...</p>';

        try {
            // Construct query: e.g., "temples in Varanasi" or "tourist attractions in Varanasi"
            let query = '';
            if (category) {
                query = `${category} in ${city}`;
            } else {
                // Default to heritage-related searches if no category provided
                query = `tourist attractions in ${city}`;
            }

            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=20`);
            const data = await res.json();

            if (data && data.length > 0) {
                placesResult.innerHTML = data.map(place => {
                    // Use a generic heritage image since API doesn't provide one
                    const randomImage = `https://source.unsplash.com/featured/?temple,monument,museum&sig=${place.place_id}`;
                    const type = place.type ? place.type.replace('_', ' ') : 'Heritage Site';

                    return `
                    <div class="place-card">
                        <img src="${randomImage}" alt="${place.display_name}" class="place-image">
                        <div class="place-content">
                            <span class="place-category" style="text-transform: capitalize;">${type}</span>
                            <h3 class="place-title">${place.name || place.display_name.split(',')[0]}</h3>
                            <div class="place-rating">
                                <i class="fas fa-star"></i> 4.5
                            </div>
                            <p class="place-desc">${place.display_name}</p>
                            <div class="place-location">
                                <i class="fas fa-map-marker-alt"></i> ${place.display_name.split(',').slice(1, 3).join(',')}
                            </div>
                        </div>
                    </div>
                `}).join('');
            } else {
                placesResult.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No heritage sites found matching your criteria. Try searching for "Temples", "Museums", or "Forts".</p>';
            }
        } catch (error) {
            console.error('Error fetching places:', error);
            placesResult.innerHTML = '<p class="error" style="text-align: center; grid-column: 1/-1;">Error fetching heritage sites</p>';
        }
    });
}
