const loginFormHandler = async function(event) {
    event.preventDefault();

    const usernameInput = document.querySelector('#username-login');
    const passwordInput = document.querySelector('#password-login');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
