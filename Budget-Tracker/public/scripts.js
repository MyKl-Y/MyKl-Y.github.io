// Navbar
document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.getElementById('sidenav');
    const openSidenavButton = document.querySelector('.logo'); // Replace with your logo/hamburger button
    const closeSidenavButton = document.querySelector('.closebtn'); // Close button inside the sidenav

    // Toggle sidenav on logo/hamburger button click
    openSidenavButton.addEventListener('click', () => {
        sidenav.classList.add('active');
    });

    // Close sidenav on close button click
    closeSidenavButton.addEventListener('click', () => {
        sidenav.classList.remove('active');
    });
});

// Get the toggle switch element
const themeToggle = document.getElementById("theme-toggle");

// Function to set the theme based on user preference
function setTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

// Function to toggle the theme
function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
}

// Add event listener to the toggle switch
themeToggle.addEventListener("change", toggleTheme);

// Apply the user's theme preference on page load
document.addEventListener("DOMContentLoaded", () => {
    const userTheme = localStorage.getItem("theme") || "light";
    setTheme(userTheme);
});

// Confirm Password
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordMismatchMessage = document.getElementById('passwordMismatch');

    signupForm.addEventListener('submit', (event) => {
        const passwordInput = signupForm.querySelector('input[type="password"]');
        if (passwordInput.value !== confirmPasswordInput.value) {
            event.preventDefault(); // Prevent form submission
            passwordMismatchMessage.style.display = 'block';
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        passwordMismatchMessage.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.getElementById('sidenav');
    
    // Function to check and set the active class based on screen width
    function checkScreenWidth() {
        if (window.innerWidth > 1024) {
            sidenav.classList.add('active');
            sidenav.classList.remove('inactive');
        } else {
            sidenav.classList.remove('active');
            sidenav.classList.add('inactive');
        }
    }

    // Initial check when the page loads
    checkScreenWidth();

    // Check and update on window resize
    window.addEventListener('resize', checkScreenWidth);
});

// Splash Screen
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const header = document.getElementById('header');
    const splashScreenTitle1 = document.getElementById('splashScreenTitle1');
    const splashScreenTitle2 = document.getElementById('splashScreenTitle2');
    const splashScreenText = document.getElementById('splashScreenText');

    header.style.transform = 'translateY(-100%)'; // Hide the header

    // Wait for a brief moment before animating
    setTimeout(() => {
        splashScreen.style.transform = 'translateY(-100%)';
        splashScreenTitle1.style.transform = 'translateX(-100%)';
        splashScreenTitle2.style.transform = 'translateX(100%)';
        splashScreenText.style.display = 'none';
        // After animation, show the header
        setTimeout(() => {
            splashScreen.style.display = 'none';
            header.style.transform = 'translateY(0)'; // Show the header
        }, 1000); // Adjust the timing as needed
    }, 3000); // Adjust the timing as needed
});
