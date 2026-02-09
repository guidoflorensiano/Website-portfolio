// Enhanced Cursor Effects with Trail
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Create trail effect
  createCursorTrail(e.clientX, e.clientY);
});

// Smooth cursor animation
function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  cursorX += dx * 0.1;
  cursorY += dy * 0.1;
  
  cursorDot.style.left = `${cursorX}px`;
  cursorDot.style.top = `${cursorY}px`;
  cursorOutline.style.left = `${cursorX}px`;
  cursorOutline.style.top = `${cursorY}px`;
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Create cursor trail
function createCursorTrail(x, y) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  document.body.appendChild(trail);
  
  setTimeout(() => {
    trail.remove();
  }, 1000);
}

// Interactive elements cursor effect
const interactiveElements = document.querySelectorAll(
  'a, button, .nav-link, .btn, .tech-icon, .project-link, .social-link'
);

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursorOutline.style.width = '70px';
    cursorOutline.style.height = '70px';
    cursorOutline.style.opacity = '0.8';
    cursorOutline.style.borderColor = 'var(--secondary)';
  });
  
  element.addEventListener('mouseleave', () => {
    cursorOutline.style.width = '50px';
    cursorOutline.style.height = '50px';
    cursorOutline.style.opacity = '0.6';
    cursorOutline.style.borderColor = 'var(--primary)';
  });
});

// Enhanced Particle System
function createEnhancedParticles() {
  const particlesContainer = document.querySelector('.floating-shapes');
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#fa709a', '#fee140'];
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 15 + 5;
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.filter = 'blur(1px)';
    particle.style.animation = `float ${Math.random() * 15 + 10}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Create floating orbs
function createFloatingOrbs() {
  const container = document.querySelector('.floating-shapes');
  
  for (let i = 0; i < 5; i++) {
    const orb = document.createElement('div');
    orb.className = 'floating-orb';
    
    orb.style.width = `${Math.random() * 200 + 100}px`;
    orb.style.height = orb.style.width;
    orb.style.background = `radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent)`;
    orb.style.borderRadius = '50%';
    orb.style.position = 'absolute';
    orb.style.left = `${Math.random() * 100}vw`;
    orb.style.top = `${Math.random() * 100}vh`;
    orb.style.filter = 'blur(40px)';
    orb.style.animation = `float ${Math.random() * 20 + 15}s ease-in-out infinite`;
    orb.style.animationDelay = `${Math.random() * 10}s`;
    
    container.appendChild(orb);
  }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Scroll Animations
const scrollObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, scrollObserverOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .feature-card, .skill-category').forEach(el => {
  scrollObserver.observe(el);
});

// Counter Animation
const statCounters = document.querySelectorAll('.stat-value');

const startCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-count'));
  const duration = 2000;
  const step = Math.floor(target / (duration / 16));
  let current = 0;
  
  const updateCounter = () => {
    current += step;
    if (current < target) {
      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target + '+';
    }
  };
  
  updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statCounters.forEach(counter => {
  counterObserver.observe(counter);
});

// Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Portfolio Contact';
    const message = formData.get('message');
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // Send email using EmailJS
      const response = await emailjs.send('service_portfolio', 'template_contact', {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'erasmus035@gmail.com'
      });
      
      // Show success message
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Fallback to mailto if EmailJS fails
      const encodedSubject = encodeURIComponent(`${subject} from ${name}`);
      const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:erasmus035@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
      
      showNotification('Opening your email client as backup...', 'info');
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1000);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Typing Effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing when hero section is in view
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(typeWriter, 1000);
      heroObserver.unobserve(entries[0].target);
    }
  }, { threshold: 0.5 });
  
  heroObserver.observe(document.querySelector('#hero'));
}

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.magnetic-button');

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = button.offsetHeight / 2;
    
    const deltaX = (x - centerX) / centerX * 10;
    const deltaY = (y - centerY) / centerY * 10;
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  document.querySelectorAll('.bg-blur-1, .bg-blur-2, .bg-blur-3').forEach((blur, index) => {
    blur.style.transform = `translateY(${rate * (index + 1) * 0.3}px)`;
  });
});

// Menu Toggle for Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  const navItems = navLinks.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
  
  // Prevent body scroll when menu is open
  const updateBodyScroll = () => {
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  const menuObserver = new MutationObserver(updateBodyScroll);
  menuObserver.observe(navLinks, { attributes: true, attributeFilter: ['class'] });
}

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBar = entry.target;
      const width = skillBar.style.width;
      skillBar.style.width = '0';
      
      setTimeout(() => {
        skillBar.style.width = width;
      }, 300);
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
  threshold: 0.5
});

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Enhanced animations on load
document.addEventListener('DOMContentLoaded', () => {
  createEnhancedParticles();
  createFloatingOrbs();
  createMagicalElements();
  
  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.8s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 200);
  
  // Add parallax mouse effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    document.querySelectorAll('.shape').forEach((shape, index) => {
      const speed = (index + 1) * 20;
      const x = mouseX * speed;
      const y = mouseY * speed;
      
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  // Initialize tooltips
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = el.getAttribute('data-tooltip');
      document.body.appendChild(tooltip);
      
      const rect = el.getBoundingClientRect();
      tooltip.style.position = 'fixed';
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 10}px`;
      tooltip.style.transform = 'translate(-50%, -100%)';
      tooltip.style.padding = '0.5rem 0.75rem';
      tooltip.style.background = 'var(--text-primary)';
      tooltip.style.color = 'white';
      tooltip.style.borderRadius = 'var(--radius-sm)';
      tooltip.style.fontSize = '0.75rem';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.zIndex = '10000';
      
      el._tooltip = tooltip;
    });
    
    el.addEventListener('mouseleave', () => {
      if (el._tooltip) {
        el._tooltip.remove();
        delete el._tooltip;
      }
    });
  });
});

