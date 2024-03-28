document.addEventListener('DOMContentLoaded', function () {
    const expertsContainer = document.getElementById('experts-container');

    // Fetch the JSON data
    fetch('experts.json')
        .then(response => response.json())
        .then(expertsData => {
            expertsData.forEach(expert => {
                expertsContainer.innerHTML += `
                    <div class="expert-card">
                        <img src="${expert.image}" alt="${expert.name}">
                        <h2>${expert.name}</h2>
                        <p>Email: ${expert.email}</p>
                        <p>Phone: ${expert.phone}</p>
                        <h3>${expert.occupation}</h3>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menuButton');
    const menuContent = document.getElementById('menuContent');
  
    // Toggle the 'show' class to display or hide the menu
    menuButton.addEventListener('click', function () {
      menuContent.classList.toggle('show');
    });
  
    // Close the menu if the user clicks outside of it
    window.addEventListener('click', function (event) {
      if (!event.target.matches('#menuButton')) {
        if (menuContent.classList.contains('show')) {
          menuContent.classList.remove('show');
        }
      }
    });
  });