document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and load an HTML component into a specified placeholder
    function loadComponent(componentId, filePath, callback) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById(componentId);
                if (placeholder) {
                    placeholder.innerHTML = html;
                    if (callback) {
                        callback();
                    }
                } else {
                    console.warn(`Placeholder with ID '${componentId}' not found.`);
                }
            })
            .catch(error => console.error(`Error loading ${filePath}:`, error));
    }

    // Array of component configurations for easy management
    const components = [
        { id: 'navbar-placeholder', path: 'components/navbar.html', callback: setupNavbarToggle },
        { id: 'header-placeholder', path: 'components/header.html' },
        { id: 'announcements-placeholder', path: 'components/announcements.html', callback: setupAnnouncements },
        { id: 'about-us-placeholder', path: 'components/about-us.html' },
        { id: 'players-placeholder', path: 'components/players.html' },
        { id: 'games-placeholder', path: 'components/games.html' },
        { id: 'streaming-placeholder', path: 'components/streaming.html' },
        { id: 'community-placeholder', path: 'components/community.html', callback: loadCommunitySubcomponents },
        { id: 'footer-placeholder', path: 'components/footer.html' }
    ];

    // Load all components defined in the array
    components.forEach(component => {
        loadComponent(component.id, component.path, component.callback);
    });

    // Setup navigation link highlighting
    setupNavLinkHighlighting();

    // Callback function to load subcomponents of the community section
    function loadCommunitySubcomponents() {
        const subComponents = [
            { id: 'discord-section-placeholder', path: 'components/discord.html' },
            { id: 'twitch-section-placeholder', path: 'components/twitch.html' },
            { id: 'instagram-section-placeholder', path: 'components/instagram.html' },
            { id: 'youtube-section-placeholder', path: 'components/youtube.html' }
        ];
        subComponents.forEach(component => {
            loadComponent(component.id, component.path);
        });
    }

    // Sets up the announcement visibility and "show more/all" functionality
    function setupAnnouncements() {
        const announcementGrid = document.querySelector('.announcement-grid');
        if (!announcementGrid) return;

        const announcements = Array.from(announcementGrid.children);
        const showMoreButton = document.getElementById('show-more-announcements');
        const showAllButton = document.getElementById('show-all-announcements');
        let visibleCount = 3;

        function updateVisibility() {
            announcements.forEach((announcement, index) => {
                announcement.style.display = index < visibleCount ? 'block' : 'none';
            });

            const allVisible = visibleCount >= announcements.length;
            showMoreButton.style.display = allVisible ? 'none' : 'inline-block';
            showAllButton.style.display = allVisible ? 'none' : 'inline-block';
        }

        if (showMoreButton) {
            showMoreButton.addEventListener('click', () => {
                visibleCount = Math.min(visibleCount + 4, announcements.length);
                updateVisibility();
            });
        }

        if (showAllButton) {
            showAllButton.addEventListener('click', () => {
                visibleCount = announcements.length;
                updateVisibility();
            });
        }

        updateVisibility();
    }

    // Sets up the mobile navigation menu toggle
    function setupNavbarToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    // Highlights the active navigation link based on the visible section
    function setupNavLinkHighlighting() {
        const sections = document.querySelectorAll('.main-content > div[id$="-placeholder"]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Adjust this to control when a section is considered active
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id.replace('-placeholder', '-heading');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active-nav-link');
                        } else {
                            link.classList.remove('active-nav-link');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Initial highlight on load
        const initialSection = document.querySelector('.main-content > div[id$="-placeholder"]:first-child');
        if (initialSection) {
            const initialSectionId = initialSection.id.replace('-placeholder', '-heading');
            const initialNavLink = document.querySelector(`.nav-link[href="#${initialSectionId}"]`);
            if (initialNavLink) {
                initialNavLink.classList.add('active-nav-link');
            }
        }
    }

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Show or hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Scroll to the top when the button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});