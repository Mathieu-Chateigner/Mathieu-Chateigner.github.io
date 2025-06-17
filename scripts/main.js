/**
 * Modern Dark Portfolio JavaScript
 * This file contains all the interactive functionality for the portfolio website
 */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar color change on scroll
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;

            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navbarToggler.getAttribute('aria-expanded') === 'true') {
                navbarToggler.click();
            }
        });
    });

    // Project filter functionality
    if (document.querySelector('.portfolio-filter')) {
        const filterBtns = document.querySelectorAll('.portfolio-filter button');
        const portfolioItems = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Animated background shapes
    animateBackgroundShapes();

    // Initialize skill bars animation
    initSkillBars();

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            // Here you would normally send the form data to a server
            // Simulating form submission success
            showAlert('Message sent successfully! I will get back to you soon.', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    // Project hover effects
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-links').style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-links').style.opacity = '0';
        });
    });

    // Initialize draggable carousel with navigation buttons
    initDraggableCarousel();
});

/**
 * Initialize looping draggable carousel functionality with navigation buttons
 */
function initDraggableCarousel() {
    const carousel = document.querySelector('#projectsRow');
    if (!carousel) return;

    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let itemWidth = 0;
    let originalItemsCount = 0;

    // Clone nodes for infinite loop effect
    setupInfiniteLoop();

    // Create navigation buttons
    createNavigationButtons();

    // Event listeners for touch and mouse events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);
    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag);

    // Prevent default behaviors that interfere with dragging
    carousel.addEventListener('dragstart', (e) => e.preventDefault());
    carousel.addEventListener('selectstart', (e) => e.preventDefault());
    document.addEventListener('selectstart', preventSelection);

    // Prevent context menu on right click during drag
    carousel.addEventListener('contextmenu', e => {
        if (isDragging) e.preventDefault();
    });

    /**
     * Create navigation buttons using existing CSS styles
     */
    function createNavigationButtons() {
        const container = carousel.closest('.projects-container');

        // Create left button using existing carousel control styles
        const leftButton = document.createElement('button');
        leftButton.className = 'carousel-control-prev';
        leftButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
        leftButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateCarousel(-1);
        });

        // Prevent drag events on buttons
        leftButton.addEventListener('mousedown', (e) => e.stopPropagation());
        leftButton.addEventListener('touchstart', (e) => e.stopPropagation());

        // Create right button using existing carousel control styles
        const rightButton = document.createElement('button');
        rightButton.className = 'carousel-control-next';
        rightButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
        rightButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateCarousel(1);
        });

        // Prevent drag events on buttons
        rightButton.addEventListener('mousedown', (e) => e.stopPropagation());
        rightButton.addEventListener('touchstart', (e) => e.stopPropagation());

        container.appendChild(leftButton);
        container.appendChild(rightButton);
    }

    /**
     * Navigate carousel programmatically
     */
    function navigateCarousel(direction) {
        if (isDragging) return;

        const moveDistance = itemWidth * direction;
        const newTranslate = currentTranslate - moveDistance;

        // Apply with animation
        carousel.style.transition = 'transform 0.3s ease';
        carousel.style.transform = `translateX(${newTranslate}px)`;
        currentTranslate = newTranslate;

        // Handle infinite loop logic after animation
        setTimeout(() => {
            handleInfiniteLoop();
        }, 300);
    }

    /**
     * Setup infinite loop by cloning items
     */
    function setupInfiniteLoop() {
        // Get all project items
        const items = carousel.querySelectorAll('.project-item');
        originalItemsCount = items.length;
        itemWidth = items[0].offsetWidth;

        // Clone nodes and append to the end
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            carousel.appendChild(clone);
        });

        // Clone nodes and prepend to the beginning (in reverse order)
        Array.from(items)
            .reverse()
            .forEach(item => {
                const clone = item.cloneNode(true);
                clone.classList.add('clone');
                carousel.prepend(clone);
            });

        // Calculate initial position (move to the original first item)
        const initialOffset = -1 * originalItemsCount * itemWidth;
        carousel.style.transform = `translateX(${initialOffset}px)`;
        prevTranslate = initialOffset;
        currentTranslate = initialOffset;
    }

    /**
     * Handle infinite loop repositioning
     */
    function handleInfiniteLoop() {
        // Remove transition for instant repositioning
        carousel.style.transition = 'none';

        // If we've scrolled too far right (into the right clones)
        if (currentTranslate > -originalItemsCount * itemWidth + itemWidth) {
            // Jump to the corresponding position in the original items
            const newPosition = currentTranslate - originalItemsCount * itemWidth;
            carousel.style.transform = `translateX(${newPosition}px)`;
            currentTranslate = newPosition;
            prevTranslate = newPosition;
        }
        // If we've scrolled too far left (into the left clones)
        else if (currentTranslate < -2 * originalItemsCount * itemWidth + itemWidth) {
            // Jump to the corresponding position in the original items
            const newPosition = currentTranslate + originalItemsCount * itemWidth;
            carousel.style.transform = `translateX(${newPosition}px)`;
            currentTranslate = newPosition;
            prevTranslate = newPosition;
        }
        else {
            // Update the current positions
            prevTranslate = currentTranslate;
        }
    }

    function dragStart(event) {
        // Prevent default actions
        event.preventDefault();

        isDragging = true;
        startPosition = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        carousel.classList.add('grabbing');

        // Add additional event listeners during drag
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    function preventSelection(e) {
        if (isDragging) {
            e.preventDefault();
            return false;
        }
    }

    function drag(event) {
        if (isDragging) {
            // Prevent default to avoid text selection
            event.preventDefault();

            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPosition;
        }
    }

    function dragEnd(event) {
        isDragging = false;
        cancelAnimationFrame(animationID);

        // Remove document-level event listeners
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);

        // Snap to nearest item
        const snapPosition = Math.round(currentTranslate / itemWidth) * itemWidth;

        // Apply with animation
        carousel.style.transition = 'transform 0.3s ease';
        carousel.style.transform = `translateX(${snapPosition}px)`;
        currentTranslate = snapPosition;

        // Handle infinite loop logic
        setTimeout(() => {
            handleInfiniteLoop();
        }, 300);

        carousel.classList.remove('grabbing');
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // Handle resize event to reset position if needed
    window.addEventListener('resize', () => {
        // Recalculate item width
        const items = carousel.querySelectorAll('.project-item:not(.clone)');
        itemWidth = items[0].offsetWidth;

        // Reset to original items position
        const newPosition = -1 * originalItemsCount * itemWidth;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${newPosition}px)`;
        currentTranslate = newPosition;
        prevTranslate = newPosition;
    });

    // Clean up event listeners when needed
    return function cleanup() {
        document.removeEventListener('selectstart', preventSelection);
    };
}

/**
 * Animate the background shapes
 */
function animateBackgroundShapes() {
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach(shape => {
        const randomDelay = Math.random() * 5;
        shape.style.animationDelay = `${randomDelay}s`;
    });
}

/**
 * Initialize skill bars animation
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');

    if (skillBars.length > 0) {
        // Create an intersection observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percentage = entry.target.getAttribute('data-percentage');
                    entry.target.style.width = `${percentage}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Observe each skill bar
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

/**
 * Show alert message
 * @param {string} message - Alert message to display
 * @param {string} type - Alert type (success or error)
 */
function showAlert(message, type) {
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alertElement.setAttribute('role', 'alert');
    alertElement.style.position = 'fixed';
    alertElement.style.top = '20px';
    alertElement.style.right = '20px';
    alertElement.style.zIndex = '9999';

    // Add message and close button
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to body
    document.body.appendChild(alertElement);

    // Remove after 5 seconds
    setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => {
            alertElement.remove();
        }, 300);
    }, 5000);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @return {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}