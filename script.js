/**
 * Enhanced Cyberpunk JavaScript Effects
 * Matching with Ultra-Modern Cyberpunk-Inspired CSS
 */

// Mobile Navigation Toggle
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav sot-header") {
    x.className += " responsive";
    document.body.style.overflow = "hidden";
    
    // Add animation to menu items
    const navItems = x.querySelectorAll('a:not(.icon)');
    navItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  } else {
    x.className = "topnav sot-header";
    document.body.style.overflow = "auto";
  }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  var nav = document.getElementById('myTopnav');
  if (nav && !nav.contains(event.target)) {
    nav.className = "topnav sot-header";
    document.body.style.overflow = "auto";
  }
});

// Holographic Hover Effect with advanced lighting
document.querySelectorAll('.sot-section').forEach(section => {
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((y / rect.height) * 100);
    
    section.style.setProperty('--x', `${xPercent}%`);
    section.style.setProperty('--y', `${yPercent}%`);
    
    // Enhanced dynamic shadow effect
    section.style.boxShadow = `
      0 0 40px var(--hologram-blue),
      ${(x - rect.width/2) / 10}px ${(y - rect.height/2) / 10}px 80px var(--neon-primary),
      ${(x - rect.width/2) / -20}px ${(y - rect.height/2) / -20}px 40px var(--neon-secondary)
    `;
    
    // Dynamic rotation for 3D effect
    const rotateX = (y - rect.height/2) / rect.height * -4;
    const rotateY = (x - rect.width/2) / rect.width * 4;
    section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  
  // Reset when mouse leaves
  section.addEventListener('mouseleave', () => {
    section.style.boxShadow = `0 0 40px var(--hologram-blue), 0 0 20px var(--neon-primary)`;
    section.style.transform = `perspective(1000px) rotateX(1deg) translateY(0) scale(1)`;
  });
});

// Cyberpunk Advanced Cursor
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.classList.add('cyber-cursor');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid ${getComputedStyle(document.documentElement).getPropertyValue('--neon-primary')};
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, border-color 0.2s;
    z-index: 9999;
  `;
  
  const cursorDot = document.createElement('div');
  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background-color: ${getComputedStyle(document.documentElement).getPropertyValue('--neon-secondary')};
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    z-index: 10000;
    box-shadow: 0 0 10px ${getComputedStyle(document.documentElement).getPropertyValue('--neon-secondary')};
  `;
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let cursorDotX = 0;
  let cursorDotY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Check for interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('sot-btn')) {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-secondary');
    } else {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-primary');
    }
  });
  
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursor.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--cyber-highlight');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--neon-primary');
  });
  
  // Smooth cursor animation
  const cursorAnimation = () => {
    const smoothingFactor = 0.15;
    
    cursorX += (mouseX - cursorX) * smoothingFactor;
    cursorY += (mouseY - cursorY) * smoothingFactor;
    
    cursorDotX += (mouseX - cursorDotX) * 0.35;
    cursorDotY += (mouseY - cursorDotY) * 0.35;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    cursorDot.style.left = `${cursorDotX}px`;
    cursorDot.style.top = `${cursorDotY}px`;
    
    requestAnimationFrame(cursorAnimation);
  };
  
  cursorAnimation();
});

// Create Binary Rain Effect
function createBinaryRain() {
  const overlay = document.createElement('div');
  overlay.classList.add('binary-overlay');
  document.body.appendChild(overlay);
  
  const characters = '01';
  const numColumns = 25;
  
  for (let i = 0; i < numColumns; i++) {
    const character = document.createElement('div');
    character.classList.add('binary-character');
    character.style.setProperty('--i', i);
    character.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
    
    // Randomize positions and animations
    character.style.left = `${(i * 4) + Math.random() * 3}%`;
    character.style.animationDuration = `${3 + Math.random() * 5}s`;
    character.style.animationDelay = `${-Math.random() * 5}s`;
    character.style.opacity = `${0.3 + Math.random() * 0.7}`;
    
    overlay.appendChild(character);
    
    // Dynamically change characters
    setInterval(() => {
      character.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
    }, 300 + Math.random() * 2000);
  }
}

// 3D Parallax Effect for elements with parallax-layer class
document.addEventListener('mousemove', (e) => {
  const layers = document.querySelectorAll('.parallax-layer');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  layers.forEach(layer => {
    const depth = layer.getAttribute('data-depth') || 0.1;
    const moveX = (centerX - e.clientX) * depth;
    const moveY = (centerY - e.clientY) * depth;
    
    layer.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
  });
});

// Glitch Text Effect Animation Control
document.querySelectorAll('.glitch-text').forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.animationDuration = '0.5s';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.animationDuration = '2.5s';
  });
});

// Initialize cyberpunk progress bars
document.querySelectorAll('.cyber-progress').forEach(progress => {
  const percentage = progress.getAttribute('data-progress') || 0;
  progress.style.setProperty('--progress', percentage);
  
  const percentageText = progress.querySelector('.percentage');
  if (percentageText) {
    let currentValue = 0;
    const interval = setInterval(() => {
      if (currentValue < percentage) {
        currentValue++;
        percentageText.textContent = `${currentValue}%`;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }
});

// Add holographic effect to cards
document.querySelectorAll('.sot-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleY = (x - centerX) / 10;
    const angleX = (centerY - y) / 10;
    
    card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px) scale(1.05)`;
    
    // Update shine effect position
    const percentX = x / rect.width * 100;
    const percentY = y / rect.height * 100;
    card.style.setProperty('--x', `${percentX}%`);
    card.style.setProperty('--y', `${percentY}%`);
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0) translateY(0) scale(1)';
  });
});

// Create augmented reality effect
function createAugmentedRealityEffect() {
  const overlay = document.createElement('div');
  overlay.classList.add('augmented-reality-overlay');
  
  const grid = document.createElement('div');
  grid.classList.add('ar-grid');
  
  const scanner = document.createElement('div');
  scanner.classList.add('ar-scanner');
  
  overlay.appendChild(grid);
  overlay.appendChild(scanner);
  document.body.appendChild(overlay);
}

// Initialize all effects on page load
document.addEventListener('DOMContentLoaded', () => {
  createBinaryRain();
  createAugmentedRealityEffect();
  
  // Apply data-text attribute to headers for layered effect
  document.querySelectorAll('h1, h2, h3').forEach(header => {
    header.setAttribute('data-text', header.textContent);
  });
  
  // Add gradient background
  const gradientBg = document.createElement('div');
  gradientBg.classList.add('gradient-bg');
  document.body.appendChild(gradientBg);
});