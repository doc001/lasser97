// Get the button and the menu elements
const menuToggle = document.getElementById('nav-hamburger');
const menuLinks = document.getElementById('menu-links');

// Add hamburger menu functionality if elements exist
if (menuToggle && menuLinks) {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Add an event listener for the 'click' event
    menuToggle.addEventListener('click', function() {
        // Toggle the 'open' class on the menu div to show/hide it
        menuLinks.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Optional: Toggle 'is-active' class on the button for icon animation
        menuToggle.classList.toggle('is-active');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        menuLinks.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuLinks.classList.contains('open')) {
            menuLinks.classList.remove('open');
            overlay.classList.remove('active');
            menuToggle.classList.remove('is-active');
        }
    });
}

// Search functionality for cheat sheets
const searchInput = document.getElementById('searchInput');
const sections = document.querySelectorAll('.section');

if (searchInput && sections.length > 0) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        let hasResults = false;

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query)) {
                section.classList.remove('hidden');
                hasResults = true;
            } else {
                section.classList.add('hidden');
            }
        });

        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        if (!hasResults && query !== '') {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No results found. Try searching for "form", "table", or "semantic"';
            document.getElementById('content').appendChild(noResults);
        }
    });
}

function toggleSection(header) {
    const section = header.parentElement;
    const content = section.querySelector('.section-content');

    section.classList.toggle('collapsed');

    if (section.classList.contains('collapsed')) {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

function copyCode(btn) {
    const codeBlock = btn.parentElement;
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#4CAF50';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#9F1010';
        }, 2000);
    });
}

// Tag item animations
const tagItems = document.querySelectorAll('.tag-item');
if (tagItems.length > 0) {
    tagItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 100);
        });
    });
}

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================

// Lightbox content data
const lightboxData = {
    1: {
        title: "Project 1",
        content: `
            <h2>Project 1: Web Application</h2>
            <p>This is a comprehensive web application built with modern technologies.</p>
            <h3>Features:</h3>
            <ul>
                <li>Responsive design</li>
                <li>User authentication</li>
                <li>Real-time updates</li>
                <li>Cloud integration</li>
            </ul>
            <p>Technologies used: HTML5, CSS3, JavaScript, React, Node.js</p>
        `
    },
    2: {
        title: "Project 2",
        content: `
            <h2>Project 2: E-Commerce Platform</h2>
            <p>A full-featured e-commerce solution with payment integration.</p>
            <h3>Key Components:</h3>
            <ul>
                <li>Shopping cart system</li>
                <li>Payment gateway integration</li>
                <li>Inventory management</li>
                <li>Order tracking</li>
            </ul>
            <p>Technologies used: Vue.js, Express, MongoDB, Stripe API</p>
        `
    },
    3: {
        title: "Project 3",
        content: `
            <h2>Project 3: Mobile App</h2>
            <p>Cross-platform mobile application for iOS and Android.</p>
            <h3>Highlights:</h3>
            <ul>
                <li>Native performance</li>
                <li>Offline functionality</li>
                <li>Push notifications</li>
                <li>Geolocation services</li>
            </ul>
            <p>Technologies used: React Native, Firebase, Redux</p>
        `
    }
};

function openLightbox(itemNumber) {
    const lightbox = document.getElementById('lightbox');
    const lightboxBody = document.getElementById('lightbox-body');
    
    if (lightbox && lightboxBody && lightboxData[itemNumber]) {
        lightboxBody.innerHTML = lightboxData[itemNumber].content;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close lightbox when clicking outside content
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Make functions available globally
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
