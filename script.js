document.addEventListener('DOMContentLoaded', function() {
    function loadComponent(componentId, filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(html => {
                document.getElementById(componentId).innerHTML = html;
            })
            .catch(error => console.error(`Error loading ${filePath}:`, error));
    }

    loadComponent('navbar-placeholder', 'components/navbar.html');
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('about-us-placeholder', 'components/about-us.html');
    loadComponent('announcements-placeholder', 'components/announcements.html');
    loadComponent('players-placeholder', 'components/players.html');
    loadComponent('games-placeholder', 'components/games.html');
    loadComponent('discord-placeholder', 'components/discord.html');
    loadComponent('announcements-placeholder', 'components/announcements.html');
    loadComponent('footer-placeholder', 'components/footer.html');

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) { // Show button after scrolling 100px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});