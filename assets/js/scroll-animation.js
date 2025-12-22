// Simplified CSS Keyframe Scroll Animation
(function() {
    const overlayWrapper = document.getElementById('overlayImageWrapper');
    const welcomeText = document.getElementById('welcomeText');
    const animationOverlay = document.getElementById('animationOverlay');
    const header = document.querySelector('header');
    
    const SCROLL_TRIGGER_START = 5;
    const SCROLL_TRIGGER_END = 500; // Animation completes, THEN normal scroll shows rest of hero and dog cards
    
    let animationComplete = false;
    
    function handleScroll() {
        if (animationComplete) return;
        
        const scrollY = window.scrollY;
        
        // Before animation starts
        if (scrollY < SCROLL_TRIGGER_START) {
            overlayWrapper.style.animationPlayState = 'paused';
            overlayWrapper.style.animationDelay = '0s';
            welcomeText.classList.remove('hidden');
            if (header) header.style.transform = 'translateY(0)';
            return;
        }
        
        // Calculate progress (0 to 1)
        const progress = Math.min((scrollY - SCROLL_TRIGGER_START) / (SCROLL_TRIGGER_END - SCROLL_TRIGGER_START), 1);
        
        // Apply the animation with calculated time position
        overlayWrapper.style.animation = 'heroShrink 1s linear forwards';
        overlayWrapper.style.animationDelay = `-${progress}s`; // Scrub to position
        overlayWrapper.style.animationPlayState = 'paused';
        
        // Hide welcome text early
        if (progress > 0.05) {
            welcomeText.classList.add('hidden');
        }
        
        // Hide header during middle of animation
        if (header) {
            if (progress > 0.1 && progress < 0.9) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease-out';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        // Animation complete
        if (progress >= 1) {
            animationComplete = true;
            animationOverlay.classList.add('hidden');
            if (header) header.style.transform = 'translateY(0)';
        }
    }
    
    // Throttled scroll handler
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
    
    // Initialize
    handleScroll();
    
    // Handle page refresh
    window.addEventListener('load', function() {
        if (window.scrollY > SCROLL_TRIGGER_END) {
            animationComplete = true;
            animationOverlay.classList.add('hidden');
            if (header) header.style.transform = 'translateY(0)';
        }
    });
})();
