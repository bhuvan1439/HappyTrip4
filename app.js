console.log('HappyTrip Frontend Loaded');

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Weather Logic
const weatherBtn = document.getElementById('weather-btn');
const weatherInput = document.getElementById('weather-city');
const weatherResult = document.getElementById('weather-result');

if (weatherBtn) {
    weatherBtn.addEventListener('click', async () => {
        const city = weatherInput.value;
        if (!city) return;

        try {
            const res = await fetch(`${window.API_URL}/api/weather?city=${city}`);
            const data = await res.json();

            if (data.message) {
                weatherResult.innerHTML = `<p class="error">${data.message}</p>`;
            } else {
                weatherResult.innerHTML = `
                    <div class="weather-card">
                        <h3>${data.name}</h3>
                        <p class="temp">${Math.round(data.main.temp)}°C</p>
                        <p class="condition">${data.weather[0].main}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind: ${data.wind.speed} km/h</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error(error);
            weatherResult.innerHTML = `<p class="error">Error fetching weather</p>`;
        }
    });
}

// Map Logic
const mapElement = document.getElementById('map');
if (mapElement) {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const findRouteBtn = document.getElementById('find-route-btn');
    if (findRouteBtn) {
        findRouteBtn.addEventListener('click', async () => {
            try {
                const res = await fetch(`${window.API_URL}/api/maps/routes?origin=A&destination=B`);
                const data = await res.json();

                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0];
                    alert(`Found ${data.routes.length} routes. Best: ${route.summary} (${route.duration})`);
                    // In a real app, we would draw the polyline here
                    // L.polyline(route.coordinates, {color: 'red'}).addTo(map);
                }
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        });
    }
}

// Chat Logic
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const sendMessage = async () => {
        const text = chatInput.value;
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        try {
            const res = await fetch(`${window.API_URL}/api/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            addMessage(data.reply, 'bot');
        } catch (error) {
            addMessage('Sorry, I am having trouble connecting.', 'bot');
        }
    };

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}
