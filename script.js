// JavaScript for hiding/showing navbar on scroll
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const footer = document.querySelector('.fixed-footer');

// Handle scroll events
window.addEventListener('scroll', () => {
    handleFooterShutterEffect();
    handleNavbarScroll();
});

// Handle image animation on page load
window.addEventListener('load', () => {
    handleImageAnimation(); // Trigger image animation on page load
});

// Image slide-in animation
function handleImageAnimation() {
    const image = document.querySelector('.image-slide-in');
    if (image) {
        image.classList.add('image-visible');
    }
}

// Footer shutter effect
function handleFooterShutterEffect() {
    if (footer) {
        const scrollHeight = window.scrollY;
        const threshold = document.documentElement.scrollHeight - window.innerHeight - 100;

        if (scrollHeight > threshold) {
            footer.classList.add('footer-visible');
        } else {
            footer.classList.remove('footer-visible');
        }
    }
}

// Navbar hide/show on scroll
function handleNavbarScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
}

// Adding active class to navigation items
const navItems = document.querySelectorAll('nav ul li a');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Form submission handling
if (window.location.href == "http://localhost:5500/quote.html") {
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("FEGuN4wx3G3ZgxKa5");

    // Form submission handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Form validation
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const description = document.getElementById('description').value;
        const errorElement = document.getElementById('error');

        let error = '';

        if (!name || !phone || !email || !description) {
            error = 'All fields marked with an asterisk are required!';
            errorElement.textContent = error;
            return;
        }

        errorElement.textContent = '';

        // Use the form element as the third parameter
        emailjs.sendForm('service_rvchfrj', 'template_zhjrlub', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Form submitted successfully!');
            document.getElementById('contactForm').reset(); // Optionally reset the form
        }, function(error) {
            console.error('FAILED...', error);
            alert('An error occurred while submitting the form.');
        });
    });
});
} else {
    console.log("Not on quote page");
}
