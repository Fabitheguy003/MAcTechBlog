// Define the createPostHandler function
const createPostHandler = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Redirect the user to the new post page
    window.location.replace('/dashboard/new');
  };
  
  // Add an event listener to the create new post button
  const createNewPostButton = document.querySelector('#create-new-post');
  createNewPostButton.addEventListener('click', createPostHandler);
  