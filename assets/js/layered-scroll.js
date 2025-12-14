// Layered Scroll Animation - COMPLETE FIX
// Three layers: Animation, Persistent Slogan, Static Page

(function() {
    const animationContainer = document.getElementById('animationContainer');
    const shrinkingImage = document.getElementById('shrinkingImage');
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const persistentSlogan = document.getElementById('persistentSlogan');
    const staticPage = document.getElementById('staticPage');
    const staticHero = document.querySelector('.hero');
    
    let animationComplete = false;
    let ticking = false;
    
    // Add animation-mode class to static hero to prevent centering during animation
    if (staticHero) {
        staticHero.classList.add('animation-mode');
    }
    
    function updateAnimation() {
        if (animationComplete) return;
        
        const scrollY = window.scrollY;
        const containerHeight = animationContainer.offsetHeight;
        
        // Progress through animation container (0 to 1)
        const progress = Math.min(scrollY / containerHeight, 1);
        
        // Hide welcome text very early (5%)
        if (progress > 0.05) {
            welcomeOverlay.style.opacity = '0';
        } else {
            welcomeOverlay.style.opacity = '1';
        }
        
        // Calculate shrinking dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const headerHeight = 100; // Below header
        const finalTop = 180; // Final position - adjusted for better slogan spacing
        const finalWidth = 1400; // EXACT width to match static hero
        const finalHeight = 800; // EXACT height to match static hero
        
        if (progress < 1) {
            // Phase 1 (0-60%): Shrink from TOP, keep FULL WIDTH
            // Phase 2 (60-100%): TOP locked, shrink SIDES to EXACT final width
            // Changed from 75/25 to 60/40 for smoother side shrinking
            
            let currentTop, currentHeight, currentWidth;
            
            if (progress <= 0.6) {
                // Phase 1: Top shrinking - keep full width to hide static hero
                const phase1 = progress / 0.6;
                currentTop = headerHeight + ((finalTop - headerHeight) * phase1);
                currentHeight = (viewportHeight - headerHeight) - ((viewportHeight - headerHeight - finalHeight) * phase1);
                currentWidth = viewportWidth; // FULL WIDTH - completely hides static content
            } else {
                // Phase 2: Sides shrinking to EXACT final width
                const phase2 = (progress - 0.6) / 0.4;
                currentTop = finalTop;
                currentHeight = finalHeight;
                // Shrink to EXACTLY 1400px
                currentWidth = viewportWidth - ((viewportWidth - finalWidth) * phase2);
                currentWidth = Math.max(currentWidth, finalWidth);
                
                // Force exact final width at very end
                if (progress > 0.99) {
                    currentWidth = finalWidth;
                    currentTop = finalTop;
                    currentHeight = finalHeight;
                }
            }
            
            // Show persistent slogan and position it in the center of whitespace
            const whitespace = currentTop - headerHeight;
            const sloganHeight = 60; // Approximate height of slogan text
            
            if (whitespace >= sloganHeight + 20 && persistentSlogan) {
                // Enough space - show slogan centered in whitespace
                persistentSlogan.classList.add('visible');
                
                // Position slogan in CENTER of whitespace
                // headerHeight + (whitespace / 2) - (sloganHeight / 2)
                const sloganTop = headerHeight + (whitespace / 2) - (sloganHeight / 2);
                persistentSlogan.style.top = sloganTop + 'px';
                
            } else if (persistentSlogan) {
                persistentSlogan.classList.remove('visible');
            }
            
            // Apply transformations to shrinking image
            shrinkingImage.style.top = currentTop + 'px';
            shrinkingImage.style.height = currentHeight + 'px';
            shrinkingImage.style.width = currentWidth + 'px';
            
        } else {
            // Animation complete - transition to static page
            animationComplete = true;
            
            // Hide animation container
            animationContainer.style.display = 'none';
            
            // Remove animation-mode from static hero (allow normal centering)
            if (staticHero) {
                staticHero.classList.remove('animation-mode');
            }
            
            // Keep persistent slogan visible and position at top of static page
            if (persistentSlogan) {
                persistentSlogan.classList.add('visible');
                persistentSlogan.style.position = 'absolute';
                persistentSlogan.style.top = '20px'; // Just a bit below header in static page
            }
            
            // Show static page at top
            staticPage.style.marginTop = '0';
            window.scrollTo(0, 0);
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateAnimation);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    updateAnimation();
    
    // Handle page refresh / back button
    window.addEventListener('load', function() {
        const containerHeight = animationContainer.offsetHeight;
        if (window.scrollY >= containerHeight) {
            animationComplete = true;
            animationContainer.style.display = 'none';
            staticPage.style.marginTop = '0';
            if (staticHero) {
                staticHero.classList.remove('animation-mode');
            }
            if (persistentSlogan) {
                persistentSlogan.classList.add('visible');
                persistentSlogan.style.position = 'absolute';
                persistentSlogan.style.top = '20px';
            }
        }
    });
})();
