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
            console.log('===== ANIMATION COMPLETE - MOVING TO LANDING ZONE =====');
            animationComplete = true;
            
            const landingZone = document.getElementById('heroLandingZone');
            
            if (landingZone) {
                // Move overlay wrapper into the landing zone
                landingZone.appendChild(overlayWrapper);
                
                // Convert from fixed to relative positioning
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
            if (landingZone) {
                landingZone.appendChild(overlayWrapper);
                overlayWrapper.style.position = 'relative';
                overlayWrapper.style.animation = 'none';
                animationOverlay.style.display = 'none';
            }
            
            if (scrollDriver) scrollDriver.style.display = 'none';
            if (header) header.style.transform = 'translateY(0)';
        }
    });
})();
