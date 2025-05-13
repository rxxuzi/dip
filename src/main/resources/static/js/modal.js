// modal.js - Handles the post modal functionality
const Modal = (function() {
    // DOM Elements
    let modal;
    let newPostBtn;
    let closeBtn;
    let cancelBtn;
    let postForm;

    // Initialize the modal
    function init() {
        // Get DOM Elements
        modal = document.getElementById('postModal');
        newPostBtn = document.getElementById('newPostBtn');
        closeBtn = document.querySelector('.close-btn');
        cancelBtn = document.getElementById('cancelBtn');
        postForm = document.getElementById('postForm');

        // Add event listeners
        if (newPostBtn) newPostBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Form submission
        if (postForm) {
            postForm.addEventListener('submit', handleSubmit);
        }
    }

    // Open the modal
    function openModal() {
        if (modal) modal.style.display = 'block';
    }

    // Close the modal
    function closeModal() {
        if (modal) modal.style.display = 'none';
        if (postForm) postForm.reset();
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        const postData = {
            username: document.getElementById('username').value,
            title: document.getElementById('title').value,
            content: document.getElementById('content').value
        };

        // Send data to the server
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
                // Close modal and refresh posts
                closeModal();
                Posts.loadPosts();
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    // Public API
    return {
        init,
        openModal,
        closeModal
    };
})();