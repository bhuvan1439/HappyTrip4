document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');
    const tripCount = document.getElementById('trip-count');
    const tripsGrid = document.getElementById('trips-grid');
    const myspaceSection = document.getElementById('myspace');

    // Check if user is logged in
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        if (myspaceSection) {
            myspaceSection.innerHTML = `
                <div class="container" style="text-align: center; padding: 5rem;">
                    <h2>Please Login to View My Space</h2>
                    <p>Access your profile and travel history by logging in.</p>
                    <button class="btn-cta" onclick="document.querySelector('.btn-login').click()">Login Now</button>
                </div>
            `;
        }
        return;
    }

    // Fetch User Profile
    fetchUserProfile();
    // Fetch User Trips
    fetchUserTrips();

    async function fetchUserProfile() {
        try {
            const res = await fetch(`${window.API_URL}/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            const data = await res.json();

            if (res.ok) {
                if (profileName) profileName.textContent = data.name;
                if (profileEmail) profileEmail.textContent = data.email;
                if (profileAvatar) profileAvatar.textContent = data.name.charAt(0).toUpperCase();
            } else {
                console.error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    async function fetchUserTrips() {
        try {
            const res = await fetch(`${window.API_URL}/api/trips`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            const data = await res.json();

            if (res.ok) {
                if (tripCount) tripCount.textContent = data.length;
                renderTrips(data);
            } else {
                console.error('Failed to fetch trips');
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    }

    function renderTrips(trips) {
        if (!tripsGrid) return;

        if (trips.length === 0) {
            tripsGrid.innerHTML = '<div class="no-trips">No trips found. Start planning your first yatra!</div>';
            return;
        }

        tripsGrid.innerHTML = trips.map(trip => `
            <div class="trip-card">
                <div class="trip-header">
                    <span>Trip #${trip.tripNumber || '?'} - ${trip.destination}</span>
                    <span class="trip-status">${trip.status || 'Planned'}</span>
                </div>
                <div class="trip-body">
                    <div class="trip-detail">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-wallet"></i>
                        <span>Budget: ₹${trip.budget}</span>
                    </div>
                    <div class="trip-itinerary">
                        <h4>Itinerary Highlights:</h4>
                        <ul>
                            ${trip.itinerary.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
                            ${trip.itinerary.length > 3 ? `<li>+${trip.itinerary.length - 3} more</li>` : ''}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }
});
