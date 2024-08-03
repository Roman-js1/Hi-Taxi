document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.container');

  function clearActiveSection() {
    sections.forEach(section => section.classList.add('hidden'));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      clearActiveSection();
      document.getElementById(targetId).classList.remove('hidden');
    });
  });

  // Optional: Show home section initially
  document.getElementById('home').classList.remove('hidden');

  // Handle Share Location button
  const shareLocationButton = document.getElementById('share-location');
  const locationStatus = document.getElementById('location-status');

  shareLocationButton.addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      locationStatus.textContent = "Geolocation is not supported by this browser.";
    }
  });

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    locationStatus.innerHTML = `
            <p>Your location has been shared!</p>
            <p>Latitude: ${lat}</p>
            <p>Longitude: ${lon}</p>
            <p><a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">View on Google Maps</a></p>
        `;
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        locationStatus.textContent = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        locationStatus.textContent = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        locationStatus.textContent = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        locationStatus.textContent = "An unknown error occurred.";
        break;
    }
  }
});