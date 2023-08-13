// add class navbarDark on navbar scroll
const header = document.querySelector('.navbar');
const collapsedNavbar = document.querySelector('.navbar-collapse');
const targetSection = document.querySelector('#home');

window.onscroll = function() {
    var top = window.scrollY;

    var targetSectionBottom = targetSection.offsetTop + targetSection.offsetHeight;

    if(top >= 100) {
        header.classList.add('navbarDark', 'navbarShrink');
    }
    else {
        header.classList.remove('navbarDark', 'navbarShrink');
    }
}

var navbar_btn = document.getElementById('navbar-toggler');

navbar_btn.addEventListener('click', function() {
    if(this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
    } else {
        this.classList.remove('not-active');
        this.classList.add('active');
    }
});

// Smooth scroll to target section
document.querySelectorAll('.btn-enter-portfolio').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSection = document.querySelector(button.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Calculate age based on birth date
function calculateAge(birth_date) {
    const today = new Date();
    const birthDate = new Date(birth_date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff == 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

window.onload = function() {
    const birth_date = new Date('2003-09-13');
    const age = calculateAge(birth_date);
    document.getElementById('ageValue').innerHTML = age;
};

// Progress bar
const skillCards = document.querySelectorAll('.skillsText');

    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');

        card.addEventListener('mouseenter', () => {
            const progress = parseInt(card.getAttribute('data-progress')) || 0;
            progressBar.style.width = `${progress}%`;
            progressBar.style.backgroundColor = getComputedStyle(card).getPropertyValue('--secondary');
        });

        card.addEventListener('mouseleave', () => {
            progressBar.style.width = '0';
        });
    });

const images = document.querySelectorAll('.carousel-item img');

function preloadImages() {
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
}
    
preloadImages();

/*
document.querySelectorAll('.portfolioContent').forEach((card, index) => {
    card.addEventListener('click', () => {
        const modal = document.querySelector(`#portfolioModal${index + 1}`);
        const overlay = document.querySelector('#overlay');

        if (modal && overlay) {
            modal.style.display = 'block';
            overlay.style.display = 'block';
        }
    });
});

// Open modal when close button is clicked
document.querySelectorAll('.modal-close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        const modal = closeButton.closest('.modal');
        const overlay = document.querySelector('#overlay');

        if (modal && overlay) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});

// Close modals and overlay when overlay is clicked
document.querySelector('#overlay').addEventListener('click', () => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });

    const overlay = document.querySelector('#overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
});
*/


// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    history.pushState('', document.title, window.location.pathname + window.location.search);
});

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const contactButton = document.getElementById("contact-button");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Simulate sending data to the server
        contactButton.disabled = true;
        contactButton.textContent = "Sending...";

        // Simulate server response delay
        setTimeout(function () {
            // Simulate successful response
            contactButton.textContent = "Sent!";
            contactForm.reset();

            // Return the button to its original state
            setTimeout(function () {
                contactButton.disabled = false;
                contactButton.textContent = "Contact Me";
            }, 2000); // Return to normal after 2 seconds
        }, 1500); // Simulate sending for 1.5 seconds
    });
});

// Add an event listener for scrolling
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navbarItems = document.querySelectorAll(".nav-scroll");
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;

    navbarItems.forEach((item) => {
        item.classList.remove("active-nav");
    });

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
            scrollPosition >= sectionTop - screenHeight * 0.5 && // Change color when section is 50% visible
            scrollPosition <= sectionTop + sectionHeight - screenHeight * 0.5
        ) {
            const activeNavItem = document.querySelector(`.nav-scroll a[href="#${section.id}"]`);
            activeNavItem.parentElement.classList.add("active-nav");
        }
    });
});