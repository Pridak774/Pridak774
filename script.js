document.addEventListener("DOMContentLoaded", function () {
  // Update timestamps with the specified date
  const currentDateTime = "2025-04-11 18:05:30";
  const dateTimeElements = document.querySelectorAll("#currentDateTime, #footerDateTime");
  dateTimeElements.forEach(element => {
    if (element) element.textContent = currentDateTime;
  });

  /* ===== Theme Toggle and Color Management ===== */
  // Theme toggle button (light/dark mode)
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("light-mode");
      const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
    });
  }
  
  // Check saved theme preference on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  /* ===== Floating Theme Selector ===== */
  const toggleThemePanel = document.getElementById("toggleThemePanel");
  const themePanel = document.getElementById("themePanel");
  const colorOptions = document.querySelectorAll(".color-option");
  
  if (toggleThemePanel && themePanel) {
    toggleThemePanel.addEventListener("click", function() {
      themePanel.classList.toggle("active");
      this.style.transform = themePanel.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
    });
    
    colorOptions.forEach(option => {
      option.addEventListener("click", function() {
        const theme = this.getAttribute("data-theme");
        
        // Remove all theme classes
        document.body.classList.remove("theme-cyan", "theme-green", "theme-purple", "theme-orange");
        
        // Add selected theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Save preference
        localStorage.setItem("accentColor", theme);
        
        // Animation feedback
        this.style.transform = "scale(1.2)";
        setTimeout(() => { this.style.transform = "scale(1)"; }, 300);
      });
    });
  }
  
  // Load saved color theme
  const savedColor = localStorage.getItem("accentColor");
  if (savedColor) {
    document.body.classList.remove("theme-cyan", "theme-green", "theme-purple", "theme-orange");
    document.body.classList.add(`theme-${savedColor}`);
  } else {
    document.body.classList.add("theme-cyan"); // Default theme
  }
  
  /* ===== Mobile Navigation ===== */
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const navMenu = document.getElementById("navMenu");
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
  
  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener("click", function(e) {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      hamburgerMenu.classList.toggle("active");
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        navMenu.classList.remove("active");
        hamburgerMenu.classList.remove("active");
        
        if (targetElement) {
          const navbar = document.getElementById("navbar");
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          const offset = isMobile ? 80 : 20;
          
          const targetPosition = targetElement.getBoundingClientRect().top + 
                                window.pageYOffset - 
                                navbarHeight - 
                                offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
      if (navMenu.classList.contains("active")) {
        const isClickInside = navMenu.contains(e.target) || hamburgerMenu.contains(e.target);
        if (!isClickInside) {
          navMenu.classList.remove("active");
          hamburgerMenu.classList.remove("active");
        }
      }
    });
  }

  /* ===== Custom Cursor (Desktop Only) ===== */
  const customCursor = document.getElementById("customCursor");
  if (!isMobile && customCursor) {
    document.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => {
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }, { passive: true });
  }

  /* ===== Mobile Ticker Controls ===== */
  const pauseTickerBtn = document.getElementById("pauseTicker");
  const playTickerBtn = document.getElementById("playTicker");
  const tickerContent = document.querySelector(".ticker-content");
  
  if (pauseTickerBtn && playTickerBtn && tickerContent) {
    pauseTickerBtn.addEventListener("click", function() {
      tickerContent.classList.add("paused");
      pauseTickerBtn.style.display = "none";
      playTickerBtn.style.display = "block";
    });
    
    playTickerBtn.addEventListener("click", function() {
      tickerContent.classList.remove("paused");
      playTickerBtn.style.display = "none";
      pauseTickerBtn.style.display = "block";
    });
  }

  /* ===== Glitch Overlay and Text Animation ===== */
  const glitchOverlay = document.getElementById("glitchOverlay");
  const glitchTextEl = document.getElementById("glitchText");
  
  if (glitchTextEl) {
    const textToType = "INITIALIZING SYSTEM...";
    glitchTextEl.setAttribute("data-text", textToType);
    
    let currentIndex = 0;
    function typeNextChar() {
      if (currentIndex < textToType.length) {
        glitchTextEl.textContent += textToType[currentIndex];
        glitchTextEl.setAttribute("data-text", glitchTextEl.textContent);
        currentIndex++;
        setTimeout(typeNextChar, 100 + Math.random() * 80);
      } else {
        // Add blinking cursor effect after typing
        glitchTextEl.classList.add('typing-done');
        
        // Start fading out the overlay after typing
        setTimeout(() => {
          if (glitchOverlay) {
            glitchOverlay.classList.add("fade-out");
            
            setTimeout(() => {
              if (glitchOverlay.parentNode) {
                glitchOverlay.parentNode.removeChild(glitchOverlay);
              }
            }, 500);
          }
        }, 600);
      }
    }
    
    // Start typing after a short delay
    setTimeout(typeNextChar, 500);
  } else {
    // If the text element doesn't exist, remove the overlay after a timeout
    setTimeout(function() {
      if (glitchOverlay && glitchOverlay.parentNode) {
        glitchOverlay.classList.add("fade-out");
        setTimeout(() => {
          glitchOverlay.parentNode.removeChild(glitchOverlay);
        }, 500);
      }
    }, 2000);
  }

  /* ===== Initialize Energy Dashboard Charts ===== */
  if (document.getElementById('energyProductionChart')) {
    const energyProductionCtx = document.getElementById('energyProductionChart').getContext('2d');
    const energyProductionChart = new Chart(energyProductionCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Solar',
            data: [120, 180, 240, 290, 350, 410, 430, 380, 320, 260, 190, 140],
            borderColor: 'rgba(0, 255, 255, 1)',
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderWidth: 2,
            tension: 0.4
          },
          {
            label: 'Wind',
            data: [350, 320, 280, 220, 180, 150, 140, 170, 210, 280, 320, 340],
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderWidth: 2,
            tension: 0.4
          },
          {
            label: 'Hydro',
            data: [200, 220, 240, 260, 230, 180, 160, 150, 170, 190, 210, 195],
            borderColor: 'rgba(200, 0, 255, 1)',
            backgroundColor: 'rgba(200, 0, 255, 0.2)',
            borderWidth: 2,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('light-mode') ? '#333' : '#ddd'
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('light-mode') ? '#333' : '#ddd'
            }
          }
        }
      }
    });

    // Network Activity Chart
    const networkActivityCtx = document.getElementById('networkActivityChart').getContext('2d');
    const networkActivityChart = new Chart(networkActivityCtx, {
      type: 'bar',
      data: {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        datasets: [
          {
            label: 'Transactions',
            data: [124, 85, 97, 210, 325, 408, 380, 230],
            backgroundColor: 'rgba(0, 255, 255, 0.6)',
            borderColor: 'rgba(0, 255, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('light-mode') ? '#333' : '#ddd'
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('light-mode') ? '#333' : '#ddd'
            }
          }
        }
      }
    });

    // Refresh dashboard data button
    const refreshDashboardBtn = document.getElementById('refreshDashboard');
    if (refreshDashboardBtn) {
      refreshDashboardBtn.addEventListener('click', function() {
        // Simulate data refresh
        this.classList.add('refreshing');
        setTimeout(() => {
          // Generate new random data
          const newSolarData = energyProductionChart.data.datasets[0].data.map(
            value => value * (0.95 + Math.random() * 0.1)
          );
          const newWindData = energyProductionChart.data.datasets[1].data.map(
            value => value * (0.95 + Math.random() * 0.1)
          );
          const newHydroData = energyProductionChart.data.datasets[2].data.map(
            value => value * (0.95 + Math.random() * 0.1)
          );
          
          // Update the charts
          energyProductionChart.data.datasets[0].data = newSolarData;
          energyProductionChart.data.datasets[1].data = newWindData;
          energyProductionChart.data.datasets[2].data = newHydroData;
          energyProductionChart.update();
          
          // Update network activity chart
          networkActivityChart.data.datasets[0].data = networkActivityChart.data.datasets[0].data.map(
            value => Math.max(50, Math.min(500, value * (0.9 + Math.random() * 0.2)))
          );
          networkActivityChart.update();
          
          // Update real-time stats
          document.getElementById('activeNodes').textContent = Math.floor(Math.random() * 50) + 220;
          document.getElementById('transactionRate').textContent = (Math.random() * 10 + 20).toFixed(1) + '/s';
          document.getElementById('networkHealth').textContent = (Math.random() * 3 + 96).toFixed(1) + '%';
          
          // Remove refreshing animation
          this.classList.remove('refreshing');
        }, 800);
      });
    }

    // View mode toggle buttons
    const viewModeButtons = document.querySelectorAll('.toggle-btn[data-view]');
    if (viewModeButtons.length > 0) {
      viewModeButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons
          viewModeButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Update chart data based on selected view mode
          const viewMode = this.getAttribute('data-view');
          updateChartsForViewMode(viewMode, energyProductionChart, networkActivityChart);
        });
      });
    }

    // Function to update charts based on view mode
    function updateChartsForViewMode(viewMode, productionChart, activityChart) {
      // Simulate loading state
      document.querySelectorAll('.chart-container').forEach(container => {
        container.classList.add('loading');
      });
      
      setTimeout(() => {
        switch(viewMode) {
          case 'realtime':
            productionChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            activityChart.data.labels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
            break;
          case 'day':
            productionChart.data.labels = ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
            activityChart.data.labels = ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
            break;
          case 'week':
            productionChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            activityChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            break;
          case 'month':
            productionChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            activityChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            break;
        }
        
        // Generate new random data based on view mode
        productionChart.data.datasets.forEach(dataset => {
          dataset.data = Array(productionChart.data.labels.length).fill(0).map(() => 
            Math.floor(Math.random() * 300) + 100
          );
        });
        
        activityChart.data.datasets[0].data = Array(activityChart.data.labels.length).fill(0).map(() => 
          Math.floor(Math.random() * 300) + 100
        );
        
        // Update charts
        productionChart.update();
        activityChart.update();
        
        // Remove loading state
        document.querySelectorAll('.chart-container').forEach(container => {
          container.classList.remove('loading');
        });
      }, 600);
    }
  }

  /* ===== Energy Trading Simulator ===== */
  if (document.getElementById('energyPriceChart')) {
    const energyPriceCtx = document.getElementById('energyPriceChart').getContext('2d');
    const energyPriceChart = new Chart(energyPriceCtx, {
      type: 'line',
      data: {
        labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
        datasets: [
          {
            label: 'Solar',
            data: [0.123, 0.119, 0.122, 0.125, 0.127, 0.129, 0.128, 0.126, 0.128],
            borderColor: 'rgba(0, 255, 255, 1)',
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            borderWidth: 2,
            tension: 0.2,
            fill: true
          },
          {
            label: 'Wind',
            data: [0.095, 0.093, 0.090, 0.092, 0.095, 0.094, 0.092, 0.091, 0.094],
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderWidth: 2,
            tension: 0.2,
            fill: true
          },
          {
            label: 'Hydro',
            data: [0.078, 0.077, 0.076, 0.075, 0.074, 0.075, 0.076, 0.076, 0.076],
            borderColor: 'rgba(200, 0, 255, 1)',
            backgroundColor: 'rgba(200, 0, 255, 0.1)',
            borderWidth: 2,
            tension: 0.2,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': €' + context.raw.toFixed(3) + '/kWh';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('light-mode') ? '#333' : '#ddd'
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return '€' + value.toFixed(3);
              },
              color: document.body.classList.contains('light-mode') ? '#333' : '#ddd'
            }
          }
        }
      }
    });
    
    // Energy source selection
    const energySources = document.querySelectorAll('.energy-source');
    if (energySources.length > 0) {
      energySources.forEach(source => {
        source.addEventListener('click', function() {
          // Remove selected class from all sources
          energySources.forEach(s => s.classList.remove('selected'));
          
          // Add selected class to clicked source
          this.classList.add('selected');
          
          // Update form with selected source info
          const sourceType = this.getAttribute('data-source');
          const energyTypeSelect = document.getElementById('energyType');
          if (energyTypeSelect) {
            energyTypeSelect.value = sourceType;
          }
          
          // Update price based on selected energy type
          updateEnergyPrice(sourceType);
        });
      });
    }
    
    // Transaction type toggle
    const transactionButtons = document.querySelectorAll('.transaction-type-btn');
    if (transactionButtons.length > 0) {
      transactionButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons
          transactionButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Update calculation
          updateTransactionTotal();
        });
      });
    }
    
    // Energy amount and price input change handlers
    const energyAmount = document.getElementById('energyAmount');
    const energyPrice = document.getElementById('energyPrice');
    
    if (energyAmount && energyPrice) {
      [energyAmount, energyPrice].forEach(input => {
        input.addEventListener('input', updateTransactionTotal);
      });
      
      // Also update when energy type changes
      const energyType = document.getElementById('energyType');
      if (energyType) {
        energyType.addEventListener('change', function() {
          updateEnergyPrice(this.value);
          updateTransactionTotal();
        });
      }
    }
    
    // Function to update energy price based on selection
    function updateEnergyPrice(sourceType) {
      if (!energyPrice) return;
      
      switch(sourceType) {
        case 'solar':
          energyPrice.value = 0.128;
          break;
        case 'wind':
          energyPrice.value = 0.094;
          break;
        case 'hydro':
          energyPrice.value = 0.076;
          break;
      }
    }
    
    // Function to update transaction total
    function updateTransactionTotal() {
      if (!energyAmount || !energyPrice) return;
      
      const amount = parseFloat(energyAmount.value);
      const price = parseFloat(energyPrice.value);
      
      if (isNaN(amount) || isNaN(price)) return;
      
      const total = amount * price;
      const networkFee = total * 0.025; // 2.5% fee
      
      const totalElement = document.getElementById('transactionTotal');
      const feeElement = document.getElementById('networkFee');
      
      if (totalElement) {
        totalElement.textContent = '€' + total.toFixed(2);
      }
      
      if (feeElement) {
        feeElement.textContent = '€' + networkFee.toFixed(2);
      }
    }
    
    // Execute transaction button
    const executeBtn = document.getElementById('executeTransaction');
    if (executeBtn) {
      executeBtn.addEventListener('click', function() {
        if (!energyAmount || !energyPrice) return;
        
        const amount = parseFloat(energyAmount.value);
        const price = parseFloat(energyPrice.value);
        
        if (isNaN(amount) || isNaN(price) || amount <= 0) {
          alert('Please enter valid amount and price values.');
          return;
        }
        
        // Get transaction type
        const transactionType = document.querySelector('.transaction-type-btn.active').getAttribute('data-type');
        
        // Get energy type
        const energyType = document.getElementById('energyType').value;
        
        // Create transaction record
        executeTransaction(transactionType, amount, energyType, price);
      });
    }
    
    // Function to execute transaction
    function executeTransaction(type, amount, energyType, price) {
      // Simulate processing with button state
      executeBtn.disabled = true;
      executeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      
      setTimeout(() => {
        // Update transaction list
        const transactionList = document.getElementById('transactionList');
        if (transactionList) {
          // Create new transaction item
          const li = document.createElement('li');
          li.className = `transaction-item ${type.toLowerCase()}`;
          
          // Format current time
          const now = new Date();
          const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                             now.getMinutes().toString().padStart(2, '0') + ':' + 
                             now.getSeconds().toString().padStart(2, '0');
          
          // Format transaction HTML
          li.innerHTML = `
            <span class="tx-type">${type.toUpperCase()}</span>
            <span class="tx-details">${amount} kWh ${energyType.charAt(0).toUpperCase() + energyType.slice(1)} @ €${price}</span>
            <span class="tx-time">${timeString}</span>
          `;
          
          // Add to list at the top
          if (transactionList.firstChild) {
            transactionList.insertBefore(li, transactionList.firstChild);
          } else {
            transactionList.appendChild(li);
          }
          
          // Keep list manageable - remove old items
          if (transactionList.childElementCount > 10) {
            transactionList.removeChild(transactionList.lastChild);
          }
          
          // Highlight new transaction
          li.classList.add('new');
          setTimeout(() => {
            li.classList.remove('new');
          }, 2000);
          
          // Update blockchain visualization
          updateBlockchainVisualization(type, amount, energyType, price);
          
          // Update wallet balance if needed
          const walletBalance = document.querySelector('.wallet-balance .balance-value');
          const total = amount * price;
          if (walletBalance) {
            const currentBalance = parseFloat(walletBalance.textContent.replace('€', '').replace(',', ''));
            let newBalance;
            
            if (type.toLowerCase() === 'buy') {
              newBalance = currentBalance - total - (total * 0.025);
            } else {
              newBalance = currentBalance + total - (total * 0.025);
            }
            
            walletBalance.textContent = '€' + newBalance.toFixed(2);
          }
        }
        
        // Reset button state
        executeBtn.disabled = false;
        executeBtn.innerHTML = 'Execute Transaction';
        
        // Update price chart with slight change
        energyPriceChart.data.datasets.forEach(dataset => {
          if (dataset.label.toLowerCase() === energyType) {
            // Add small price change to the chart
            const lastPrice = dataset.data[dataset.data.length - 1];
            const newPrice = type.toLowerCase() === 'buy' ? 
              lastPrice * (1 + 0.005) : 
              lastPrice * (1 - 0.005);
            
            // Shift data points left and add new price point
            dataset.data.shift();
            dataset.data.push(Math.min(0.18, Math.max(0.05, newPrice))); // Limit min/max range
          }
        });
        
        energyPriceChart.update();
      }, 1500);
    }
    
    // Initialize blockchain visualization
    function updateBlockchainVisualization(type, amount, energyType, price) {
      const blockchainContainer = document.getElementById('tradingBlockchain');
      if (!blockchainContainer) return;
      
      // Create new block element
      const block = document.createElement('div');
      block.className = 'blockchain-block';
      
      // Generate random hash
      const hash = Array(8).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      
      // Set content based on transaction type and energy type
      let colorClass = 'solar-block';
      if (energyType === 'wind') colorClass = 'wind-block';
      if (energyType === 'hydro') colorClass = 'hydro-block';
      
      block.classList.add(colorClass);
      block.innerHTML = `
        <div class="block-header">
          <span class="block-type">${type.toUpperCase()}</span>
          <span class="block-hash">0x${hash}</span>
        </div>
        <div class="block-content">
          <div class="block-info">${amount} kWh</div>
          <div class="block-price">€${price}/kWh</div>
        </div>
      `;
      
      // Add block to visualization
      blockchainContainer.prepend(block);
      
      // Limit number of blocks shown
      if (blockchainContainer.childElementCount > 20) {
        blockchainContainer.lastElementChild.remove();
      }
      
      // Highlight new block then fade effect
      block.classList.add('new-block');
      setTimeout(() => {
        block.classList.remove('new-block');
      }, 2000);
    }
  }

  /* ===== Timeline Visualization ===== */
  const timelineFilters = document.querySelectorAll('.filter-btn');
  if (timelineFilters.length > 0) {
    timelineFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Remove active class from all filters
        timelineFilters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter timeline nodes
        filterTimelineNodes(filterValue);
      });
    });
    
    // Function to filter timeline nodes
    function filterTimelineNodes(filter) {
      const timelineNodes = document.querySelectorAll('.timeline-node');
      
      timelineNodes.forEach(node => {
        if (filter === 'all') {
          node.classList.remove('hidden');
          node.classList.add('visible');
        } else {
          const nodeCategories = node.getAttribute('data-categories').split(',');
          
          if (nodeCategories.includes(filter)) {
            node.classList.remove('hidden');
            node.classList.add('visible');
          } else {
            node.classList.add('hidden');
            node.classList.remove('visible');
          }
        }
      });
      
      // Add animation to visible nodes
      const visibleNodes = document.querySelectorAll('.timeline-node.visible');
      visibleNodes.forEach((node, index) => {
        setTimeout(() => {
          node.classList.add('animate');
        }, index * 100);
      });
    }
  }

  /* ===== 3D Blockchain Explorer ===== */
  const blockchain3DContainer = document.getElementById('blockchain3DContainer');
  if (blockchain3DContainer) {
    let scene, camera, renderer, blocks = [];
    let isAnimating = true;
    
    // Initialize 3D scene
    function initBlockchainScene() {
      // Create scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(document.body.classList.contains('light-mode') ? 0xf5f5f5 : 0x111111);
      
      // Create camera
      camera = new THREE.PerspectiveCamera(75, blockchain3DContainer.clientWidth / blockchain3DContainer.clientHeight, 0.1, 1000);
      camera.position.z = 50;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(blockchain3DContainer.clientWidth, blockchain3DContainer.clientHeight);
      blockchain3DContainer.appendChild(renderer.domElement);
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 0, 1);
      scene.add(directionalLight);
      
      // Create blocks
      createBlockchain();
      
      // Handle resize
      window.addEventListener('resize', onWindowResize);
      
      // Add controls
      const zoomIn = document.getElementById('zoomIn');
      const zoomOut = document.getElementById('zoomOut');
      const resetView = document.getElementById('resetView');
      
      if (zoomIn && zoomOut && resetView) {
        zoomIn.addEventListener('click', () => {
          camera.position.z = Math.max(10, camera.position.z - 5);
        });
        
        zoomOut.addEventListener('click', () => {
          camera.position.z = Math.min(100, camera.position.z + 5);
        });
        
        resetView.addEventListener('click', () => {
          camera.position.set(0, 0, 50);
          camera.rotation.set(0, 0, 0);
        });
      }
      
      // Visualization mode selector
      const visMode = document.getElementById('visualizationMode');
      if (visMode) {
        visMode.addEventListener('change', () => {
          updateVisualizationMode(visMode.value);
        });
      }
      
      // Time range slider
      const timeRangeSlider = document.getElementById('timeRangeSlider');
      const timeRangeValue = document.getElementById('timeRangeValue');
      
      if (timeRangeSlider && timeRangeValue) {
        timeRangeSlider.addEventListener('input', () => {
          const value = timeRangeSlider.value;
          timeRangeValue.textContent = `Last ${value} Blocks`;
          updateTimeRange(value);
        });
      }
      
      // Start animation loop
      animate();
    }
    
    // Create blockchain visualization
    function createBlockchain() {
      // Clear existing blocks
      blocks.forEach(block => scene.remove(block));
      blocks = [];
      
      // Create blocks
      const numBlocks = parseInt(document.getElementById('timeRangeSlider').value) || 50;
      
      for (let i = 0; i < numBlocks; i++) {
        // Create block geometry and material
        const geometry = new THREE.BoxGeometry(6, 4, 2);
        
        // Determine block color based on "type" (randomly assign types for demonstration)
        let blockType;
        const rand = Math.random();
        if (rand < 0.4) blockType = 'solar';
        else if (rand < 0.7) blockType = 'wind';
        else blockType = 'hydro';
        
        let blockColor;
        switch(blockType) {
          case 'solar': blockColor = 0x00ffff; break;
          case 'wind': blockColor = 0x00ff00; break;
          case 'hydro': blockColor = 0xcc00ff; break;
          default: blockColor = 0xcccccc;
        }
        
        const material = new THREE.MeshPhongMaterial({ 
          color: blockColor,
          transparent: true,
          opacity: 0.8,
          specular: 0x111111,
          shininess: 30
        });
        
        // Create mesh
        const block = new THREE.Mesh(geometry, material);
        
        // Position blocks in a chain/spiral formation
        const angle = i * 0.2;
        const radius = 20 + i * 0.1;
        block.position.x = Math.cos(angle) * radius;
        block.position.y = Math.sin(angle) * radius;
        block.position.z = -i * 0.5;
        
        // Rotate to face center
        block.lookAt(0, 0, 0);
        
        // Add metadata
        block.userData = {
          blockNumber: 3487621 - i,
          blockType: blockType,
          transactions: Math.floor(Math.random() * 50) + 5,
          timestamp: new Date(Date.now() - i * 60000).toISOString(),
          hash: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        };
        
        // Add to scene
        scene.add(block);
        blocks.push(block);
        
        // Add connection line to previous block
        if (i > 0) {
          const points = [
            new THREE.Vector3(block.position.x, block.position.y, block.position.z),
            new THREE.Vector3(blocks[i-1].position.x, blocks[i-1].position.y, blocks[i-1].position.z)
          ];
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x666666,
            transparent: true,
            opacity: 0.5
          });
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
          blocks.push(line); // Add to blocks array to handle cleanup
        }
      }
    }
    
    // Handle window resize
    function onWindowResize() {
      camera.aspect = blockchain3DContainer.clientWidth / blockchain3DContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(blockchain3DContainer.clientWidth, blockchain3DContainer.clientHeight);
    }
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      if (isAnimating) {
        // Rotate the entire scene slightly
        scene.rotation.y += 0.001;
        scene.rotation.x += 0.0005;
      }
      
      renderer.render(scene, camera);
    }
    
    // Update visualization mode
    function updateVisualizationMode(mode) {
      // Clear existing blocks
      blocks.forEach(block => scene.remove(block));
      blocks = [];
      
      switch(mode) {
        case 'blocks':
          createBlockchain();
          break;
        case 'network':
          createNetworkTopology();
          break;
        case 'energy':
          createEnergyFlow();
          break;
      }
    }
    
    // Create network topology visualization
    function createNetworkTopology() {
      // Create nodes (validators/miners)
      const nodeCount = 50;
      const radius = 30;
      
      for (let i = 0; i < nodeCount; i++) {
        // Create node geometry
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        
        // Random node type
        const nodeType = Math.random() < 0.3 ? 'validator' : 'miner';
        const color = nodeType === 'validator' ? 0x00ffff : 0xffaa00;
        
        const material = new THREE.MeshPhongMaterial({
          color: color,
          shininess: 80
        });
        
        // Create node mesh
        const node = new THREE.Mesh(geometry, material);
        
        // Random position in sphere
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        
        node.position.x = radius * Math.sin(phi) * Math.cos(theta);
        node.position.y = radius * Math.sin(phi) * Math.sin(theta);
        node.position.z = radius * Math.cos(phi);
        
        // Add metadata
        node.userData = {
          nodeId: `node-${i}`,
          nodeType: nodeType,
          status: Math.random() < 0.9 ? 'active' : 'inactive'
        };
        
        scene.add(node);
        blocks.push(node);
      }
      
      // Add connections between nodes (simplified p2p network)
      const connections = nodeCount * 3; // Each node connects to ~3 others
      
      for (let i = 0; i < connections; i++) {
        const node1 = Math.floor(Math.random() * nodeCount);
        let node2 = Math.floor(Math.random() * nodeCount);
        
        // Ensure not connecting to self
        while (node1 === node2) {
          node2 = Math.floor(Math.random() * nodeCount);
        }
        
        // Get positions
        const pos1 = blocks[node1].position;
        const pos2 = blocks[node2].position;
        
        // Create line
        const points = [
          new THREE.Vector3(pos1.x, pos1.y, pos1.z),
          new THREE.Vector3(pos2.x, pos2.y, pos2.z)
        ];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x444444,
          transparent: true,
          opacity: 0.3
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        blocks.push(line);
      }
    }
    
    // Create energy flow visualization
    function createEnergyFlow() {
      // Create energy sources
      const sources = [
        { type: 'solar', position: new THREE.Vector3(-20, 15, 0), color: 0x00ffff, size: 3 },
        { type: 'wind', position: new THREE.Vector3(20, 10, 0), color: 0x00ff00, size: 2.5 },
        { type: 'hydro', position: new THREE.Vector3(0, -20, 0), color: 0xcc00ff, size: 2.8 }
      ];
      
      // Create energy consumers
      const consumers = [];
      for (let i = 0; i < 30; i++) {
        consumers.push({
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 20
          ),
          size: Math.random() * 1 + 0.5
        });
      }
      
      // Create nodes for sources
      sources.forEach(source => {
        const geometry = new THREE.SphereGeometry(source.size, 16, 16);
        const material = new THREE.MeshPhongMaterial({
          color: source.color,
          emissive: source.color,
          emissiveIntensity: 0.3
        });
        
        const node = new THREE.Mesh(geometry, material);
        node.position.copy(source.position);
        
        scene.add(node);
        blocks.push(node);
        
        // Add energy "aura" around source
        const auraGeo = new THREE.SphereGeometry(source.size * 1.5, 16, 16);
        const auraMaterial = new THREE.MeshBasicMaterial({
          color: source.color,
          transparent: true,
          opacity: 0.1
        });
        
        const aura = new THREE.Mesh(auraGeo, auraMaterial);
        aura.position.copy(source.position);
        scene.add(aura);
        blocks.push(aura);
      });
      
      // Create nodes for consumers
      consumers.forEach(consumer => {
        const geometry = new THREE.BoxGeometry(consumer.size, consumer.size, consumer.size);
        const material = new THREE.MeshPhongMaterial({
          color: 0x888888
        });
        
        const node = new THREE.Mesh(geometry, material);
        node.position.copy(consumer.position);
        
        scene.add(node);
        blocks.push(node);
      });
      
      // Create energy flow lines
      sources.forEach(source => {
        // Connect to several random consumers
        const connectionCount = Math.floor(Math.random() * 5) + 8;
        
        for (let i = 0; i < connectionCount; i++) {
          const consumer = consumers[Math.floor(Math.random() * consumers.length)];
          
          // Create curve for energy flow
          const points = [];
          const curvePoints = 50;
          
          for (let j = 0; j < curvePoints; j++) {
            const t = j / (curvePoints - 1);
            // Create smooth curve between source and consumer
            const pos = new THREE.Vector3().lerpVectors(source.position, consumer.position, t);
            
            // Add some randomness to middle of curve for natural flow
            if (t > 0.1 && t < 0.9) {
              pos.x += Math.sin(t * Math.PI) * (Math.random() - 0.5) * 5;
              pos.y += Math.sin(t * Math.PI) * (Math.random() - 0.5) * 5;
              pos.z += Math.sin(t * Math.PI) * (Math.random() - 0.5) * 5;
            }
            
            points.push(pos);
          }
          
          const curve = new THREE.CatmullRomCurve3(points);
          const curveGeometry = new THREE.TubeGeometry(curve, 50, 0.05, 8, false);
          const curveMaterial = new THREE.MeshBasicMaterial({
            color: source.color,
            transparent: true,
            opacity: 0.5
          });
          
          const tubeMesh = new THREE.Mesh(curveGeometry, curveMaterial);
          scene.add(tubeMesh);
          blocks.push(tubeMesh);
        }
      });
    }
    
    // Update time range
    function updateTimeRange(value) {
      // Update visualization with new block count
      updateVisualizationMode(document.getElementById('visualizationMode').value);
    }
    
    // Initialize 3D scene
    initBlockchainScene();
    
    // Click handler for blocks to show info
    blockchain3DContainer.addEventListener('click', onBlockClick);
    
    function onBlockClick(event) {
      // Convert mouse position to 3D coordinates
      const rect = blockchain3DContainer.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / blockchain3DContainer.clientWidth) * 2 - 1,
        -((event.clientY - rect.top) / blockchain3DContainer.clientHeight) * 2 + 1
      );
      
      // Raycaster to find intersected objects
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(blocks);
      
      if (intersects.length > 0) {
        const selectedBlock = intersects[0].object;
        
        // If the selected object has userData, show block info
        if (selectedBlock.userData && selectedBlock.userData.blockNumber) {
          showBlockInfo(selectedBlock.userData);
        }
      }
    }
    
    // Show block info in the panel
    function showBlockInfo(blockData) {
      const infoPanel = document.getElementById('blockInfoPanel');
      if (!infoPanel) return;
      
      // Show the panel
      infoPanel.style.display = 'block';
      
      // Populate with block data
      infoPanel.innerHTML = `
        <h3>Block #${blockData.blockNumber.toLocaleString()}</h3>
        <div class="info-row">
          <span class="info-label">Hash:</span>
          <span class="info-value">${blockData.hash.substring(0, 24)}...</span>
        </div>
        <div class="info-row">
          <span class="info-label">Timestamp:</span>
          <span class="info-value">${new Date(blockData.timestamp).toISOString().replace('T', ' ').substring(0, 19)} UTC</span>
        </div>
        <div class="info-row">
          <span class="info-label">Type:</span>
          <span class="info-value">${blockData.blockType.charAt(0).toUpperCase() + blockData.blockType.slice(1)} Energy</span>
        </div>
        <div class="info-row">
          <span class="info-label">Transactions:</span>
          <span class="info-value">${blockData.transactions}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Energy Volume:</span>
          <span class="info-value">${(Math.random() * 400 + 100).toFixed(1)} kWh</span>
        </div>
      `;
      
      // Add transaction list
      let txHTML = '<div class="transaction-list">';
      
      for (let i = 0; i < Math.min(blockData.transactions, 5); i++) {
        const hash = '0x' + Array(8).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        const amount = (Math.random() * 100 + 10).toFixed(1);
        
        txHTML += `
          <div class="tx-item">
            <span class="tx-hash">${hash}...</span>
            <span class="tx-type">${blockData.blockType}</span>
            <span class="tx-amount">${amount} kWh</span>
          </div>
        `;
      }
      
      txHTML += '</div>';
      infoPanel.innerHTML += txHTML;
    }
  }

  /* ===== Energy Calculator ===== */
  const energyCalculatorForm = document.getElementById('energyCalculatorForm');
  if (energyCalculatorForm) {
    // Budget range slider
    const budgetRange = document.getElementById('budgetRange');
    const budgetRangeValue = document.getElementById('budgetRangeValue');
    
    if (budgetRange && budgetRangeValue) {
      budgetRange.addEventListener('input', function() {
        budgetRangeValue.textContent = '€' + this.value;
      });
    }
    
    // Calculate button
    const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
      calculateButton.addEventListener('click', function() {
        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
        this.disabled = true;
        
        // Simulate calculation delay
        setTimeout(() => {
          calculateEnergyNeeds();
          this.innerHTML = '<i class="fas fa-calculator"></i> Calculate Solutions';
          this.disabled = false;
        }, 1000);
      });
    }
    
    // Function to calculate energy needs and display results
    function calculateEnergyNeeds() {
      // Get form values
      const propertyType = document.getElementById('propertyType').value;
      const propertySize = parseFloat(document.getElementById('propertySize').value);
      const occupants = parseInt(document.getElementById('occupants').value);
      const region = document.getElementById('region').value;
      
      // Get selected appliances
      const applianceCheckboxes = document.querySelectorAll('input[name="appliances"]:checked');
      const appliances = Array.from(applianceCheckboxes).map(cb => cb.value);
      
      // Calculate base energy consumption based on property type and size
      let baseConsumption = 0;
      switch(propertyType) {
        case 'apartment':
          baseConsumption = propertySize * 25;
          break;
        case 'house':
          baseConsumption = propertySize * 35;
          break;
        case 'office':
          baseConsumption = propertySize * 80;
          break;
        case 'commercial':
          baseConsumption = propertySize * 120;
          break;
      }
      
      // Add consumption for occupants
      baseConsumption += occupants * 500;
      
      // Adjust for region
      const regionFactors = {
        north: 1.2,  // Higher heating needs
        central: 1.0, // Base case
        south: 0.8,  // Lower heating, higher cooling
        eastern: 1.1  // Slightly higher energy needs
      };
      
      baseConsumption *= regionFactors[region] || 1.0;
      
      // Add for appliances
      const applianceConsumption = {
        heating: 2000,
        aircon: 1500,
        pool: 3000,
        ev: 3500
      };
      
      let totalApplianceConsumption = 0;
      appliances.forEach(app => {
        totalApplianceConsumption += applianceConsumption[app] || 0;
      });
      
      // Calculate total consumption
      const totalConsumption = Math.round(baseConsumption + totalApplianceConsumption);
      
      // Update the displayed consumption
      const consumptionElement = document.getElementById('estimatedConsumption');
      if (consumptionElement) {
        // Animate the change
        const oldValue = parseInt(consumptionElement.textContent.replace(/,/g, ''));
        animateNumberChange(consumptionElement, oldValue, totalConsumption);
      }
      
      // Create breakdown chart
      createConsumptionChart(baseConsumption, appliances, applianceConsumption);
      
      // Update recommended solutions
      updateRecommendedSolutions(totalConsumption, propertyType, region, appliances);
    }
    
    // Function to animate number change
    function animateNumberChange(element, startValue, endValue) {
      const duration = 1000; // ms
      const framesPerSecond = 60;
      const totalFrames = duration / 1000 * framesPerSecond;
      const valueChange = endValue - startValue;
      let currentFrame = 0;
      
      const animate = () => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        const currentValue = Math.round(startValue + valueChange * progress);
        
        element.textContent = currentValue.toLocaleString();
        
        if (currentFrame < totalFrames) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
    
    // Function to create consumption breakdown chart
    function createConsumptionChart(baseConsumption, appliances, applianceConsumption) {
      const canvasElement = document.getElementById('consumptionBreakdownChart');
      if (!canvasElement) return;
      
      // Clean up existing chart
      if (window.consumptionChart) {
        window.consumptionChart.destroy();
      }
      
      // Prepare data
      const chartData = {
        labels: ['Base Consumption'],
        datasets: [{
          data: [baseConsumption],
          backgroundColor: [
            'rgba(0, 255, 255, 0.7)'
          ],
          borderColor: [
            'rgba(0, 255, 255, 1)'
          ],
          borderWidth: 1
        }]
      };
      
      // Add appliance data if selected
      appliances.forEach(app => {
        const consumption = applianceConsumption[app] || 0;
        if (consumption > 0) {
          let label, color;
          
          switch(app) {
            case 'heating':
              label = 'Electric Heating';
              color = 'rgba(255, 99, 132, 0.7)';
              break;
            case 'aircon':
              label = 'Air Conditioning';
              color = 'rgba(54, 162, 235, 0.7)';
              break;
            case 'pool':
              label = 'Swimming Pool';
              color = 'rgba(75, 192, 192, 0.7)';
              break;
            case 'ev':
              label = 'Electric Vehicle';
              color = 'rgba(153, 102, 255, 0.7)';
              break;
            default:
              label = 'Other';
              color = 'rgba(255, 159, 64, 0.7)';
          }
          
          chartData.labels.push(label);
          chartData.datasets[0].data.push(consumption);
          chartData.datasets[0].backgroundColor.push(color);
          chartData.datasets[0].borderColor.push(color.replace('0.7', '1'));
        }
      });
      
      // Create chart
      const ctx = canvasElement.getContext('2d');
      window.consumptionChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'left',
              labels: {
                color: document.body.classList.contains('light-mode') ? '#333' : '#ddd',
                font: {
                  family: '"Source Code Pro", monospace',
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw;
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value.toLocaleString()} kWh (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
    
    // Function to update recommended solutions
    function updateRecommendedSolutions(consumption, propertyType, region, appliances) {
      const solutionsContainer = document.querySelector('.recommended-solutions');
      if (!solutionsContainer) return;
      
      // Calculate solar system size
      let solarSize = consumption / 1000; // rough kWp needed
      
      // Adjust for region efficiency
      const regionEfficiency = {
        north: 0.8,
        central: 1.0,
        south: 1.2,
        eastern: 0.9
      };
      
      solarSize = solarSize / (regionEfficiency[region] || 1.0);
      
      // Battery size calculation
      const batterySize = Math.round(consumption * 0.7 / 365); // daily consumption * storage factor
      
      // Update solar card
      const solarCard = solutionsContainer.querySelector('.solution-card.primary-solution');
      if (solarCard) {
        const solarDetails = solarCard.querySelectorAll('.detail-value');
        
        // System size
        solarDetails[0].textContent = `${solarSize.toFixed(1)} kWp`;
        
        // Production
        const annualProduction = Math.round(solarSize * 1100 * (regionEfficiency[region] || 1.0));
        solarDetails[1].textContent = `${annualProduction.toLocaleString()} kWh/year`;
        
        // Cost
        const solarCostLow = Math.round(solarSize * 1200);
        const solarCostHigh = Math.round(solarSize * 1400);
        solarDetails[2].textContent = `€${solarCostLow.toLocaleString()} - €${solarCostHigh.toLocaleString()}`;
        
        // Payback
        let payback;
        switch(region) {
          case 'south': payback = '4-6'; break;
          case 'central': payback = '6-8'; break;
          case 'eastern': payback = '7-9'; break;
          case 'north': payback = '8-10'; break;
          default: payback = '6-8';
        }
        solarDetails[3].textContent = `${payback} years`;
        
        // Match percentage
        const matchElement = solarCard.querySelector('.solution-match');
        if (matchElement) {
          const matchPercentage = Math.min(98, Math.max(60, Math.round(
            (annualProduction / consumption) * 100
          )));
          matchElement.textContent = `${matchPercentage}% Match`;
        }
      }
      
      // Update battery card
      const batteryCard = solutionsContainer.querySelectorAll('.solution-card')[1];
      if (batteryCard) {
        const batteryDetails = batteryCard.querySelectorAll('.detail-value');
        
        // Battery size
        batteryDetails[0].textContent = `${Math.round(batterySize)} kWh`;
        
        // Self-consumption increase
        batteryDetails[1].textContent = `+${Math.min(65, Math.max(25, Math.round(batterySize * 3.5)))}%`;
        
        // Cost
        const batteryCostLow = Math.round(batterySize * 700);
        const batteryCostHigh = Math.round(batterySize * 850);
        batteryDetails[2].textContent = `€${batteryCostLow.toLocaleString()} - €${batteryCostHigh.toLocaleString()}`;
        
        // Match percentage
        const matchElement = batteryCard.querySelector('.solution-match');
        if (matchElement) {
          const batteryMatch = Math.min(