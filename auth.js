const loginBtn = document.querySelector('.btn-login');
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close-modal');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubmit = document.getElementById('auth-submit');
const switchAuth = document.getElementById('switch-auth');
const switchAuthLink = document.getElementById('switch-auth-link');

let isLogin = true;

if (loginBtn && authModal) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        authModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });

    switchAuthLink.addEventListener('click', () => {
        isLogin = !isLogin;
        if (isLogin) {
            authTitle.textContent = 'Login';
            authSubmit.textContent = 'Login';
            switchAuth.innerHTML = 'Don\'t have an account? <a id="switch-auth-link">Register</a>';
            // Re-attach event listener because innerHTML replaced the element
            document.getElementById('switch-auth-link').addEventListener('click', toggleAuth);
        } else {
            authTitle.textContent = 'Register';
            authSubmit.textContent = 'Register';
            switchAuth.innerHTML = 'Already have an account? <a id="switch-auth-link">Login</a>';
            document.getElementById('switch-auth-link').addEventListener('click', toggleAuth);
        }
    });

    function toggleAuth() {
        isLogin = !isLogin;
        updateAuthUI();
    }

    function updateAuthUI() {
        if (isLogin) {
            authTitle.textContent = 'Login';
            authSubmit.textContent = 'Login';
            switchAuth.innerHTML = 'Don\'t have an account? <a id="switch-auth-link">Register</a>';
        } else {
            authTitle.textContent = 'Register';
            authSubmit.textContent = 'Register';
            switchAuth.innerHTML = 'Already have an account? <a id="switch-auth-link">Login</a>';
        }
        document.getElementById('switch-auth-link').addEventListener('click', toggleAuth);
    }

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const body = isLogin ? { email, password } : { name: 'User', email, password }; // Mock name for register

        try {
            const res = await fetch(`${window.API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (res.ok) {
                alert(`${isLogin ? 'Login' : 'Registration'} successful! Welcome ${data.name || ''}`);
                authModal.classList.remove('active');
                localStorage.setItem('userInfo', JSON.stringify(data));
                loginBtn.textContent = 'Logout';
            } else {
                alert(data.message || 'Error');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    });

    // Google Login Logic
    const googleBtn = document.getElementById('google-login-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            // Simulate Google Login Popup
            const userName = prompt('Enter your name for Google Login Simulation:', 'Google User') || 'Google User';
            const mockGoogleUser = {
                email: 'googleuser@example.com',
                name: userName,
                googleId: '123456789'
            };

            if (confirm('Simulating Google Login... Continue as "Google User"?')) {
                try {
                    const res = await fetch(`${window.API_URL}/api/auth/google`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(mockGoogleUser)
                    });
                    const data = await res.json();

                    if (res.ok) {
                        alert(`Google Login successful! Welcome ${data.name}`);
                        authModal.classList.remove('active');
                        localStorage.setItem('userInfo', JSON.stringify(data));
                        loginBtn.textContent = 'Logout';
                    } else {
                        alert(data.message || 'Error');
                    }
                } catch (error) {
                    console.error(error);
                    alert('Google Login failed');
                }
            }
        });
    }

    // Facebook Login Logic
    const facebookBtn = document.getElementById('facebook-login-btn');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', async () => {
            // Simulate Facebook Login Popup
            const userName = prompt('Enter your name for Facebook Login Simulation:', 'Facebook User') || 'Facebook User';
            const mockFacebookUser = {
                email: 'facebookuser@example.com',
                name: userName,
                facebookId: '987654321'
            };

            if (confirm('Simulating Facebook Login... Continue as "Facebook User"?')) {
                try {
                    const res = await fetch(`${window.API_URL}/api/auth/facebook`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(mockFacebookUser)
                    });
                    const data = await res.json();

                    if (res.ok) {
                        alert(`Facebook Login successful! Welcome ${data.name}`);
                        authModal.classList.remove('active');
                        localStorage.setItem('userInfo', JSON.stringify(data));
                        loginBtn.textContent = 'Logout';
                    } else {
                        alert(data.message || 'Error');
                    }
                } catch (error) {
                    console.error(error);
                    alert('Facebook Login failed');
                }
            }
        });
    }
}