// Create Magical Elements
function createMagicalElements() {
  const magicalContainer = document.createElement('div');
  magicalContainer.className = 'magical-sparkles';
  document.body.appendChild(magicalContainer);
  
  // Create sparkles
  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 3}s`;
    sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;
    magicalContainer.appendChild(sparkle);
  }
  
  // Create stars
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    magicalContainer.appendChild(star);
  }
  
  // Add floating magical orbs
  for (let i = 0; i < 8; i++) {
    const orb = document.createElement('div');
    orb.className = 'magical-orb';
    orb.style.width = `${Math.random() * 100 + 50}px`;
    orb.style.height = orb.style.width;
    orb.style.left = `${Math.random() * 100}%`;
    orb.style.top = `${Math.random() * 100}%`;
    orb.style.background = `radial-gradient(circle, 
      rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1), 
      transparent)`;
    orb.style.borderRadius = '50%';
    orb.style.filter = 'blur(30px)';
    orb.style.animation = `float ${Math.random() * 15 + 10}s ease-in-out infinite`;
    orb.style.animationDelay = `${Math.random() * 10}s`;
    magicalContainer.appendChild(orb);
  }
}

// Add audio feedback for interactions
document.addEventListener('click', (e) => {
  if (e.target.closest('button, a')) {
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
    audio.volume = 0.1;
    audio.play().catch(() => {});
  }

  // Footer Stats Animation
const footerStats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stat = entry.target;
      const target = parseInt(stat.getAttribute('data-count'));
      let current = 0;
      const increment = target / 50;
      
      const updateStat = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.floor(current);
          setTimeout(updateStat, 30);
        } else {
          stat.textContent = target;
        }
      };
      
      updateStat();
      statsObserver.unobserve(stat);
    }
  });
}, { threshold: 0.5 });

footerStats.forEach(stat => {
  statsObserver.observe(stat);
});

// Theme Toggle Function
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.querySelector('.btn-theme-toggle i');
  
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeBtn.classList.remove('fa-moon');
    themeBtn.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeBtn.classList.remove('fa-sun');
    themeBtn.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
}

// Scroll to Top Function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeBtn = document.querySelector('.btn-theme-toggle i');
  
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    if (themeBtn) {
      themeBtn.classList.remove('fa-moon');
      themeBtn.classList.add('fa-sun');
    }
  }
});
document.addEventListener('DOMContentLoaded', function() {
  
  // Section entry animations
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  // Enhanced cursor
  const cursor = document.querySelector('.cursor-dot');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Interactive elements highlight
  const interactiveElements = document.querySelectorAll('a, button, .nav-link, .project-card, .feature-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
  
  // Parallax effect
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelectorAll('.shape').forEach((shape, index) => {
      shape.style.transform = `translateY(${rate * (index + 1) * 0.1}px)`;
    });
  });
  
  // Loading screen
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-overlay';
  loadingScreen.innerHTML = `
    <div class="loading-spinner"></div>
  `;
  document.body.appendChild(loadingScreen);
  
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 1500);
  
  // Skill bars animation on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
          bar.style.width = width;
          bar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 300);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
  
  // Counter animation for stats
  const statCounters = document.querySelectorAll('.stat-value');
  statCounters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current) + '+';
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    const counterObserver = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        updateCounter();
        counterObserver.unobserve(entry[0].target);
      }
    });
    
    counterObserver.observe(counter);
  });
});
});
