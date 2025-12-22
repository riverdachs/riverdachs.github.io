// Simplified CSS Keyframe Scroll Animation
(function() {
    const overlayWrapper = document.getElementById('overlayImageWrapper');
    const welcomeText = document.getElementById('welcomeText');
    const animationOverlay = document.getElementById('animationOverlay');
    const header = document.querySelector('header');
    
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
            animationComplete = true;
            animationOverlay.classList.add('hidden');
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
            animationOverlay.classList.add('hidden');
            if (header) header.style.transform = 'translateY(0)';
        }
    });
})();
