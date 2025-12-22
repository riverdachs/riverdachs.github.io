<<<<<<< HEAD
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
=======
// Simplified CSS Keyframe Scroll Animation
(function() {
    const overlayWrapper = document.getElementById('overlayImageWrapper');
    const welcomeText = document.getElementById('welcomeText');
    const animationOverlay = document.getElementById('animationOverlay');
    const header = document.querySelector('header');
    const scrollDriver = document.getElementById('scroll-driver');
    const sloganOverlay = document.getElementById('sloganOverlay');
    
    const SCROLL_TRIGGER_START = 50;
    const SCROLL_TRIGGER_END = 1000;
    
    let animationComplete = false;
    
    function handleScroll() {
        if (animationComplete) return;
        
        const scrollY = window.scrollY;
        
        if (scrollY < SCROLL_TRIGGER_START) {
            overlayWrapper.style.animationPlayState = 'paused';
            overlayWrapper.style.animationDelay = '0s';
            welcomeText.classList.remove('hidden');
            if (header) header.style.transform = 'translateY(0)';
            return;
        }
        
        const progress = Math.min((scrollY - SCROLL_TRIGGER_START) / (SCROLL_TRIGGER_END - SCROLL_TRIGGER_START), 1);
        
        // DEBUG LOGGING
        console.log('Scroll:', scrollY, 'Progress:', (progress * 100).toFixed(1) + '%');
        
        // Fade in slogan when sides start shrinking (24%)
        if (sloganOverlay) {
            if (progress >= 0.24) {
                const sloganProgress = Math.min((progress - 0.24) / 0.1, 1); // Fade in over 10%
                sloganOverlay.style.opacity = sloganProgress;
            } else {
                sloganOverlay.style.opacity = '0';
            }
        }
        
        overlayWrapper.style.animation = 'heroShrink 1s linear forwards';
        overlayWrapper.style.animationDelay = `-${progress}s`;
        overlayWrapper.style.animationPlayState = 'paused';
        
        if (progress > 0.05) {
            welcomeText.classList.add('hidden');
        }
        
        if (header) {
            if (progress > 0.1 && progress < 0.9) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease-out';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        if (progress >= 1) {
            console.log('===== ANIMATION COMPLETE - MOVING TO LANDING ZONES =====');
            animationComplete = true;
            
            const landingZone = document.getElementById('heroLandingZone');
            const sloganLandingZone = document.getElementById('sloganLandingZone');
            
            // Move slogan overlay into its landing zone
            if (sloganLandingZone && sloganOverlay) {
                sloganLandingZone.appendChild(sloganOverlay);
                sloganOverlay.style.position = 'relative';
                sloganOverlay.style.top = 'auto';
                sloganOverlay.style.left = 'auto';
                sloganOverlay.style.transform = 'none';
                sloganOverlay.style.opacity = '1';
                sloganOverlay.style.transition = 'none';
                sloganOverlay.style.zIndex = 'auto';
            }
            
            // Move hero overlay into its landing zone
            if (landingZone) {
                landingZone.appendChild(overlayWrapper);
                
                overlayWrapper.style.position = 'relative';
                overlayWrapper.style.top = 'auto';
                overlayWrapper.style.left = 'auto';
                overlayWrapper.style.transform = 'none';
                overlayWrapper.style.animation = 'none';
                overlayWrapper.style.width = '100%';
                overlayWrapper.style.maxWidth = '100%';
                overlayWrapper.style.height = '800px';
                overlayWrapper.style.margin = '0';
                overlayWrapper.style.borderRadius = '12px';
                overlayWrapper.style.zIndex = 'auto';
                
                // Hide the now-empty animation overlay container
                animationOverlay.style.display = 'none';
            }
            
            // Remove scroll driver - now page scrolls normally
            if (scrollDriver) scrollDriver.style.display = 'none';
            
            if (header) header.style.transform = 'translateY(0)';
        }
    }
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    handleScroll();
    
    window.addEventListener('load', function() {
        if (window.scrollY > SCROLL_TRIGGER_END) {
            animationComplete = true;
            
            const landingZone = document.getElementById('heroLandingZone');
            const sloganLandingZone = document.getElementById('sloganLandingZone');
            
            if (sloganLandingZone && sloganOverlay) {
                sloganLandingZone.appendChild(sloganOverlay);
                sloganOverlay.style.position = 'relative';
                sloganOverlay.style.opacity = '1';
            }
            
            if (landingZone) {
                landingZone.appendChild(overlayWrapper);
                overlayWrapper.style.position = 'relative';
                overlayWrapper.style.animation = 'none';
                animationOverlay.style.display = 'none';
            }
            
            if (scrollDriver) scrollDriver.style.display = 'none';
            if (header) header.style.transform = 'translateY(0)';
>>>>>>> 375f941 (Update website content)
        }
    });
})();
