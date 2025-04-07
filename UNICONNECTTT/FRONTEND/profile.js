
async function createProfilePage(userId) {
    try {
        const response = await fetch(`http://localhost:3002/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');

        const user = await response.json();

        const profileElement = document.createElement('div');
        profileElement.className = 'profile-content';

        profileElement.innerHTML = `
            <div class="profile-header">
                <img src="${user.avatar || 'default-avatar.jpg'}" alt="${user.name}" class="profile-avatar">
                <div class="profile-info">
                    <h1>${user.name}</h1>
                    <p class="education-info">${user.branch || ''} • ${user.college || ''}</p>
                    <p class="year-info">${user.year || ''}</p>
                </div>
            </div>

            <div class="contact-section">
                <h2>Contact Information</h2>
                <div class="contact-links">
                    <a href="mailto:${user.email}" class="contact-link">📧 ${user.email}</a>
                    <a href="tel:${user.phone}" class="contact-link">📱 ${user.phone}</a>
                    ${user.socialMedia?.github ? `<a href="${user.socialMedia.github}" target="_blank" class="contact-link">GitHub</a>` : ''}
                    ${user.socialMedia?.linkedin ? `<a href="${user.socialMedia.linkedin}" target="_blank" class="contact-link">LinkedIn</a>` : ''}
                </div>
            </div>

            <div class="skills-section">
                <h2>Skills</h2>
                <div class="skills-list">
                    ${(user.skills || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('') || '<p>No skills listed</p>'}
                </div>
            </div>

            <div class="achievements-section">
                <h2>Achievements</h2>
                <div class="achievements-list">
                    ${(user.achievements || []).length > 0 ? user.achievements.map(a => `
                        <div class="achievement-card">
                            <h3>${a.title}</h3>
                            <p>${a.description}</p>
                        </div>
                    `).join('') : '<p>No achievements listed</p>'}
                </div>
            </div>

            <div class="participations-section">
                <h2>Past Participations</h2>
                <div class="participations-list">
                    ${(user.pastParticipations || []).length > 0 ? user.pastParticipations.map(p => `
                        <div class="participation-card">
                            <h3>${p.event}</h3>
                            <p>${p.date} • ${p.role}</p>
                        </div>
                    `).join('') : '<p>No past participations listed</p>'}
                </div>
            </div>
        `;

        document.getElementById('profileContainer').appendChild(profileElement);
    } catch (error) {
        document.getElementById('profileContainer').innerHTML = '<p class="error-message">Failed to load profile. Please try again later.</p>';
        console.error(error);
    }
}

// Get userId from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
console.log("User Id from URL", userId);

// Initialize the profile page
document.addEventListener('DOMContentLoaded', () => {
    if (userId) {
        createProfilePage(userId);
    } else {
        document.getElementById('profileContainer').innerHTML = '<p class="error-message">No user specified</p>';
    }
});
