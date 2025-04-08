document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('eventForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
  
        // Get form values
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const venue = document.getElementById('eventVenue').value;
        const mode = document.getElementById('eventMode').value;
        const priority = document.getElementById('eventPriority').value;
        const teamSize = document.getElementById('teamSize').value;
        const prizeWorth = document.getElementById('prizeWorth').value;
        const image = document.getElementById('eventImage').value;
        const description = document.getElementById('eventDescription').value;
  
        // Create event card
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
  
        // Add HTML inside the card
        eventCard.innerHTML = `
          <img src="${image}" alt="${title}" class="event-image">
          <span class="badge ${mode.toLowerCase()}">${mode}</span>
          <span class="badge ${priority.toLowerCase()}-priority">${priority} Priority</span>
  
          <div class="event-info">
            <h3>${title}</h3>
            <p><i class="fa fa-calendar"></i> ${formatDate(date)}</p>
            <p><i class="fa fa-trophy"></i> Prize: ${prizeWorth}</p>
            <p><i class="fa fa-users"></i> Team: ${teamSize}</p>
          </div>
  
          <button class="view-details-btn">View Details</button>
        `;
  
        // Append to grid
        document.getElementById('eventGrid').appendChild(eventCard);
  
        // Clear and close modal
        document.getElementById('eventForm').reset();
        document.getElementById('eventModal').style.display = 'none';
    });
  
    // Helper to format date (e.g. 2026-01-28 → 28 January 2026)
    function formatDate(dateStr) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-GB', options);
    }
  });
  
