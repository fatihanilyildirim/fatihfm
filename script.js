document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.play-btn');
    const playIcon = document.querySelector('.play-icon');
    const progressFill = document.querySelector('.progress-fill');
    const progressHandle = document.querySelector('.progress-handle');
    const volumeText = document.querySelector('.volume-text');
    const equalizerBars = document.querySelectorAll('.equalizer .bar');
    const playerBackground = document.querySelector('.player-background');
    
    let isPlaying = false;
    let currentVolume = 90;
    
    // Play/Pause functionality
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playIcon.textContent = '⏸';
            playBtn.style.background = '#dc2626';
            playIcon.style.color = 'white';
            
            // Start equalizer animation
            equalizerBars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
            
            // Enhanced red glow effect when playing
            playerBackground.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.6)';
            
        } else {
            playIcon.textContent = '▶';
            playBtn.style.background = 'white';
            playIcon.style.color = '#000';
            
            // Pause equalizer animation
            equalizerBars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
            
            // Remove enhanced glow
            playerBackground.style.boxShadow = 'none';
        }
    });
    
    // Volume control
    const volumeBtn = document.querySelector('.volume-btn');
    volumeBtn.addEventListener('click', function() {
        if (currentVolume > 0) {
            currentVolume = 0;
            volumeText.textContent = '0%';
            volumeBtn.textContent = '🔇';
            progressFill.style.width = '0%';
            progressHandle.style.right = '100%';
        } else {
            currentVolume = 90;
            volumeText.textContent = '90%';
            volumeBtn.textContent = '🔊';
            progressFill.style.width = '90%';
            progressHandle.style.right = '0%';
        }
    });
    
    // Progress bar interaction
    const progressBar = document.querySelector('.progress-bar');
    progressBar.addEventListener('click', function(e) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        
        progressFill.style.width = percentage + '%';
        progressHandle.style.right = (100 - percentage) + '%';
        volumeText.textContent = Math.round(percentage) + '%';
        currentVolume = Math.round(percentage);
    });
    
    // Background image rotation
    const backgrounds = [
        'images/bg1.jpg',
        'images/bg2.jpg', 
        'images/bg3.jpg'
    ];

    
    let currentBgIndex = 0;
    
    function rotateBackground() {
        currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
        document.querySelector('.left-section').style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;
    }
    
    // Change background every 5 seconds
    setInterval(rotateBackground, 5000);
    
    // Add pulsing effect to live indicator
    const liveIndicator = document.querySelector('.live-indicator');
    setInterval(function() {
        liveIndicator.style.opacity = liveIndicator.style.opacity === '0.5' ? '1' : '0.5';
    }, 1000);
    
    // Add hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add floating animation to player container
    const playerContainer = document.querySelector('.player-container');
    let floatDirection = 1;
    let floatPosition = 0;
    
    function floatAnimation() {
        floatPosition += floatDirection * 0.5;
        if (floatPosition > 5 || floatPosition < -5) {
            floatDirection *= -1;
        }
        playerContainer.style.transform = `translateY(${floatPosition}px)`;
        requestAnimationFrame(floatAnimation);
    }
    
    floatAnimation();
    
    // Add red wave effect when playing
    function createRedWave() {
        if (!isPlaying) return;
        
        const wave = document.createElement('div');
        wave.style.position = 'absolute';
        wave.style.width = '100%';
        wave.style.height = '100%';
        wave.style.background = 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)';
        wave.style.borderRadius = '50%';
        wave.style.animation = 'waveExpand 2s ease-out forwards';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '0';
        
        playerBackground.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 2000);
    }
    
    // Add wave animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes waveExpand {
            0% {
                transform: scale(0);
                opacity: 0.8;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create waves when playing
    setInterval(createRedWave, 1500);
});

