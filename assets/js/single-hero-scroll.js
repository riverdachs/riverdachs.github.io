// Single Hero Scroll Animation
// Image starts fixed full screen, shrinks during scroll, then becomes static part of page
(function() {
    const heroImage = document.getElementById('heroImage');
    const welcomeText = document.getElementById('welcomeText');
    
    const ANIMATION_SCROLL = 600; // Total scroll distance for animation
    let animationComplete = false;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / ANIMATION_SCROLL, 1);
        
        console.log('Scroll:', scrollY, 'Progress:', (progress * 100).toFixed(1) + '%');
        
        // Hide welcome text early
        if (progress > 0.05) {
            welcomeText.style.opacity = '0';
        } else {
            welcomeText.style.opacity = '1';
        }
        
        // Animation complete - convert to static
        if (progress >= 1 && !animationComplete) {
            console.log('ANIMATION COMPLETE - Hero now static');
            animationComplete = true;
            heroImage.classList.add('animation-complete');
            return;
        }
        
        // Don't animate if already complete
        if (animationComplete) return;
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Phase 1 (0-27%): Shrink from top, width stays full
        // Phase 2 (27-100%): Top locked, shrink from sides
        
        if (progress <= 0.27) {
            // Phase 1: Top shrinking
            const phase1 = progress / 0.27;
            const currentTop = 0 + (130 * phase1); // Move from 0 to 130px
            const currentHeight = viewportHeight - ((viewportHeight - 800) * phase1);
            
            heroImage.style.position = 'fixed';
            heroImage.style.top = currentTop + 'px';
            heroImage.style.left = '0';
            heroImage.style.width = '100vw';
            heroImage.style.height = currentHeight + 'px';
            heroImage.style.transform = 'none';
            heroImage.style.borderRadius = '0';
            
        } else {
            // Phase 2: Sides shrinking
            const phase2 = (progress - 0.27) / 0.73;
            const currentWidth = viewportWidth - ((viewportWidth - 1400) * phase2);
            const finalWidth = Math.max(currentWidth, 1400);
            
            heroImage.style.position = 'fixed';
            heroImage.style.top = '130px';
            heroImage.style.height = '800px';
            heroImage.style.width = finalWidth + 'px';
            heroImage.style.left = '50%';
            heroImage.style.transform = 'translateX(-50%)';
            
            // Add rounded corners as we approach the end
            if (progress > 0.9) {
                const cornerProgress = (progress - 0.9) / 0.1;
                heroImage.style.borderRadius = (12 * cornerProgress) + 'px';
            }
        }
    }
    
    window.addEventListener('scroll', function() {
        requestAnimationFrame(handleScroll);
    });
    
    // Initialize
    handleScroll();
    
    // Handle page refresh
    window.addEventListener('load', function() {
        if (window.scrollY >= ANIMATION_SCROLL) {
            animationComplete = true;
            heroImage.classList.add('animation-complete');
        } else {
            handleScroll();
        }
    });
})();
