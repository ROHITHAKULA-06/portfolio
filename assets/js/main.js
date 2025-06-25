/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== THEME TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference in localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggle.querySelector('i').classList.replace('bx-sun', 'bx-moon');
    }
} else {
    // Default to dark theme
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
}

// Add event listener for theme toggle
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeToggle.querySelector('i').classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    }
});

/*===== CONTACT FORM SUBMISSION =====*/
(function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key

    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('input[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Basic email validation
        const emailInput = form.querySelector('input[name="email"]');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.value = 'Sending...';

        // Send form data via EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                alert('Message sent successfully!');
                form.reset(); // Clear form
                submitButton.disabled = false;
                submitButton.value = 'Send';
            }, (error) => {
                alert('Failed to send message: ' + JSON.stringify(error));
                submitButton.disabled = false;
                submitButton.value = 'Send';
            });
    });
})();