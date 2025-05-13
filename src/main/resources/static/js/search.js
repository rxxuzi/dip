// search.js - Handles the search functionality

// Debounce function to limit API calls during typing
function debounce(func, delay) {
    let timeout;

    return function() {
        const context = this;
        const args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchSummary = document.getElementById('search-summary');

    // Post data cache
    let postsCache = [];

    // Only run search related code if we're on the search page
    if (searchForm && searchInput) {
        // Set focus on search input
        searchInput.focus();

        // Create a container for results if it doesn't exist
        if (!searchResults) {
            const searchContainer = document.getElementById('search-container');
            if (searchContainer) {
                // Create search summary element if it doesn't exist
                if (!searchSummary) {
                    const summaryElement = document.createElement('div');
                    summaryElement.id = 'search-summary';
                    summaryElement.className = 'search-summary';
                    summaryElement.style.display = 'none';
                    searchContainer.appendChild(summaryElement);
                }

                // Create search results container if it doesn't exist
                const resultsElement = document.createElement('div');
                resultsElement.id = 'search-results';
                resultsElement.className = 'search-results';
                searchContainer.appendChild(resultsElement);
            }
        }

        // Handle real-time search with debounce
        searchInput.addEventListener('input', debounce(function() {
            const query = searchInput.value.trim();

            if (query.length >= 1) {
                performSearch(query);
            } else {
                // Clear results when input is empty
                clearSearchResults();
            }
        }, 200));

        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        });
    }

    // Initialize the preview modal
    initPreviewModal();

    // Function to perform search
    function performSearch(query) {
        // Get search results element again in case it was created after page load
        const searchResults = document.getElementById('search-results');
        const searchSummary = document.getElementById('search-summary');

        if (!searchResults) return;

        // Show loading state
        searchResults.innerHTML = '<div class="loading-state">Searching...</div>';

        // Fetch search results from API
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Search request failed');
                }
                return response.json();
            })
            .then(results => {
                // Cache the results
                postsCache = results;

                // Update URL without reloading the page
                const url = new URL(window.location);
                url.searchParams.set('keyword', query);
                window.history.pushState({}, '', url);

                // Update search summary
                if (searchSummary) {
                    searchSummary.style.display = 'block';
                    searchSummary.innerHTML = `Results for "<span>${query}</span>": <span>${results.length}</span> found`;
                }

                // Display results
                displaySearchResults(results);
            })
            .catch(error => {
                console.error('Error:', error);
                searchResults.innerHTML = '<div class="error-state">Failed to perform search. Please try again later.</div>';
            });
    }

    // Function to display search results
    function displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="empty-state">No results found</div>';
            return;
        }

        let html = '';

        results.forEach(post => {
            html += `
                <div class="search-result-item" data-id="${post.id}">
                    <h3 class="result-title">${post.title}</h3>
                </div>
            `;
        });

        searchResults.innerHTML = html;

        // Add click handlers to search results
        const resultItems = document.querySelectorAll('.search-result-item');
        addClickHandlersToResults(resultItems);
    }

    // Function to add click handlers to search result items
    function addClickHandlersToResults(elements) {
        if (!elements || elements.length === 0) return;

        elements.forEach(element => {
            element.addEventListener('click', function() {
                const postId = this.getAttribute('data-id');
                if (!postId) return;

                // Try to find post in cache first
                let post = postsCache.find(p => p.id == postId);

                if (post) {
                    // Use cached post
                    showPostPreview(post);
                } else {
                    // Fetch post data if not in cache
                    fetch(`/api/posts/${postId}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to load post details');
                            }
                            return response.json();
                        })
                        .then(postData => {
                            // Add to cache
                            postsCache.push(postData);
                            showPostPreview(postData);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('Failed to load post details');
                        });
                }
            });
        });
    }

    // Function to clear search results
    function clearSearchResults() {
        const searchResults = document.getElementById('search-results');
        const searchSummary = document.getElementById('search-summary');

        if (searchResults) {
            searchResults.innerHTML = '';
        }

        if (searchSummary) {
            searchSummary.style.display = 'none';
        }
    }

    // Function to initialize preview modal
    function initPreviewModal() {
        // Check if preview modal exists
        let previewModal = document.getElementById('previewModal');

        // If preview modal doesn't exist, create it
        if (!previewModal) {
            // Create modal element
            previewModal = document.createElement('div');
            previewModal.id = 'previewModal';
            previewModal.className = 'preview-modal';

            // Create modal content
            previewModal.innerHTML = `
                <div class="preview-content">
                    <div class="preview-header">
                        <h3 class="preview-title" id="preview-title">Post Title</h3>
                        <div class="preview-meta">
                            <span id="preview-username">Username</span>
                            <span style="margin: 0 0.5rem;">•</span>
                            <span id="preview-date">Date</span>
                        </div>
                    </div>
                    <div class="preview-body" id="preview-body">
                        Content preview will appear here...
                    </div>
                    <div class="preview-actions">
                        <button class="btn btn-secondary preview-close">Cancel</button>
                        <a href="#" id="preview-read-more" class="btn">Read more</a>
                    </div>
                </div>
            `;

            // Add modal to body
            document.body.appendChild(previewModal);

            // Add event listeners to close buttons
            const closeButtons = document.querySelectorAll('.preview-close');
            if (closeButtons && closeButtons.length > 0) {
                closeButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        previewModal.style.display = 'none';
                    });
                });
            }

            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === previewModal) {
                    previewModal.style.display = 'none';
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && previewModal.style.display === 'block') {
                    previewModal.style.display = 'none';
                }
            });
        }
    }

    // Function to show post preview in modal
    function showPostPreview(post) {
        if (!post) return;

        // Get preview modal elements
        const previewModal = document.getElementById('previewModal');
        const previewTitle = document.getElementById('preview-title');
        const previewUsername = document.getElementById('preview-username');
        const previewDate = document.getElementById('preview-date');
        const previewBody = document.getElementById('preview-body');
        const previewReadMore = document.getElementById('preview-read-more');

        if (!previewModal || !previewTitle || !previewUsername || !previewDate || !previewBody || !previewReadMore) {
            console.error('Preview modal elements not found');
            return;
        }

        // Format date
        const createdAt = new Date(post.createdAt).toLocaleString();

        // Update modal content
        previewTitle.textContent = post.title;
        previewUsername.textContent = post.user ? post.user.username : 'Unknown';
        previewDate.textContent = createdAt;

        // Limit content to 200 characters
        const contentPreview = post.content.length > 200
            ? post.content.substring(0, 200) + '...'
            : post.content;

        previewBody.textContent = contentPreview;

        // Update read more link
        previewReadMore.href = `/post/${post.id}`;

        // Show modal
        previewModal.style.display = 'block';
    }
});