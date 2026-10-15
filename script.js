/* ============================================================
   PORTFOLIO JAVASCRIPT
   Features:
   - Typed text animation (home section)
   - Sticky navbar with scroll effect
   - Mobile hamburger menu
   - Active nav link on scroll
   - Scroll reveal animations
   - Skill bar fill animation
   - Certificate modal open/close
   - Contact form handler
   - Back-to-top button
   - QR Code generation
   ============================================================ */

/* ---- Wait for DOM to be ready ---- */
document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     1. TYPED TEXT ANIMATION
     Edit the "phrases" array to change the rotating titles.
  ========================================================== */
  const phrases = [
    'Computer Science Student',
    'Java Developer',
    'Web Developer',
    'Problem Solver',
    'Open Source Enthusiast'
  ];
  const typedEl = document.getElementById('typed');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 110;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 60;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === current.length) {
      // Pause at end of word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();


  /* ==========================================================
     2. NAVBAR — scroll effect, hamburger, active link
  ========================================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll: add 'scrolled' class and update active link
  window.addEventListener('scroll', function () {
    // Navbar shadow on scroll
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link highlighting
    updateActiveLink();
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Hamburger toggle (mobile)
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });


  /* ==========================================================
     3. SCROLL REVEAL ANIMATION
     Elements with class "reveal" fade in when scrolled into view.
  ========================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(function (el, index) {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 80) {
        // Staggered delay for sibling elements
        const delay = (index % 4) * 100;
        setTimeout(function () {
          el.classList.add('visible');
        }, delay);
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Run once on load for elements already in view


  /* ==========================================================
     4. SKILL BAR FILL ANIMATION
     Fills skill progress bars when they scroll into view.
  ========================================================== */
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      skillsAnimated = true;
      skillFills.forEach(function (fill) {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      });
    }
  }

  window.addEventListener('scroll', animateSkills);
  animateSkills();


  /* ==========================================================
     5. CERTIFICATE MODAL
     openCertModal / closeCertModal are called from HTML onclick.
  ========================================================== */
  window.openCertModal = function (imgSrc, title) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalTitle = document.getElementById('certModalTitle');

    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  window.closeCertModal = function () {
    const modal = document.getElementById('certModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeCertModal();
    }
  });


  /* ==========================================================
     6. CONTACT FORM HANDLER
     Shows a success message when form is submitted.
     To connect to a real email service (e.g., Formspree):
     Set the form's action attribute to your Formspree URL.
  ========================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = '⚠️ Please fill in all fields.';
        formStatus.style.color = '#f87171';
        return;
      }

      const recipient = 'vasanthb2006ai@gmail.com';
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

      formStatus.textContent = '✅ Your email app is opening with the message ready to send.';
      formStatus.style.color = '#4ade80';
      contactForm.reset();

      setTimeout(function () {
        formStatus.textContent = '';
      }, 5000);
    });
  }


  /* ==========================================================
     7. BACK TO TOP BUTTON
  ========================================================== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ==========================================================
     8. QR CODE GENERATION
     Generates a QR code using the current page URL.
     The QR code points to your portfolio website URL.
     IMPORTANT: The QR code will NOT change as long as your URL
     stays the same — only the content updates when you edit HTML.

     HOW TO USE:
     - When hosted online, the QR code will auto-use your live URL.
     - For testing locally, it will show localhost URL.
     - To set a fixed URL, change window.location.href below to
       your actual website URL (e.g., "https://yourusername.github.io")
  ========================================================== */
  const qrContainer = document.getElementById('qrcode');
  const qrUrlText = document.getElementById('qr-url-text');

  if (qrContainer && typeof QRCode !== 'undefined') {
    // Change this to your actual portfolio URL once deployed
    // Example: const portfolioURL = "https://yourusername.github.io";
    const portfolioURL = window.location.href.split('#')[0]; // Current URL without hash

    new QRCode(qrContainer, {
      text: portfolioURL,
      width: 140,
      height: 140,
      colorDark: '#0f172a',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });

    if (qrUrlText) {
      qrUrlText.textContent = portfolioURL;
    }
  }


  /* ==========================================================
     9. SMOOTH SCROLL (backup for older browsers)
  ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPos = target.offsetTop - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });


  /* ==========================================================
     10. SECTION DIVIDER LINE ANIMATION (decorative)
         Adds subtle animation to section title underlines.
  ========================================================== */
  const sectionTitles = document.querySelectorAll('.section-title');
  const titleObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sectionTitles.forEach(function (title) {
    titleObserver.observe(title);
  });

}); // End DOMContentLoaded
