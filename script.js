document.addEventListener('DOMContentLoaded', function() {
    function loadComponent(componentId, filePath, callback) {
        fetch(filePath)
            .then(response => response.text())
            .then(html => {
                document.getElementById(componentId).innerHTML = html;
                if (callback) {
                    callback();
                }
            })
            .catch(error => console.error(`Error loading ${filePath}:`, error));
    }

    loadComponent('navbar-placeholder', 'components/navbar.html', setupNavbarToggle);
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('announcements-placeholder', 'components/announcements.html', setupAnnouncements);
    loadComponent('about-us-placeholder', 'components/about-us.html');
    loadComponent('players-placeholder', 'components/players.html');
    loadComponent('games-placeholder', 'components/games.html');
    loadComponent('community-placeholder', 'components/community.html', () => {
        loadComponent('discord-section-placeholder', 'components/discord.html');
        loadComponent('twitch-section-placeholder', 'components/twitch.html');
        loadComponent('instagram-section-placeholder', 'components/instagram.html');
        loadComponent('youtube-section-placeholder', 'components/youtube.html');
    });
    loadComponent('footer-placeholder', 'components/footer.html');

    function setupAnnouncements() {
        const announcementGrid = document.querySelector('.announcement-grid');
        const announcements = Array.from(announcementGrid.children);
        const showMoreButton = document.getElementById('show-more-announcements');
        const showAllButton = document.getElementById('show-all-announcements');
        let visibleCount = 4;

        function updateVisibility() {
            announcements.forEach((announcement, index) => {
                announcement.style.display = index < visibleCount ? 'block' : 'none';
            });

            if (visibleCount >= announcements.length) {
                showMoreButton.style.display = 'none';
                showAllButton.style.display = 'none';
            } else {
                showMoreButton.style.display = 'inline-block';
                showAllButton.style.display = 'inline-block';
            }
        }

        showMoreButton.addEventListener('click', () => {
            visibleCount += 4;
            updateVisibility();
        });

        showAllButton.addEventListener('click', () => {
            visibleCount = announcements.length;
            updateVisibility();
        });

        updateVisibility();
    }

    function setupNavbarToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

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