/**
 * THE ROOM SALON - GSAP & THREE.JS VISUAL ENHANCEMENTS
 * Optimized for performance with reduced motion fallback.
 */

window.addEventListener('load', () => {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. GSAP & SCROLLTRIGGER ENHANCEMENTS
     -------------------------------------------------------------------------- */
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Section Reveal
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Reveal elements on scroll
    const animateOnScrollElements = document.querySelectorAll('.card-service, .feature-card, .gallery-item');
    
    animateOnScrollElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. THREE.JS ELEGANT LIGHTWEIGHT BACKGROUND
     Creates a subtle, low-overhead luxury particle field in the Hero.
     -------------------------------------------------------------------------- */
  const canvasContainer = document.getElementById('webgl-canvas');
  if (canvasContainer && typeof THREE !== 'undefined' && !prefersReducedMotion) {
    let scene, camera, renderer, particles;
    let animationFrameId;

    function initWebGL() {
      const width = canvasContainer.clientWidth || window.innerWidth;
      const height = canvasContainer.clientHeight || window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 300;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      canvasContainer.appendChild(renderer.domElement);

      // Particle Geometry
      const particleCount = 60;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 600;
        positions[i + 1] = (Math.random() - 0.5) * 600;
        positions[i + 2] = (Math.random() - 0.5) * 600;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xE6C594,
        size: 3,
        transparent: true,
        opacity: 0.5
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      animate();
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (particles) {
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0004;
      }
      renderer.render(scene, camera);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
      if (!renderer || !camera) return;
      const width = canvasContainer.clientWidth || window.innerWidth;
      const height = canvasContainer.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // IntersectionObserver to pause WebGL when out of view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(animationFrameId);
        } else {
          animate();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(canvasContainer);

    try {
      initWebGL();
    } catch (e) {
      console.warn('WebGL Initialization skipped: Fallback active.', e);
    }
  }
});
