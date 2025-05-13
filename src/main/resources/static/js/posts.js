// posts.js - Handles post loading and display
const Posts = (function() {
    // DOM Elements
    let postsContainer;

    // Initialize the posts module
    function init() {
        postsContainer = document.getElementById('posts-container');
        loadPosts();
    }

    // Load posts from the server
    function loadPosts() {
        if (!postsContainer) return;

        fetch('/api/posts')
            .then(response => response.json())
            .then(posts => {
                if (posts.length === 0) {
                    displayEmptyState();
                    return;
                }

                displayPosts(posts);
            })
            .catch(error => {
                console.error('Error:', error);
                postsContainer.innerHTML = `
                    <div class="empty-state">
                        <p>Failed to load posts. Please try again later.</p>
                    </div>
                `;
            });
    }

    // Display empty state
    function displayEmptyState() {
        postsContainer.innerHTML = `
            <div class="empty-state">
                <p>No posts yet. Be the first to share something!</p>
            </div>
        `;
    }

    // Display posts
    function displayPosts(posts) {
        let html = '';

        posts.forEach(post => {
            const createdAt = new Date(post.createdAt).toLocaleString();
            const truncatedContent = post.content.length > 150
                ? post.content.substring(0, 150) + '...'
                : post.content;

            html += `
                <div class="post-card">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span>${post.user.username}</span>
                        <span style="margin: 0 0.5rem;">•</span>
                        <span>${createdAt}</span>
                    </div>
                    <div class="post-content">
                        ${truncatedContent}
                    </div>
                    <div class="post-actions">
                        <a href="/post/${post.id}" class="read-more">Read more</a>
                    </div>
                </div>
            `;
        });

        postsContainer.innerHTML = html;
    }

    // Public API
    return {
        init,
        loadPosts
    };
})();