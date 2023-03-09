// Define the deleteFormHandler function
async function deleteFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the post ID from the current URL
    const post_id = window.location.toString().split('/').pop();
  
    // Send a DELETE request to the server to delete the post
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE'
    });
  
    // If the response is OK, redirect to the dashboard
    if (response.ok) {
      window.location.replace('/dashboard');
    } else {
      // If there was an error, show an alert with the status text
      alert(response.statusText);
    }
  }
  
  // Add an event listener to the delete button
  const deleteButton = document.querySelector('.delete-post-btn');
  deleteButton.addEventListener('click', deleteFormHandler);
  