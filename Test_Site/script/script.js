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

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// add class navbarDark on navbar scroll
const header = document.querySelector('.topnav');

window.onscroll = function() {
    var top = window.scrollY;

    if(top >= 10) {
        header.classList.add('navbarDark', 'navbarShrink');
    }
    else {
        header.classList.remove('navbarDark', 'navbarShrink');
    }
}