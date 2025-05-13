// main.js - Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules only if they exist in the current page

    // Check if postContainer exists before trying to load posts
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer && typeof loadPosts === 'function') {
        loadPosts();
    }

    // Initialize modal functionality
    initializeModal();

    console.log('Dip forum initialized');
});

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('postModal');
    const newPostBtn = document.getElementById('newPostBtn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelBtn');
    const postForm = document.getElementById('postForm');

    // Only add event listeners if elements exist
    if (newPostBtn) {
        newPostBtn.addEventListener('click', function() {
            if (modal) modal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Handle form submission
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const postData = {
                username: document.getElementById('username').value,
                title: document.getElementById('title').value,
                content: document.getElementById('content').value
            };

            // Send data to server
            fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to create post');
                    }
                    return response.json();
                })
                .then(data => {
                    // Close modal and reset form
                    if (modal) modal.style.display = 'none';
                    if (postForm) postForm.reset();

                    // Reload posts if function exists
                    if (typeof loadPosts === 'function') {
                        loadPosts();
                    } else {
                        // Redirect to home page if on another page
                        window.location.href = '/';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(error.message);
                });
        });
    }
}