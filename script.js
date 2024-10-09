document.addEventListener('DOMContentLoaded', function() {
    // Function to load the header
    function loadHeader() {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('afterbegin', data);
                initializeNavigation();
            })
            .catch(error => console.error('Error loading header:', error));
    }

    // Function to load the footer
    function loadFooter() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Function to initialize navigation after header is loaded
    function initializeNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navbar = document.querySelector('.navbar');
        const container = navbar.querySelector('.container');
        const logo = navbar.querySelector('.logo');

        function checkNavFit() {
            const containerWidth = container.offsetWidth;
            const logoWidth = logo.offsetWidth;
            const toggleWidth = navToggle.offsetWidth;
            const linksWidth = Array.from(navLinks.children).reduce((total, link) => total + link.offsetWidth, 0);
            
            if (logoWidth + linksWidth + toggleWidth > containerWidth) {
                navbar.classList.add('mobile-nav');
            } else {
                navbar.classList.remove('mobile-nav');
            }
        }

        window.addEventListener('resize', checkNavFit);
        checkNavFit(); // Initial check

        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Call functions to load header and footer
    loadHeader();
    loadFooter();

    // Smooth page transitions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location = this.href;
                }, 300);
            }
        });
    });

    // Fade in the page on load
    window.addEventListener('pageshow', function() {
        document.body.style.opacity = 1;
    });

    // Add event listener for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            const targetUrl = this.getAttribute('href');

            // Fade out current content
            document.querySelector('main').classList.add('fade-out');

            // After fade out, navigate to new page
            setTimeout(() => {
                window.location = targetUrl;
            }, 300); // Changed from 500 to 300 to match the new CSS transition time
        });
    });

    // On page load, fade in the content
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was loaded from cache (user clicked back)
            document.querySelector('main').classList.remove('fade-out');
        } else {
            // New page load
            setTimeout(() => {
                document.querySelector('main').classList.remove('fade-out');
            }, 0);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.photo-gallery');
    const images = gallery.querySelectorAll('img');

    images.forEach(img => {
        img.onload = () => {
            const rowSpan = Math.ceil((img.naturalHeight / img.naturalWidth) * 10);
            img.style.gridRowEnd = `span ${rowSpan}`;
        };
    });

    // Use imagesLoaded to ensure all images are loaded
    imagesLoaded(gallery, function() {
        // Recalculate layout after images are fully loaded
        images.forEach(img => {
            const rowSpan = Math.ceil((img.naturalHeight / img.naturalWidth) * 10);
            img.style.gridRowEnd = `span ${rowSpan}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.photo-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const images = Array.from(gallery.querySelectorAll('img'));
    let currentIndex = 0;

    function showImage(index) {
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = images[index].src;
            currentIndex = index;
            lightboxImg.style.opacity = 1;
        }, 200);
    }

    gallery.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            const index = images.indexOf(e.target);
            showImage(index);
            lightbox.style.display = 'flex';
            lightbox.classList.add('show');
        }
    });

    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('show');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }
    });

    prevBtn.addEventListener('click', function() {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(newIndex);
    });

    nextBtn.addEventListener('click', function() {
        const newIndex = (currentIndex + 1) % images.length;
        showImage(newIndex);
    });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value;
    const disposableDomains = [
        'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'temp-mail.org', 'yopmail.com'
        // Add more known disposable email domains here
    ];

    const emailDomain = emailValue.split('@')[1];
    if (disposableDomains.includes(emailDomain)) {
        alert('Please use a non-temporary email address.');
        event.preventDefault(); // Prevent form submission
    }
});