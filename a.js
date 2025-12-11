/* a.js — Final JS (replace existing a.js) */
document.addEventListener('DOMContentLoaded', function () {

  /* NAV TOGGLE (exposed for inline onclick) */
  function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");
    if(!menuBtn) return;
    menuBtn.classList.toggle("responsive");
  }
  window.myMenuFunction = myMenuFunction;

  /* CLOSE MOBILE MENU WHEN A LINK IS CLICKED */
  (function closeOnLinkClick(){
    var navLinks = document.querySelectorAll('.nav-menu a');
    var menu = document.getElementById('myNavMenu');
    if(!navLinks || !menu) return;
    navLinks.forEach(function(link){
      link.addEventListener('click', function(){
        menu.classList.remove('responsive');
      });
    });
  })();

  /* ADJUST WRAPPER PADDING TO AVOID HEADER OVERLAP */
  function adjustWrapperPadding(){
    var header = document.getElementById('header');
    var wrapper = document.querySelector('.wrapper');
    if(!header || !wrapper) return;
    var pad = header.offsetHeight + 20; // header height + small gap
    wrapper.style.paddingTop = pad + 'px';
    var navMenu = document.getElementById('myNavMenu');
    if(navMenu){
      navMenu.style.top = header.offsetHeight + 'px';
      navMenu.style.minHeight = 'calc(100vh - ' + header.offsetHeight + 'px)';
    }
  }

  /* HEADER SHADOW & HEIGHT TOGGLE */
  var navHeader = document.getElementById("header");
  function headerShadow() {
    if(!navHeader) return;
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
    } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
    }
    adjustWrapperPadding();
  }

  /* INITIAL RUN & EVENT LISTENERS */
  adjustWrapperPadding();
  headerShadow();
  window.addEventListener('scroll', headerShadow, { passive: true });
  window.addEventListener('resize', adjustWrapperPadding);

  /* TYPED.JS (guarded) */
  if (typeof Typed !== 'undefined') {
    try {
      new Typed(".typedText", {
        strings: ["Full Stack Developer", "React Developer", "Frontend Developer"],
        loop: true,
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1600
      });
    } catch (e) {
      console.warn('Typed.js init failed:', e);
    }
  } else {
    var el = document.querySelector('.typedText');
    if(el) el.textContent = "Full Stack Developer";
  }

  /* SCROLLREVEAL (guarded) */
  if (typeof ScrollReveal !== 'undefined') {
    try {
      const sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, reset: true });
      sr.reveal('.featured-text-card', {});
      sr.reveal('.featured-name', { delay: 100 });
      sr.reveal('.featured-text-info', { delay: 200 });
      sr.reveal('.featured-text-btn', { delay: 200 });
      sr.reveal('.social_icons', { delay: 200 });
      sr.reveal('.featured-image', { delay: 300 });
      sr.reveal('.project-box', { interval: 200 });
      sr.reveal('.top-header', {});
      const srLeft = ScrollReveal({ origin: 'left', distance: '80px', duration: 2000, reset: true });
      srLeft.reveal('.about-info', { delay: 100 });
      srLeft.reveal('.contact-info', { delay: 100 });
      const srRight = ScrollReveal({ origin: 'right', distance: '80px', duration: 2000, reset: true });
      srRight.reveal('.skills-box', { delay: 100 });
      srRight.reveal('.form-control', { delay: 100 });
    } catch (e) {
      console.warn('ScrollReveal error:', e);
    }
  }

  /* ACTIVE NAV LINK ON SCROLL */
  const sections = document.querySelectorAll('section[id]');
  function scrollActive() {
    const scrollY = window.scrollY;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 60;
      const sectionId = current.getAttribute('id');
      var selector = '.nav-menu a[href*=' + sectionId + ']';
      const navLink = document.querySelector(selector);
      if(!navLink) return;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active-link');
      } else {
        navLink.classList.remove('active-link');
      }
    });
  }
  window.addEventListener('scroll', scrollActive, { passive: true });
  scrollActive();

  /* CONTACT FORM -> MAILTO (no backend) */
  (function(){
    var sendBtn = document.getElementById('contact-send');
    if(!sendBtn) return;
    sendBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var name = document.getElementById('contact-name').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var message = document.getElementById('contact-message').value.trim();

      if(!name && !email && !message){
        alert('Please enter your name, email and message.');
        return;
      }

      var to = 'goldensharma991@gmail.com';
      var subject = encodeURIComponent('Portfolio contact from ' + (name || email || 'a visitor'));
      var body = 'Name: ' + (name || 'N/A') + '\n';
      body += 'Email: ' + (email || 'N/A') + '\n\n';
      body += (message || '(no message)');

      var mailto = 'mailto:' + to + '?subject=' + subject + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  })();

});


// create subtle particles (append in a.js)
(function createParticles(){
  var container = document.createElement('div');
  container.className = 'particles';
  document.body.appendChild(container);
  var w = window.innerWidth, h = window.innerHeight;
  for(var i=0;i<30;i++){
    var p = document.createElement('div');
    p.className = 'particle';
    var left = Math.random() * w;
    var top = Math.random() * h;
    p.style.left = left + 'px';
    p.style.top = top + 'px';
    var dur = 6 + Math.random()*10;
    p.style.animationDuration = dur + 's';
    p.style.opacity = (0.05 + Math.random()*0.2);
    container.appendChild(p);
  }
})();
