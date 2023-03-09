async function editFormHandler(event) {
    event.preventDefault();
  
    const titleInput = document.querySelector('input[name="post-title"]');
    const contentInput = document.querySelector('textarea[name="post-content"]');
  
    const post_id = window.location.pathname.split('/').pop();
  
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: titleInput.value, 
        post_content: contentInput.value.trim() 
      })
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.error(`Failed to edit post: ${response.status} ${response.statusText}`);
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  