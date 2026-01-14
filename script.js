// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    createParticles();
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Close mobile menu if open
                mainNav.classList.remove('active');
                
                // Scroll to section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            
            // If it's a register button, open modal
            if (this.classList.contains('register-btn')) {
                e.preventDefault();
                openRegistrationModal();
            }
        });
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
        }
    });
    
    // Registration modal
    const registrationModal = document.getElementById('registration-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const registerButtons = document.querySelectorAll('.option-btn, .register-btn');
    const registrationForm = document.getElementById('registration-form');
    
    function openRegistrationModal() {
        registrationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeRegistrationModal() {
        registrationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeModalBtn.addEventListener('click', closeRegistrationModal);
    
    registerButtons.forEach(btn => {
        btn.addEventListener('click', openRegistrationModal);
    });
    
    // Close modal when clicking outside
    registrationModal.addEventListener('click', function(e) {
        if (e.target === registrationModal) {
            closeRegistrationModal();
        }
    });
    
    // Handle form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const regType = document.getElementById('reg-type').value;
        const fullName = document.getElementById('full-name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        
        if (!regType || !fullName || !mobile || !email) {
            alert('Please fill all required fields');
            return;
        }
        
        // Calculate fee based on registration type
        let fee = 0;
        let typeText = '';
        
        if (regType === 'business') {
            fee = 1768.82;
            typeText = 'Business';
        } else {
            fee = 588.82;
            typeText = 'Customer';
        }
        
        // Show confirmation (in a real app, this would redirect to payment)
        const confirmMsg = `Confirm ${typeText} Registration?\n\nName: ${fullName}\nMobile: ${mobile}\nEmail: ${email}\n\nTotal Fee: ₹${fee.toFixed(2)} (incl. GST)\nValidity: 1 Year`;
        
        if (confirm(confirmMsg)) {
            alert('Registration successful! Redirecting to payment...');
            closeRegistrationModal();
            registrationForm.reset();
        }
    });
    
    // Presentation slides - FIXED VERSION
    const totalSlides = 29; // Total 29 slides
    let currentSlide = 1;
    const currentSlideImg = document.getElementById('current-slide');
    const slideTitle = document.getElementById('slide-title');
    const slideDescription = document.getElementById('slide-description');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    
    // Preload images function
    function preloadImages() {
        console.log('Preloading images...');
        for (let i = 1; i <= totalSlides; i++) {
            const img = new Image();
            img.src = `ppt_image_${i}.jpg`;
            img.onload = function() {
                console.log(`Preloaded image ${i}: ${img.src}`);
            };
            img.onerror = function() {
                console.error(`Failed to preload image ${i}: ppt_image_${i}.jpg`);
            };
        }
    }
    
    // Call preload function
    preloadImages();
    
    // Create thumbnails
    function createThumbnails() {
        console.log('Creating thumbnails...');
        thumbnailContainer.innerHTML = '';
        
        for (let i = 1; i <= totalSlides; i++) {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.slide = i;
            
            // Try to load actual image
            const img = document.createElement('img');
            img.src = `ppt_image_${i}.jpg`;
            img.alt = `Slide ${i}`;
            
            // Add error handling for thumbnails
            img.onerror = function() {
                console.error(`Thumbnail image ${i} not found: ppt_image_${i}.jpg`);
                // Create placeholder for thumbnail
                img.src = `https://via.placeholder.com/80x60/1a1a2e/00ff9d?text=${i}`;
            };
            
            thumbnail.appendChild(img);
            
            // Add click event
            thumbnail.addEventListener('click', () => {
                console.log(`Thumbnail clicked: Slide ${i}`);
                goToSlide(i);
            });
            
            thumbnailContainer.appendChild(thumbnail);
        }
        
        updateThumbnails();
        console.log('Thumbnails created successfully');
    }
    
    // Update slide - FIXED VERSION
    function updateSlide() {
        console.log(`Updating to slide ${currentSlide}`);
        
        // Update image with actual PPT images
        const imageName = `ppt_image_${currentSlide}.jpg`;
        console.log(`Attempting to load image: ${imageName}`);
        
        // Force reload by adding timestamp to prevent caching issues
        const timestamp = new Date().getTime();
        currentSlideImg.src = `${imageName}?t=${timestamp}`;
        currentSlideImg.alt = `Presentation Slide ${currentSlide}`;
        
        // Add comprehensive error handling
        currentSlideImg.onerror = function() {
            console.error(`Image load failed: ${imageName}`);
            console.log('Trying alternative loading methods...');
            
            // Try without timestamp
            currentSlideImg.src = imageName;
            
            // If still fails, try placeholder
            currentSlideImg.onerror = function() {
                console.error('All attempts failed, using placeholder');
                currentSlideImg.src = `https://via.placeholder.com/800x500/0a0a1a/00ff9d?text=Slide+${currentSlide}`;
                slideTitle.textContent = `Slide ${currentSlide}`;
                slideDescription.textContent = `Image: ${imageName} not found. Check file name and location.`;
            };
        };
        
        currentSlideImg.onload = function() {
            console.log(`Successfully loaded: ${imageName}`);
        };
        
        // Update title and description based on slide number
        const slideData = getSlideData(currentSlide);
        slideTitle.textContent = slideData.title;
        slideDescription.textContent = slideData.description;
        
        // Update progress
        const progressPercent = (currentSlide / totalSlides) * 100;
        progressFill.style.width = `${progressPercent}%`;
        progressText.textContent = `${currentSlide}/${totalSlides}`;
        
        // Update thumbnails
        updateThumbnails();
    }
    
    // Get slide title and description
    function getSlideData(slideNumber) {
        const slideData = {
            1: { title: 'Global Business Introduction', description: 'Revolutionizing local business and customer connections' },
            2: { title: 'Business Registration', description: 'How businesses can join the platform' },
            3: { title: 'Customer Benefits', description: 'Exclusive benefits for registered customers' },
            4: { title: 'Coupon System', description: 'How the coupon generation and usage works' },
            5: { title: 'Special Events', description: 'Birthday and anniversary surprises' },
            6: { title: 'Location Based Discovery', description: 'Find businesses near you' },
            7: { title: 'Offer System', description: 'Daily offers and discounts' },
            8: { title: 'Business Dashboard', description: 'Manage your business profile' },
            9: { title: 'Customer Dashboard', description: 'Track your coupons and benefits' },
            10: { title: 'Mobile Integration', description: 'Access platform on mobile devices' },
            11: { title: 'Revenue Model', description: 'How Global Business generates revenue' },
            12: { title: 'Market Analysis', description: 'Target market and competition' },
            13: { title: 'Growth Strategy', description: 'Expansion plans and roadmap' },
            14: { title: 'Team Introduction', description: 'Meet our team' },
            15: { title: 'Technology Stack', description: 'Platform architecture and technology' },
            16: { title: 'Security Features', description: 'Data protection and security' },
            17: { title: 'Customer Support', description: '24/7 support system' },
            18: { title: 'Partnerships', description: 'Strategic business partnerships' },
            19: { title: 'Success Stories', description: 'Case studies and testimonials' },
            20: { title: 'Future Roadmap', description: 'Upcoming features and updates' },
            21: { title: 'Investor Opportunities', description: 'Investment and growth potential' },
            22: { title: 'Marketing Strategy', description: 'How we reach businesses and customers' },
            23: { title: 'Social Impact', description: 'Community benefits and social responsibility' },
            24: { title: 'FAQ Section', description: 'Frequently asked questions' },
            25: { title: 'Terms & Conditions', description: 'Platform policies and agreements' },
            26: { title: 'Pricing Structure', description: 'Business and customer activation fees' },
            27: { title: 'Implementation Timeline', description: 'Rollout plan and schedule' },
            28: { title: 'Contact Information', description: 'Get in touch with us' },
            29: { title: 'Call to Action', description: 'Join Global Business today!' }
        };
        
        return slideData[slideNumber] || { 
            title: `Slide ${slideNumber}`, 
            description: 'Global Business Presentation' 
        };
    }
    
    // Update thumbnail states
    function updateThumbnails() {
        console.log(`Updating thumbnails, current slide: ${currentSlide}`);
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
            
            if (parseInt(thumb.dataset.slide) === currentSlide) {
                thumb.classList.add('active');
                
                // Scroll thumbnail into view
                thumb.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        });
    }
    
    // Navigate to specific slide
    function goToSlide(slideNumber) {
        console.log(`Going to slide: ${slideNumber}`);
        if (slideNumber < 1) slideNumber = 1;
        if (slideNumber > totalSlides) slideNumber = totalSlides;
        
        currentSlide = slideNumber;
        updateSlide();
    }
    
    // Event listeners for slide navigation
    prevSlideBtn.addEventListener('click', () => {
        console.log('Previous button clicked');
        goToSlide(currentSlide - 1);
    });
    
    nextSlideBtn.addEventListener('click', () => {
        console.log('Next button clicked');
        goToSlide(currentSlide + 1);
    });
    
    // Keyboard navigation for slides
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            goToSlide(currentSlide + 1);
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            goToSlide(currentSlide - 1);
        }
    }
    
    // Initialize presentation
    createThumbnails();
    updateSlide();
    
    // Debug: Log current working directory
    console.log('Current URL:', window.location.href);
    console.log('Script loaded successfully');
    
    // Create animated particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            const color = getRandomColor();
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS for particles
        const style = document.createElement('style');
        style.textContent = `
            .particle {
                position: absolute;
                border-radius: 50%;
                opacity: 0.7;
                animation: floatParticle linear infinite;
            }
            
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                }
                90% {
                    opacity: 0.7;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Helper function for random colors
    function getRandomColor() {
        const colors = ['#00ff9d', '#9d4edd', '#ff0055', '#00ccff', '#ff9900'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.count);
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(10, 10, 26, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Initialize scroll effects for nav links
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        // Check each section
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Force image reload on page refresh
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('lastSlide', currentSlide);
    });
    
    window.addEventListener('load', function() {
        const lastSlide = localStorage.getItem('lastSlide');
        if (lastSlide) {
            goToSlide(parseInt(lastSlide));
        }
    });
});