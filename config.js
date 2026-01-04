const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://your-render-backend-url.onrender.com'; // You will update this after deploying backend

// Export for use in other files (if using modules) or just global
window.API_URL = API_URL;
