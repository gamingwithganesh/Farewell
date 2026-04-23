document.addEventListener('DOMContentLoaded', () => {
    // Sparkle Background Generation
    const sparklesContainer = document.getElementById('sparkles');
    const createSparkle = () => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random position
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        
        // Random animation duration between 2s and 5s
        sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        sparklesContainer.appendChild(sparkle);
        
        // Remove sparkle after animation completes to keep DOM clean
        setTimeout(() => {
            sparkle.remove();
        }, 5000);
    };

    // Create initial sparkles
    for (let i = 0; i < 50; i++) {
        createSparkle();
    }

    // Continuously create sparkles
    setInterval(createSparkle, 200);

    // Video Player Controls
    const video = document.getElementById('main-video');
    const playPauseBtn = document.getElementById('play-pause');
    const muteBtn = document.getElementById('mute-unmute');
    const progressBar = document.querySelector('.progress-filled');
    const progressContainer = document.querySelector('.progress-bar');

    if (video) {
        // Toggle Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Toggle Mute
        muteBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });

        // Update Progress Bar
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });

        // Click on progress bar to seek
        progressContainer.addEventListener('click', (e) => {
            const seekTime = (e.offsetX / progressContainer.offsetWidth) * video.duration;
            video.currentTime = seekTime;
        });

        // Play video when "Join the Celebration" CTA is clicked
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
            });
        }
    }

    // Image Upload Functionality
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');
    const gallery = document.getElementById('gallery');

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                
                // Create new gallery item
                const newItem = document.createElement('div');
                newItem.classList.add('gallery-item');
                
                newItem.innerHTML = `
                    <img src="${imageUrl}" alt="New Upload">
                    <div class="overlay">
                        <p>Just Added! ✨</p>
                    </div>
                `;
                
                // Add new item to top of gallery
                gallery.insertBefore(newItem, gallery.firstChild);
                
                // Scroll to the new item smoothly
                newItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            reader.readAsDataURL(file);
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
