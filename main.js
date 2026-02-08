// Cursor Effects
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
  
  cursorOutline.style.left = `${e.clientX}px`;
  cursorOutline.style.top = `${e.clientY}px`;
});

// Interactive elements cursor effect
const interactiveElements = document.querySelectorAll(
  'a, button, .nav-link, .btn, .tech-icon, .project-link, .social-link'
);

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursorOutline.style.width = '60px';
    cursorOutline.style.height = '60px';
    cursorOutline.style.opacity = '0.8';
  });
  
  element.addEventListener('mouseleave', () => {
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
    cursorOutline.style.opacity = '0.5';
  });
});

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
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .feature-card, .skill-category').forEach(el => {
  observer.observe(el);
});

// Counter Animation
const counters = document.querySelectorAll('.stat-value');

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

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      alert('Message sent successfully! I\'ll get back to you soon.');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
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
    const centerY = rect.height / 2;
    
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

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
  
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

// Menu Toggle for Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    menuToggle.classList.toggle('active');
  });
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

// Add audio feedback for interactions
document.addEventListener('click', (e) => {
  if (e.target.closest('button, a')) {
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
    audio.volume = 0.1;
    audio.play().catch(() => {});
  }
});

// Dynamic Background Colors
const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
let currentColorIndex = 0;

function changeBackgroundColor() {
  const root = document.documentElement;
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  
  root.style.setProperty('--primary', colors[currentColorIndex]);
  root.style.setProperty('--secondary', colors[(currentColorIndex + 1) % colors.length]);
  
  setTimeout(changeBackgroundColor, 10000);
}

// Uncomment to enable automatic color changing
// setTimeout(changeBackgroundColor, 10000);

// Particle Effect
function createParticles() {
  const particlesContainer = document.querySelector('.floating-shapes');
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = `${Math.random() * 10 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.background = `linear-gradient(45deg, ${colors[currentColorIndex]}, ${colors[(currentColorIndex + 1) % colors.length]})`;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Uncomment to enable particles
// createParticles();