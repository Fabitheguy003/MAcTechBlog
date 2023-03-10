function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Failed to sign up');
      });
    }
  }
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  
