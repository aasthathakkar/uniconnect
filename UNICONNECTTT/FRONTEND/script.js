// Create a post element
function createThreadPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'thread-post';

    const user = post.user || {}; // handle nested user object

    postElement.innerHTML = `
        <div class="post-header">
            <img src="${user.avatar || 'default-avatar.jpg'}" alt="${user.name || 'User'}" class="user-avatar">
            <div class="user-info">
                <h3 onclick="navigateToProfile('${user._id}')">${user.name || 'Anonymous'}</h3>
                <p>${user.college || ''} • ${user.branch || ''}</p>
            </div>
        </div>
        <div class="post-content">
            ${post.content || ''}
        </div>
        <div class="requirements">
            <h4>Team Requirements:</h4>
            <ul>
                ${(post.requirements || []).map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        <div class="contact-info">
            <a href="mailto:${user.email}" class="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
            </a>
            <a href="sms:${user.phone}" class="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Message
            </a>
        </div>
    `;

    return postElement;
}

// Navigate to user profile
function navigateToProfile(userId) {
    window.location.href = `profile.html?userId=${userId}`;
}

// Fetch and render all posts
async function fetchPosts() {
    const threadContainer = document.getElementById('threadContainer');
    threadContainer.innerHTML = '<p>Loading posts...</p>';

    try {
        const response = await fetch('http://localhost:3002/api/posts'); // Adjust to match backend
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        threadContainer.innerHTML = `<div class="error-message">Failed to load posts. Please try again later.</div>`;
    }
}

// Render posts on the page
function renderPosts(posts) {
    const threadContainer = document.getElementById('threadContainer');
    threadContainer.innerHTML = '';
    posts.forEach(post => {
        threadContainer.appendChild(createThreadPost(post));
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', fetchPosts);
