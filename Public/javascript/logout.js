function logout() {
    fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        document.location.replace('/');
      } else {
        throw new Error('Failed to logout');
      }
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
  }
  
  document.querySelector('#logout').addEventListener('click', logout);
  