document.addEventListener("DOMContentLoaded", function () {
  /* ===== Navbar Color Theme Toggle ===== */
  const navColorToggle = document.getElementById('navColorToggle');
  const navColorDropdown = document.getElementById('navColorDropdown');
  const navColorOptions = document.querySelectorAll('.nav-color-option');

  if (navColorToggle && navColorDropdown) {
    // Toggle dropdown visibility
    navColorToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      navColorDropdown.classList.toggle('active');
      
      // Animate the button
      this.style.color = var(--accent-color);
      setTimeout(() => {
        this.style.color = '';
      }, 300);
    });
    
    // Handle color selection
    navColorOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        const theme = this.getAttribute('data-theme');
        
        // Remove all theme classes
        document.body.classList.remove('theme-cyan', 'theme-green', 'theme-purple', 'theme-orange');
        
        // Add the new theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Save preference
        localStorage.setItem('accentColor', theme);
        
        // Update active state in the blockchain theme selector
        const blockchainOptions = document.querySelectorAll('.blockchain-color-option');
        blockchainOptions.forEach(opt => {
          if (opt.getAttribute('data-theme') === theme) {
            opt.classList.add('active');
          } else {
            opt.classList.remove('active');
          }
        });
        
        // Hide dropdown
        navColorDropdown.classList.remove('active');
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      navColorDropdown.classList.remove('active');
    });
  }

  /* ===== Mobile Navigation Toggle - IMPROVED ===== */
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const navMenu = document.getElementById("navMenu");
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event bubbling
      navMenu.classList.toggle("active");

      // Add active class to hamburger for styling if needed
      hamburgerMenu.classList.toggle("active");
    });
  }

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Properly handle navigation
      e.preventDefault();

      // Get the target section
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      // Close mobile menu
      navMenu.classList.remove("active");
      hamburgerMenu.classList.remove("active");

      // Scroll to section with offset for navbar
      if (targetElement) {
        const navbar = document.getElementById("navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const offset = isMobile ? 80 : 20; // Extra offset on mobile

        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight -
          offset;

        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Close menu when clicking outside - with improved behavior
  document.addEventListener("click", function (e) {
    // Only close if menu is open and click is outside menu and hamburger
    if (navMenu.classList.contains("active")) {
      const isClickInside =
        navMenu.contains(e.target) || hamburgerMenu.contains(e.target);
      if (!isClickInside) {
        navMenu.classList.remove("active");
        hamburgerMenu.classList.remove("active");
      }
    }
  });

  /* ===== Floating Theme Selector ===== */
  const toggleThemePanel = document.getElementById("toggleThemePanel");
  const themePanel = document.getElementById("themePanel");
  const colorOptions = document.querySelectorAll(".color-option");

  // Toggle theme panel visibility
  toggleThemePanel.addEventListener("click", function () {
    themePanel.classList.toggle("active");

    // Add rotation animation
    toggleThemePanel.style.transform =
      toggleThemePanel.style.transform === "rotate(180deg)"
        ? "rotate(0deg)"
        : "rotate(180deg)";
  });

  // Handle color option selection
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");

      // Remove all theme classes
      document.body.classList.remove(
        "theme-cyan",
        "theme-green",
        "theme-purple",
        "theme-orange"
      );

      // Add selected theme class
      document.body.classList.add(`theme-${theme}`);

      // Save preference
      localStorage.setItem("accentColor", theme);

      // Visual feedback
      this.style.transform = "scale(1.1)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 300);
    });
  });

  /* ===== Blockchain-specific Theme Selector ===== */
  const blockchainThemeOptions = document.querySelectorAll(
    ".blockchain-color-option"
  );

  if (blockchainThemeOptions) {
    blockchainThemeOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        blockchainThemeOptions.forEach((opt) => opt.classList.remove("active"));

        // Add active class to clicked option
        this.classList.add("active");

        // Get theme
        const theme = this.getAttribute("data-theme");

        // Apply theme (same as other theme selector)
        document.body.classList.remove(
          "theme-cyan",
          "theme-green",
          "theme-purple",
          "theme-orange"
        );
        document.body.classList.add(`theme-${theme}`);

        // Save preference
        localStorage.setItem("accentColor", theme);

        // Update the floating theme selector to match
        const floatingOptions = document.querySelectorAll(".color-option");
        floatingOptions.forEach((opt) => {
          if (opt.getAttribute("data-theme") === theme) {
            // No need to trigger click event, just update appearance
            opt.style.transform = "scale(1.1)";
            setTimeout(() => {
              opt.style.transform = "scale(1)";
            }, 300);
          }
        });
      });
    });

    // Set initial active state based on saved theme
    const savedColor = localStorage.getItem("accentColor") || "cyan";
    blockchainThemeOptions.forEach((option) => {
      if (option.getAttribute("data-theme") === savedColor) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }

  /* ===== Mobile Ticker Controls ===== */
  const pauseTickerBtn = document.getElementById("pauseTicker");
  const playTickerBtn = document.getElementById("playTicker");
  const tickerContent = document.querySelector(".ticker-content");

  if (pauseTickerBtn && playTickerBtn && tickerContent) {
    pauseTickerBtn.addEventListener("click", function () {
      tickerContent.classList.add("paused");
      pauseTickerBtn.style.display = "none";
      playTickerBtn.style.display = "block";
    });

    playTickerBtn.addEventListener("click", function () {
      tickerContent.classList.remove("paused");
      playTickerBtn.style.display = "none";
      pauseTickerBtn.style.display = "block";
    });
  }

  /* ===== Fixed Theme Toggle to Properly Change Colors ===== */
  // Handle Light/Dark mode toggle properly
  const themeToggleBtn = document.getElementById("themeToggle");

  // Function to update code syntax colors based on theme
  function updateCodeColors() {
    // This would dynamically update code colors based on the current theme
    // We're using CSS variables to handle this automatically
  }

  themeToggleBtn.addEventListener("click", function () {
    // Toggle light mode class
    document.body.classList.toggle("light-mode");

    // Update code colors
    updateCodeColors();

    // Save preference
    const currentTheme = document.body.classList.contains("light-mode")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
  });

  // Check saved theme preference on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    updateCodeColors();
  }

  /* ===== Color Theme Toggle - FIXED ===== */
  const colorToggleBtn = document.getElementById("colorToggle");
  const accentColors = ["cyan", "green", "purple", "orange"];
  let currentColorIndex = 0;

  // Check saved color preference
  const savedColor = localStorage.getItem("accentColor");
  if (savedColor) {
    // Remove any existing color theme classes first
    accentColors.forEach((color) => {
      document.body.classList.remove(`theme-${color}`);
    });
    // Add the saved color theme class
    document.body.classList.add(`theme-${savedColor}`);
    currentColorIndex = accentColors.indexOf(savedColor);
    if (currentColorIndex === -1) currentColorIndex = 0;
  } else {
    document.body.classList.add("theme-cyan");
  }

  colorToggleBtn.addEventListener("click", function () {
    // Get current state before changes
    const isLightMode = document.body.classList.contains("light-mode");
    const isBWMode = document.body.classList.contains("bw-mode");

    // First, remove BW mode if active (since we're changing to a color)
    document.body.classList.remove("bw-mode");

    // Move to next color
    currentColorIndex = (currentColorIndex + 1) % accentColors.length;
    const newColor = accentColors[currentColorIndex];

    // Remove all theme classes but preserve light-mode class if it exists
    accentColors.forEach((color) => {
      document.body.classList.remove(`theme-${color}`);
    });

    // Add new theme class
    document.body.classList.add(`theme-${newColor}`);

    // Make sure light mode state is preserved if it was active
    if (isLightMode && !document.body.classList.contains("light-mode")) {
      document.body.classList.add("light-mode");
    }

    // Save preferences
    localStorage.setItem("accentColor", newColor);
    if (!isBWMode) {
      localStorage.removeItem("bwMode");
    }

    // Slight animation feedback
    colorToggleBtn.style.transform = "rotate(180deg)";
    setTimeout(() => {
      colorToggleBtn.style.transform = "rotate(0)";
    }, 300);
  });

  /* ===== Black & White Toggle - FIXED ===== */
  const bwToggleBtn = document.getElementById("bwToggle");

  // Check saved B&W preference
  const savedBW = localStorage.getItem("bwMode");
  if (savedBW === "true") {
    document.body.classList.add("bw-mode");
  }

  bwToggleBtn.addEventListener("click", function () {
    // Toggle BW mode
    document.body.classList.toggle("bw-mode");

    // Save preference
    const isBWMode = document.body.classList.contains("bw-mode");
    localStorage.setItem("bwMode", isBWMode);

    // Slight animation feedback
    bwToggleBtn.style.transform = "rotate(180deg)";
    setTimeout(() => {
      bwToggleBtn.style.transform = "rotate(0)";
    }, 300);
  });

  /* ===== Update Current Date/Time ===== */
  function updateDateTime() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const dateElement = document.getElementById("currentDate");
    if (dateElement) {
      dateElement.textContent = formattedDate;
    }
  }

  // Set the specified date from user
  document.getElementById("currentDate").textContent = "2025-04-10 22:47:48";

  // Update time every second if real-time updates are desired
  // setInterval(updateDateTime, 1000);

  /* ===== Enhanced Typewriter Effect for Glitch Text ===== */
  function enhancedTypewriter() {
    const glitchTextEl = document.getElementById("glitchText");
    if (glitchTextEl) {
      const textToType = "INITIALIZING SYSTEM...";
      let currentIndex = 0;
      
      function typeNextChar() {
        if (currentIndex < textToType.length) {
          // Add the next character
          glitchTextEl.textContent += textToType[currentIndex];
          
          // Update data-text attribute for glitch effect
          glitchTextEl.setAttribute("data-text", glitchTextEl.textContent);
          
          // Sometimes add a glitch effect by temporarily adding/removing chars
          if (Math.random() < 0.1 && currentIndex > 3) {
            const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            glitchTextEl.textContent = glitchTextEl.textContent.slice(0, -1) + randomChar;
            
            // Fix it after a short delay
            setTimeout(() => {
              if (currentIndex < textToType.length) {
                glitchTextEl.textContent = textToType.substring(0, currentIndex);
              }
            }, 100);
          }
          
          currentIndex++;
          
          // Randomize the delay for more realistic typing
          const nextDelay = 100 + Math.random() * 200;
          setTimeout(typeNextChar, nextDelay);
        } else {
          // Add blinking cursor at the end
          glitchTextEl.classList.add('typing-done');
          
          // After typing finishes, add more dramatic glitch effect before fade-out
          setTimeout(() => {
            addFinalGlitchEffect();
          }, 1000);
        }
      }
      
      // Start typing with a slight initial delay
      setTimeout(typeNextChar, 500);
    }
  }

  function addFinalGlitchEffect() {
    const glitchOverlay = document.getElementById("glitchOverlay");
    
    // Add intense glitch class
    glitchOverlay.classList.add('intense-glitch');
    
    setTimeout(() => {
      // Start fade out
      glitchOverlay.classList.add("fade-out");
      
      setTimeout(() => {
        // Remove completely after fade animation completes
        if (glitchOverlay && glitchOverlay.parentNode) {
          glitchOverlay.parentNode.removeChild(glitchOverlay);
          console.log("Glitch overlay removed");
          
          // After removing the overlay, make sections visible with a delay
          showSectionsSequentially();
        }
      }, 600);
    }, 800);
  }

  // Run enhanced typewriter on document load
  enhancedTypewriter();

  /* ===== Remove Glitch Overlay Immediately ===== */
  // First, make all sections visible immediately
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("visible");
  });

  /* ===== Fix Glitch Overlay Animation ===== */
  const glitchOverlay = document.getElementById("glitchOverlay");
  if (glitchOverlay) {
    // Make sure it's visible initially
    glitchOverlay.style.opacity = "1";
    glitchOverlay.style.pointerEvents = "auto";

    setTimeout(function () {
      // Start the fade out
      glitchOverlay.classList.add("fade-out");

      setTimeout(function () {
        // Remove completely after fade animation completes
        if (glitchOverlay.parentNode) {
          glitchOverlay.parentNode.removeChild(glitchOverlay);

          // After overlay is gone, make sections visible with the stagger effect
          showSectionsSequentially();
        }
      }, 500); // Fade transition duration
    }, 3000); // How long to show overlay
  }

  // The original timeout-based glitch removal logic
  setTimeout(function () {
    const glitchOverlay = document.getElementById("glitchOverlay");
    if (glitchOverlay) {
      glitchOverlay.classList.add("fade-out");
      console.log("Glitch overlay fading out");
      setTimeout(function () {
        if (glitchOverlay.parentNode) {
          glitchOverlay.parentNode.removeChild(glitchOverlay);
          console.log("Glitch overlay removed");
          // After removing the overlay, make sections visible with a delay
          showSectionsSequentially();
        }
      }, 500);
    }
  }, 4000);

  // Function to show sections with delay
  function showSectionsSequentially() {
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add("visible");
      }, index * 150); // Stagger effect
    });
  }

  /* ===== World Map Animation ===== */
  function animateWorldMap() {
    // This function gets called after initial page load
    // The animations are handled via CSS, but we could add dynamic elements here
    console.log("World map animation initialized");

    // If you want to add random "data packets" dynamically:
    const dataPackets = document.querySelectorAll(".data-packet");

    // For each data packet, set up random animations
    dataPackets.forEach((packet) => {
      setInterval(() => {
        // Reset position and start a new animation
        packet.style.animation = "none";
        void packet.offsetWidth; // Trigger reflow
        const randomDuration = 5 + Math.random() * 5;
        packet.style.animation = `movePacket ${randomDuration}s linear`;
      }, 8000);
    });
  }

  // Start world map animations after overlay disappears
  setTimeout(animateWorldMap, 4500);

  /* ===== Background Particle Animation - RESTORED ORIGINAL MOBILE VERSION ===== */
  const bgCanvas = document.getElementById("bgCanvas");
  if (bgCanvas) {
    const ctx = bgCanvas.getContext("2d");
    let particles = [];

    // Different settings for mobile vs desktop (reverting to original)
    const particleCount = isMobile ? 50 : 150;
    const maxDistance = isMobile ? 60 : 80;

    let mouse = { x: undefined, y: undefined };

    function resizeBgCanvas() {
      // Fix for mobile devices: use window.visualViewport to get accurate dimensions
      if (window.visualViewport) {
        bgCanvas.width = window.visualViewport.width;
        bgCanvas.height = window.visualViewport.height;
      } else {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
      }

      // Re-initialize particles on resize
      initParticles();
    }

    // Initial resize
    resizeBgCanvas();

    // Handle resize events with throttling
    let resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeBgCanvas, 200);
    });

    // Properly handle touch events for interaction
    window.addEventListener(
      "touchstart",
      function (event) {
        if (event.touches.length > 0) {
          mouse.x = event.touches[0].clientX;
          mouse.y = event.touches[0].clientY;
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      function (event) {
        if (event.touches.length > 0) {
          mouse.x = event.touches[0].clientX;
          mouse.y = event.touches[0].clientY;
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      function () {
        mouse.x = undefined;
        mouse.y = undefined;
      },
      { passive: true }
    );

    // Mouse events for desktop
    window.addEventListener(
      "mousemove",
      function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      },
      { passive: true }
    );

    window.addEventListener("mouseout", function () {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    // Particle constructor with improved mobile performance - ORIGINAL BEHAVIOR
    function Particle() {
      this.x = Math.random() * bgCanvas.width;
      this.y = Math.random() * bgCanvas.height;
      this.size = Math.random() * (isMobile ? 1.5 : 2) + 1;

      // Different speeds for mobile vs desktop - returning to original
      const speed = isMobile ? 0.6 : 1.2;
      this.vx = (Math.random() - 0.5) * speed;
      this.vy = (Math.random() - 0.5) * speed;

      // White particles in dark mode, black in light mode
      this.baseColor = "rgba(255, 255, 255, 1)";
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;

      // Loop around edges
      if (this.x < 0) this.x = bgCanvas.width;
      if (this.x > bgCanvas.width) this.x = 0;
      if (this.y < 0) this.y = bgCanvas.height;
      if (this.y > bgCanvas.height) this.y = 0;

      // React to mouse/touch - original behavior
      if (mouse.x !== undefined && mouse.y !== undefined) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const interactionDistance = isMobile ? 70 : 100;

        if (distance < interactionDistance) {
          let force = (interactionDistance - distance) / interactionDistance;
          this.x += (dx / distance) * force * (isMobile ? 1.5 : 2);
          this.y += (dy / distance) * force * (isMobile ? 1.5 : 2);
        }
      }
    };

    Particle.prototype.draw = function () {
      const lightMode = document.body.classList.contains("light-mode");
      const color = lightMode ? "rgba(0, 0, 0, 1)" : this.baseColor;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    function connectParticles() {
      // Original behavior - different for mobile and desktop
      const skipFactor = isMobile ? 3 : 1; // Skip more connections on mobile
      const connectionLimit = isMobile ? 3 : 5; // Limit connections per particle on mobile

      for (let i = 0; i < particles.length; i += skipFactor) {
        let connections = 0;
        for (
          let j = i + 1;
          j < particles.length && connections < connectionLimit;
          j += skipFactor
        ) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const lightMode = document.body.classList.contains("light-mode");
            const opacity = 1 - distance / maxDistance;
            const strokeColor = lightMode
              ? `rgba(0, 0, 0, ${opacity * 0.8})`
              : `rgba(255, 255, 255, ${opacity * 0.8})`;

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = isMobile ? 0.6 : 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            connections++;
          }
        }
      }
    }

    function addGlitchEffect() {
      // Original behavior - different frequency for mobile
      if (Math.random() < (isMobile ? 0.03 : 0.08)) {
        try {
          let sliceHeight = Math.floor(Math.random() * 15) + 5;
          let y = Math.floor(Math.random() * bgCanvas.height);
          let shift = Math.floor(Math.random() * 20) - 10;

          // Use a smaller area for mobile devices
          const width = isMobile
            ? Math.min(bgCanvas.width, 300)
            : bgCanvas.width;
          const x = isMobile
            ? Math.floor(Math.random() * (bgCanvas.width - width))
            : 0;

          const imageData = ctx.getImageData(x, y, width, sliceHeight);
          ctx.putImageData(imageData, x + shift, y);
        } catch (e) {
          // Silently handle any potential errors with canvas operations
          console.log("Canvas operation error:", e);
        }
      }
    }

    // Improved animation loop with timestamp for consistent speed
    let lastTime = 0;
    let animationFrameId;

    function animateBg(timestamp) {
      // Calculate delta time for consistent animation speed
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Skip frames on low-end devices if needed
      if (isMobile && deltaTime > 50) {
        animationFrameId = requestAnimationFrame(animateBg);
        return;
      }

      ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();

      // Add glitch effect with reduced frequency on mobile
      addGlitchEffect();

      animationFrameId = requestAnimationFrame(animateBg);
    }

    // Start animation with proper timestamp
    animationFrameId = requestAnimationFrame(animateBg);

    // Optimize animation when tab is not visible
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = 0; // Reset timer to avoid jumps
        animationFrameId = requestAnimationFrame(animateBg);
      }
    });
  }

  /* ===== Observer for Section Animations ===== */
  // Use Intersection Observer instead of GSAP for better mobile performance
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  /* ===== Custom Cursor (Desktop Only) ===== */
  const customCursor = document.getElementById("customCursor");

  // Only enable custom cursor on desktop
  if (!isMobile && customCursor) {
    document.addEventListener(
      "mousemove",
      (e) => {
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      },
      { passive: true }
    );
  }

  /* ===== AI Assistant API Integration ===== */
  const assistantButton = document.getElementById("assistantButton");
  const assistantInput = document.getElementById("assistantInput");
  const assistantResponse = document.getElementById("assistantResponse");

  // API configuration for the AI assistant
  const API_URL =
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
  // IMPORTANT: Replace this placeholder with your actual Hugging Face API token
  const API_TOKEN = "hf_REPLACE_WITH_YOUR_ACTUAL_HUGGING_FACE_TOKEN";

  async function queryAI(inputText) {
    // Show loading state first
    assistantResponse.textContent = "// Processing query...";
    assistantResponse.classList.add("loading");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_TOKEN ? "Bearer " + API_TOKEN : "",
        },
        body: JSON.stringify({ inputs: inputText }),
      });

      const result = await response.json();

      assistantResponse.classList.remove("loading");
      return result;
    } catch (error) {
      console.error("AI Assistant error:", error);
      assistantResponse.classList.remove("loading");
      return {
        error: true,
        message: "// Error: Connection failed to AI service.",
      };
    }
  }

  if (assistantButton && assistantInput) {
    // Handle click
    assistantButton.addEventListener("click", async () => {
      const userInput = assistantInput.value.trim();
      if (!userInput) return;

      const result = await queryAI(userInput);

      if (result.error) {
        assistantResponse.textContent =
          result.message || "// Error: Could not process request.";
      } else {
        // Format response as code
        assistantResponse.textContent = `// Response:\n${
          result.generated_text || "No data available."
        }`;
      }
    });

    // Handle Enter key
    assistantInput.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        const userInput = assistantInput.value.trim();
        if (!userInput) return;

        const result = await queryAI(userInput);

        if (result.error) {
          assistantResponse.textContent =
            result.message || "// Error: Could not process request.";
        } else {
          // Format response as code
          assistantResponse.textContent = `// Response:\n${
            result.generated_text || "No data available."
          }`;
        }
      }
    });
  }

  /* ===== Form Submission ===== */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !message) {
        alert("[ERROR]: All fields required.");
        return;
      }

      // Here you would normally send the form data to your server
      // For this example, we'll just show a success message
      alert("[SUCCESS]: Message sent successfully.");
      contactForm.reset();
    });
  }
});
