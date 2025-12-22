// Scroll Animation for Hero Image
(function() {
    const overlayWrapper = document.getElementById('overlayImageWrapper');
    const welcomeText = document.getElementById('welcomeText');
    const animationOverlay = document.getElementById('animationOverlay');
    const header = document.querySelector('header');
    
    // Configuration
    const HEADER_HEIGHT = 82; // Account for header + brown line
    const BUFFER_FROM_HEADER = 50;
    const FINAL_HERO_WIDTH = 1400;
    const FINAL_HERO_HEIGHT = 800; // Match your actual hero-image height from CSS
    const SCROLL_DISTANCE = 900; // Extended to ensure overlay covers static hero longer
    
    let animationComplete = false;
    let ticking = false;
    
    function updateAnimation() {
        if (animationComplete) return;
        
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / SCROLL_DISTANCE, 1);
        
        // Hide welcome text very early (0-5%)
        if (progress > 0.05) {
            welcomeText.classList.add('hidden');
        } else {
            welcomeText.classList.remove('hidden');
        }
        
        // Hide header during main animation (10-85%) to make room
        if (header) {
            if (progress > 0.1 && progress < 0.85) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease-out';
            } else if (progress >= 0.85) {
                header.style.transform = 'translateY(0)';
            }
        }
        
        if (progress < 1) {
            const startWidth = window.innerWidth;
            const startHeight = window.innerHeight - HEADER_HEIGHT;
            
            // Phase 1 (0-55%): Shrink from TOP only
            // - Height shrinks to reveal slogan
            // - Width stays FULL to hide static hero completely
            // - Extended phase to ensure coverage
            
            // Phase 2 (55-100%): Shrink from SIDES only  
            // - Top and height LOCKED
            // - Width shrinks to final
            
            let currentTop, currentHeight, currentWidth;
            
            if (progress <= 0.55) {
                // Phase 1: Top shrinking (first 55%)
                const phase1Progress = progress / 0.55;
                
                currentTop = HEADER_HEIGHT + (BUFFER_FROM_HEADER * phase1Progress);
                
                // Shrink height from full viewport to final hero height
                currentHeight = startHeight - (startHeight - FINAL_HERO_HEIGHT) * phase1Progress;
                
                // Width stays FULL - this is KEY to hiding static hero
                currentWidth = startWidth;
                
            } else {
                // Phase 2: Sides shrinking (remaining 45%)
                const phase2Progress = (progress - 0.55) / 0.45;
                
                currentTop = HEADER_HEIGHT + BUFFER_FROM_HEADER;
                currentHeight = FINAL_HERO_HEIGHT;
                
                // Shrink width to final
                const calculatedWidth = startWidth - (startWidth - FINAL_HERO_WIDTH) * phase2Progress;
                currentWidth = Math.max(calculatedWidth, FINAL_HERO_WIDTH);
            }
            
            // Apply transformations
            overlayWrapper.style.top = currentTop + 'px';
            overlayWrapper.style.height = currentHeight + 'px';
            overlayWrapper.style.width = currentWidth + 'px';
            
        } else {
            // Animation complete
            animationComplete = true;
            animationOverlay.classList.add('hidden');
            
            if (header) {
                header.style.transform = 'translateY(0)';
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking && !animationComplete) {
            requestAnimationFrame(updateAnimation);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    updateAnimation();
    
    // Handle page refresh/back button
    window.addEventListener('load', function() {
        if (window.scrollY > SCROLL_DISTANCE) {
            animationComplete = true;
            animationOverlay.classList.add('hidden');
            if (header) {
                header.style.transform = 'translateY(0)';
            }
        }
    });
})();
