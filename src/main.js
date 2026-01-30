import Navigo from 'navigo';

const router = new Navigo('/');
const appContent = document.getElementById('app-content');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

const typeWriter = (element, texts, speed = 100, pause = 2000) => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; type(); }, pause);
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, isDeleting ? speed / 2 : speed);
    };
    type();
};

const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => observer.observe(el));
};

const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = String(target).includes('.');
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = isDecimal ? start.toFixed(2) : Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    updateCounter();
};

const renderHomePage = () => {
    const html = `
        <!-- Hero Section -->
        <section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary via-[#1e2952] to-[#0f1629] z-0"></div>
            <div class="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
            
            <!-- Hero Content -->
            <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <!-- Status Badge -->
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in">
                    <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span class="text-white/70 text-sm">Available for opportunities</span>
                </div>
                
                <!-- Name -->
                <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style="animation-delay: 0.1s;">
                    <span class="text-white">Hi, I'm </span>
                    <span class="text-accent">Nghia</span>
                </h1>
                
                <!-- Role -->
                <div class="text-xl md:text-2xl mb-6 animate-fade-in" style="animation-delay: 0.2s;">
                    <span class="text-white/50">I'm a </span>
                    <span id="typing-role" class="text-accent font-medium"></span>
                    <span class="text-accent">|</span>
                </div>
                
                <!-- Bio -->
                <p class="text-white/50 max-w-xl mx-auto mb-10 animate-fade-in" style="animation-delay: 0.3s;">
                    Third-year IT student at PTIT. Passionate about creating clean, functional digital experiences.
                </p>
                
                <!-- Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style="animation-delay: 0.4s;">
                    <a href="/projects" data-navigo class="px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all">
                        View My Work
                    </a>
                    <a href="/contact" data-navigo class="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                        Get In Touch
                    </a>
                </div>
                
                <!-- Stats -->
                <div class="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in" style="animation-delay: 0.5s;">
                    <div class="text-center">
                        <div class="text-2xl md:text-3xl font-bold text-white">3.75</div>
                        <div class="text-white/40 text-sm mt-1">GPA</div>
                    </div>
                    <div class="w-px h-12 bg-white/10"></div>
                    <div class="text-center">
                        <div class="text-2xl md:text-3xl font-bold text-white">900</div>
                        <div class="text-white/40 text-sm mt-1">TOEIC</div>
                    </div>
                    <div class="w-px h-12 bg-white/10"></div>
                    <div class="text-center">
                        <div class="text-2xl md:text-3xl font-bold text-white">A+</div>
                        <div class="text-white/40 text-sm mt-1">DSA Grade</div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- About Preview -->
        <section class="py-24 px-6">
            <div class="max-w-5xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Image -->
                    <div class="relative">
                        <div class="aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border border-white/10">
                            <img src="/picture/LTA1.jpg" alt="Nguyen Duy Nghia" class="w-full h-full object-cover">
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div>
                        <span class="text-accent text-sm font-medium uppercase tracking-wider">About Me</span>
                        <h2 class="text-3xl md:text-4xl font-bold mt-3 mb-6">
                            Crafting Digital Experiences
                        </h2>
                        <p class="text-white/50 mb-4">
                            I'm a third-year Information Technology student at PTIT, working as a Teaching Assistant.
                        </p>
                        <p class="text-white/50 mb-8">
                            With strong communication skills and a proactive mindset, I'm always ready to learn and make a positive impact.
                        </p>
                        
                        <div class="flex flex-wrap gap-2 mb-8">
                            <span class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm">Frontend Dev</span>
                            <span class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm">Mobile Apps</span>
                            <span class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm">Problem Solving</span>
                        </div>
                        
                        <a href="/about" data-navigo class="text-accent font-medium hover:underline">
                            Learn more about me →
                        </a>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Skills Preview -->
        <section class="py-24 px-6 border-t border-white/5">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-12">
                    <span class="text-accent text-sm font-medium uppercase tracking-wider">What I Do</span>
                    <h2 class="text-3xl md:text-4xl font-bold mt-3">My Expertise</h2>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- Frontend -->
                    <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                        <h3 class="text-lg font-semibold mb-3">Frontend Development</h3>
                        <p class="text-white/50 text-sm mb-4">Building responsive web applications with modern technologies.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">HTML</span>
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">CSS</span>
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">JavaScript</span>
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">Tailwind</span>
                        </div>
                    </div>
                    
                    <!-- Mobile -->
                    <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                        <h3 class="text-lg font-semibold mb-3">Mobile Development</h3>
                        <p class="text-white/50 text-sm mb-4">Creating cross-platform mobile apps with Flutter.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">Flutter</span>
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">Dart</span>
                        </div>
                    </div>
                    
                    <!-- DSA -->
                    <div class="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                        <h3 class="text-lg font-semibold mb-3">Data Structures & Algorithms</h3>
                        <p class="text-white/50 text-sm mb-4">Strong foundation with A+ grade at PTIT.</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">C/C++</span>
                            <span class="px-2 py-1 bg-white/5 rounded text-xs text-white/50">Algorithms</span>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-10">
                    <a href="/skills" data-navigo class="text-accent font-medium hover:underline">
                        View all skills →
                    </a>
                </div>
            </div>
        </section>
    `;
    
    appContent.innerHTML = html;
    router.updatePageLinks();
    
    initScrollReveal();
    
    const typingElement = document.getElementById('typing-role');
    if (typingElement) {
        typeWriter(typingElement, ['Teaching Assistant', 'Frontend Developer', 'Mobile Developer', 'Problem Solver'], 80, 2000);
    }
    
    setTimeout(() => {
        document.querySelectorAll('.counter').forEach(counter => {
            const target = parseFloat(counter.dataset.target);
            animateCounter(counter, target);
        });
    }, 1000);
};

const renderAboutPage = () => {
    const html = `
        <section class="min-h-[calc(100vh-6rem)] py-20 px-6">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16 animate-fade-in">
                    <span class="text-accent font-semibold uppercase tracking-wider text-sm">Get to know me</span>
                    <h1 class="text-4xl md:text-5xl font-bold mt-4">About <span class="text-accent">Me</span></h1>
                    <p class="text-white/70 text-lg max-w-2xl mx-auto mt-4">My journey in technology and continuous growth</p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- Left Column -->
                    <div class="space-y-8">
                        <!-- Profile Card -->
                        <div class="bg-gradient-to-br from-white/[0.12] to-white/[0.05] backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all animate-slide-up">
                            <div class="flex items-start gap-6">
                                <div class="w-24 h-24 rounded-2xl overflow-hidden border-2 border-accent/50 flex-shrink-0 shadow-lg shadow-accent/20">
                                    <img src="/picture/LTA1.jpg" alt="Profile" class="w-full h-full object-cover">
                                </div>
                                <div>
                                    <h2 class="text-2xl font-bold mb-1">Nguyen Duy Nghia</h2>
                                    <p class="text-accent font-medium mb-2">Teaching Assistant</p>
                                    <p class="text-white/70 text-sm">@ Faculty of IT 1 - PTIT</p>
                                </div>
                            </div>
                            <div class="mt-6 pt-6 border-t border-white/20">
                                <p class="text-white/80 leading-relaxed">
                                    Third-year IT student with a proactive mindset, creativity, and continuous self-improvement. 
                                    With strong listening skills, adaptability, and excellent communication/teamwork abilities, 
                                    I'm confident in meeting requirements and making a positive impact.
                                </p>
                            </div>
                        </div>
                        
                        <!-- Info Cards -->
                        <div class="grid grid-cols-2 gap-4 animate-slide-up" style="animation-delay: 0.1s;">
                            <div class="bg-white/[0.08] rounded-xl p-5 border border-white/15 hover:border-accent/40 hover:bg-white/[0.12] transition-all group">
                                <ion-icon name="location-outline" class="text-2xl text-accent mb-3 group-hover:scale-110 transition-transform"></ion-icon>
                                <p class="text-white/60 text-sm">Location</p>
                                <p class="font-semibold text-white">Hanoi, Vietnam</p>
                            </div>
                            <div class="bg-white/[0.08] rounded-xl p-5 border border-white/15 hover:border-accent/40 hover:bg-white/[0.12] transition-all group">
                                <ion-icon name="school-outline" class="text-2xl text-accent mb-3 group-hover:scale-110 transition-transform"></ion-icon>
                                <p class="text-white/60 text-sm">Education</p>
                                <p class="font-semibold text-white">PTIT (2023-2028)</p>
                            </div>
                            <div class="bg-white/[0.08] rounded-xl p-5 border border-white/15 hover:border-accent/40 hover:bg-white/[0.12] transition-all group">
                                <ion-icon name="language-outline" class="text-2xl text-accent mb-3 group-hover:scale-110 transition-transform"></ion-icon>
                                <p class="text-white/60 text-sm">Languages</p>
                                <p class="font-semibold text-white">TOEIC 900, IELTS 6.5</p>
                            </div>
                            <div class="bg-white/[0.08] rounded-xl p-5 border border-white/15 hover:border-accent/40 hover:bg-white/[0.12] transition-all group">
                                <ion-icon name="trophy-outline" class="text-2xl text-accent mb-3 group-hover:scale-110 transition-transform"></ion-icon>
                                <p class="text-white/60 text-sm">Achievement</p>
                                <p class="font-semibold text-white">GPA 3.75</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column -->
                    <div class="space-y-8">
                        <!-- Education -->
                        <div class="bg-gradient-to-br from-accent/[0.15] to-accent/[0.05] backdrop-blur-md rounded-3xl p-8 border border-accent/30 hover:border-accent/50 transition-all animate-slide-up" style="animation-delay: 0.2s;">
                            <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
                                <span class="w-10 h-10 bg-accent/30 rounded-xl flex items-center justify-center text-lg">🎓</span>
                                Education
                            </h3>
                            <div class="space-y-4">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-semibold text-lg text-white">Posts and Telecommunications Institute of Technology</h4>
                                        <p class="text-white/70">Information Technology</p>
                                    </div>
                                    <span class="text-accent text-sm font-medium bg-accent/20 px-3 py-1 rounded-full">2023 - 2028</span>
                                </div>
                                <div class="flex flex-wrap gap-2 mt-4">
                                    <span class="px-3 py-1.5 bg-accent/25 text-accent text-sm rounded-full font-medium">GPA: 3.75</span>
                                    <span class="px-3 py-1.5 bg-green-500/25 text-green-300 text-sm rounded-full">🏅 Scholarship 2023-2024</span>
                                    <span class="px-3 py-1.5 bg-green-500/25 text-green-300 text-sm rounded-full">🏅 Scholarship 2024-2025</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Certifications -->
                        <div class="bg-gradient-to-br from-secondary/[0.15] to-secondary/[0.05] backdrop-blur-md rounded-3xl p-8 border border-secondary/30 hover:border-secondary/50 transition-all animate-slide-up" style="animation-delay: 0.3s;">
                            <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
                                <span class="w-10 h-10 bg-secondary/30 rounded-xl flex items-center justify-center text-lg">🏆</span>
                                Certifications
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center p-3 bg-white/[0.06] rounded-xl hover:bg-white/[0.10] transition-colors border border-white/10 hover:border-white/20">
                                    <span class="font-medium text-white">NVIDIA Fundamentals of Deep Learning</span>
                                    <span class="text-white/70 text-sm">2026</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-white/[0.06] rounded-xl hover:bg-white/[0.10] transition-colors border border-white/10 hover:border-white/20">
                                    <span class="font-medium text-white">Samsung Applications of Algorithm</span>
                                    <span class="text-white/70 text-sm">2025</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-white/[0.06] rounded-xl hover:bg-white/[0.10] transition-colors border border-white/10 hover:border-white/20">
                                    <span class="font-medium text-white">TOEIC 900</span>
                                    <span class="text-white/70 text-sm">2024</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-white/[0.06] rounded-xl hover:bg-white/[0.10] transition-colors border border-white/10 hover:border-white/20">
                                    <span class="font-medium text-white">Microsoft Excel 365</span>
                                    <span class="text-white/70 text-sm">2024</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-white/[0.06] rounded-xl hover:bg-white/[0.10] transition-colors border border-white/10 hover:border-white/20">
                                    <span class="font-medium text-white">IELTS 6.5</span>
                                    <span class="text-white/70 text-sm">2022</span>
                                </div>
                                <div class="flex justify-between items-center p-3 bg-white/[0.06] rounded-xl hover:bg-white/[0.10] transition-colors border border-white/10 hover:border-white/20">
                                    <span class="font-medium text-white">MOS Word 2016</span>
                                    <span class="text-white/70 text-sm">2021</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- CTA -->
                        <div class="flex gap-4 animate-slide-up" style="animation-delay: 0.4s;">
                            <a href="/contact" data-navigo class="flex-1 text-center px-6 py-4 bg-gradient-to-r from-accent to-pink-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,111,189,0.5)] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]">
                                <ion-icon name="chatbubble-outline"></ion-icon>
                                Get In Touch
                            </a>
                            <a href="/skills" data-navigo class="flex-1 text-center px-6 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/15 hover:border-accent/60 transition-all duration-300 flex items-center justify-center gap-2">
                                <ion-icon name="code-slash-outline"></ion-icon>
                                View Skills
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    appContent.innerHTML = html;
    router.updatePageLinks();
};

const renderSkillsPage = () => {
    const html = `
        <section class="min-h-[calc(100vh-6rem)] py-20 px-6">
            <div class="max-w-4xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16 animate-fade-in">
                    <span class="text-accent text-sm font-medium uppercase tracking-wider">What I Know</span>
                    <h1 class="text-4xl md:text-5xl font-bold mt-3">My Skills</h1>
                    <p class="text-white/60 mt-4">Technologies and skills I've learned and developed at PTIT</p>
                </div>
                
                <!-- Technical Skills -->
                <div class="mb-12">
                    <h2 class="text-xl font-semibold mb-8 text-white flex items-center gap-3">
                        <span class="w-8 h-1 bg-accent rounded-full"></span>
                        Technical Skills
                    </h2>
                    
                    <!-- Frontend -->
                    <div class="mb-8 p-6 bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-400/40 rounded-2xl">
                        <h3 class="text-orange-300 text-sm font-semibold uppercase tracking-wider mb-4">Frontend Development</h3>
                        <div class="flex flex-wrap gap-3">
                            <span class="px-4 py-2 bg-orange-500/40 border border-orange-400/60 rounded-lg text-orange-100 font-medium hover:bg-orange-500/50 transition-colors">HTML5</span>
                            <span class="px-4 py-2 bg-blue-500/40 border border-blue-400/60 rounded-lg text-blue-100 font-medium hover:bg-blue-500/50 transition-colors">CSS3</span>
                            <span class="px-4 py-2 bg-yellow-500/40 border border-yellow-400/60 rounded-lg text-yellow-100 font-medium hover:bg-yellow-500/50 transition-colors">JavaScript ES6+</span>
                            <span class="px-4 py-2 bg-cyan-500/40 border border-cyan-400/60 rounded-lg text-cyan-100 font-medium hover:bg-cyan-500/50 transition-colors">TailwindCSS</span>
                            <span class="px-4 py-2 bg-purple-500/40 border border-purple-400/60 rounded-lg text-purple-100 font-medium hover:bg-purple-500/50 transition-colors">Vite</span>
                        </div>
                    </div>
                    
                    <!-- Mobile -->
                    <div class="mb-8 p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-400/40 rounded-2xl">
                        <h3 class="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-4">Mobile Development</h3>
                        <div class="flex flex-wrap gap-3">
                            <span class="px-4 py-2 bg-cyan-500/40 border border-cyan-400/60 rounded-lg text-cyan-100 font-medium hover:bg-cyan-500/50 transition-colors">Flutter</span>
                            <span class="px-4 py-2 bg-blue-500/40 border border-blue-400/60 rounded-lg text-blue-100 font-medium hover:bg-blue-500/50 transition-colors">Dart</span>
                        </div>
                    </div>
                    
                    <!-- DSA -->
                    <div class="mb-8 p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/40 rounded-2xl">
                        <h3 class="text-green-300 text-sm font-semibold uppercase tracking-wider mb-4">Data Structures & Algorithms</h3>
                        <div class="flex flex-wrap gap-3">
                            <span class="px-4 py-2.5 bg-green-500/50 border border-green-400/70 rounded-lg text-green-100 font-semibold">C/C++ — Grade: A+</span>
                            <span class="px-4 py-2 bg-emerald-500/40 border border-emerald-400/60 rounded-lg text-emerald-100 font-medium hover:bg-emerald-500/50 transition-colors">Algorithms</span>
                            <span class="px-4 py-2 bg-teal-500/40 border border-teal-400/60 rounded-lg text-teal-100 font-medium hover:bg-teal-500/50 transition-colors">Problem Solving</span>
                        </div>
                    </div>
                    
                    <!-- Tools -->
                    <div class="p-6 bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-400/40 rounded-2xl">
                        <h3 class="text-violet-300 text-sm font-semibold uppercase tracking-wider mb-4">Tools & Technologies</h3>
                        <div class="flex flex-wrap gap-3">
                            <span class="px-4 py-2 bg-gray-500/40 border border-gray-400/60 rounded-lg text-gray-100 font-medium hover:bg-gray-500/50 transition-colors">Git / GitHub</span>
                            <span class="px-4 py-2 bg-blue-500/40 border border-blue-400/60 rounded-lg text-blue-100 font-medium hover:bg-blue-500/50 transition-colors">VS Code</span>
                            <span class="px-4 py-2 bg-red-500/40 border border-red-400/60 rounded-lg text-red-100 font-medium hover:bg-red-500/50 transition-colors">npm</span>
                            <span class="px-4 py-2 bg-green-500/40 border border-green-400/60 rounded-lg text-green-100 font-medium hover:bg-green-500/50 transition-colors">Android Studio</span>
                            <span class="px-4 py-2 bg-white/30 border border-white/50 rounded-lg text-white font-medium hover:bg-white/40 transition-colors">Vercel</span>
                        </div>
                    </div>
                </div>
                
                <!-- Soft Skills -->
                <div>
                    <h2 class="text-xl font-semibold mb-8 text-white flex items-center gap-3">
                        <span class="w-8 h-1 bg-pink-500 rounded-full"></span>
                        Soft Skills
                    </h2>
                    <div class="p-6 bg-gradient-to-br from-pink-500/20 to-accent/10 border border-pink-400/40 rounded-2xl">
                        <div class="flex flex-wrap gap-3">
                            <span class="px-4 py-2 bg-pink-500/40 border border-pink-400/60 rounded-lg text-pink-100 font-medium">Proactive</span>
                            <span class="px-4 py-2 bg-rose-500/40 border border-rose-400/60 rounded-lg text-rose-100 font-medium">Adaptability</span>
                            <span class="px-4 py-2 bg-fuchsia-500/40 border border-fuchsia-400/60 rounded-lg text-fuchsia-100 font-medium">Teamwork</span>
                            <span class="px-4 py-2 bg-purple-500/40 border border-purple-400/60 rounded-lg text-purple-100 font-medium">Communication</span>
                            <span class="px-4 py-2 bg-violet-500/40 border border-violet-400/60 rounded-lg text-violet-100 font-medium">Problem Solving</span>
                            <span class="px-4 py-2 bg-indigo-500/40 border border-indigo-400/60 rounded-lg text-indigo-100 font-medium">Active Listening</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    appContent.innerHTML = html;
    router.updatePageLinks();
};

const renderProjectsPage = () => {
    const projects = [
        {
            title: 'Portfolio Website',
            description: 'Personal portfolio website with beautiful effects, modern design using Tailwind CSS and Navigo router for SPA routing.',
            tech: ['HTML5', 'TailwindCSS', 'JavaScript', 'Vite', 'Navigo'],
            image: '/picture/background.jpg',
            github: 'https://github.com/Nghaiz',
            demo: 'https://nghaiz-blog.vercel.app/',
            featured: true
        },
        {
            title: 'Breakfast App Clone',
            description: 'Breakfast ordering app clone built with Flutter/Dart, featuring beautiful UI/UX design following Material Design guidelines.',
            tech: ['Flutter', 'Dart', 'Mobile'],
            image: '/picture/background.jpg',
            github: 'https://github.com/Nghaiz/hw_clone_breakfast_app',
            demo: null,
            featured: true
        },
        {
            title: 'Todo List App',
            description: 'Task management application with add, delete, edit and mark as complete features. Data persistence with local storage.',
            tech: ['HTML', 'CSS', 'JavaScript', 'Vite'],
            image: '/picture/background.jpg',
            github: 'https://github.com/Nghaiz',
            demo: 'https://todolist-eta-orpin.vercel.app/',
            featured: true
        },
        {
            title: 'YouTube Clone',
            description: 'YouTube interface clone built with Vite, using component-based architecture and client-side routing.',
            tech: ['HTML', 'CSS', 'JavaScript', 'Vite'],
            image: '/picture/background.jpg',
            github: 'https://github.com/Nghaiz',
            demo: null,
            featured: false
        },
        {
            title: 'Spotify UI Clone',
            description: 'Spotify interface recreation with responsive design and smooth animations.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            image: '/picture/background.jpg',
            github: 'https://github.com/Nghaiz',
            demo: null,
            featured: false
        },
        {
            title: 'Calendar App',
            description: 'Calendar application with ability to view and manage events by day and month.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            image: '/picture/background.jpg',
            github: 'https://github.com/Nghaiz',
            demo: null,
            featured: false
        }
    ];
    
    const projectCards = projects.map((project, index) => `
        <div class="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden border ${project.featured ? 'border-accent/30 hover:border-accent' : 'border-white/10 hover:border-accent/50'} transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,111,189,0.15)] animate-slide-up relative" style="animation-delay: ${index * 0.1}s;">
            ${project.featured ? '<div class="absolute top-4 right-4 px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full z-10">Featured</div>' : ''}
            <div class="relative h-48 overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4">
                    <h3 class="text-xl font-bold group-hover:text-accent transition-colors text-white/90">${project.title}</h3>
                </div>
            </div>
            <div class="p-6">
                <p class="text-white/50 mb-4 line-clamp-2">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-5">
                    ${project.tech.map(t => `<span class="px-3 py-1 bg-accent/15 text-accent text-xs font-medium rounded-full border border-accent/20">${t}</span>`).join('')}
                </div>
                <div class="flex gap-4">
                    <a href="${project.github}" target="_blank" class="flex items-center gap-2 text-white/60 hover:text-accent transition-colors group/link">
                        <ion-icon name="logo-github" class="group-hover/link:scale-110 transition-transform"></ion-icon>
                        Source
                    </a>
                    ${project.demo ? `
                        <a href="${project.demo}" target="_blank" class="flex items-center gap-2 text-white/60 hover:text-accent transition-colors group/link">
                            <ion-icon name="open-outline" class="group-hover/link:scale-110 transition-transform"></ion-icon>
                            Live Demo
                        </a>
                    ` : `
                        <span class="flex items-center gap-2 text-white/30">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            Private
                        </span>
                    `}
                </div>
            </div>
        </div>
    `).join('');
    
    const html = `
        <section class="min-h-[calc(100vh-6rem)] py-20 px-6">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16 animate-fade-in">
                    <span class="text-accent font-semibold uppercase tracking-wider text-sm">My Work</span>
                    <h1 class="text-4xl md:text-5xl font-bold mt-4">My <span class="text-accent">Projects</span></h1>
                    <p class="text-white/50 text-lg max-w-2xl mx-auto mt-4">Projects I've built during my studies and research at PTIT</p>
                </div>
                
                <!-- Featured Projects Info -->
                <div class="flex justify-center mb-8 animate-fade-in">
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm">
                        <ion-icon name="star-outline"></ion-icon>
                        <span>Featured projects are deployed on Vercel</span>
                    </div>
                </div>
                
                <!-- Projects Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${projectCards}
                </div>
                
                <!-- GitHub CTA -->
                <div class="text-center mt-16 animate-fade-in" style="animation-delay: 0.5s;">
                    <div class="bg-gradient-to-r from-white/[0.06] to-white/[0.03] backdrop-blur-md rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
                        <ion-icon name="logo-github" class="text-5xl text-accent mb-4"></ion-icon>
                        <h3 class="text-2xl font-bold mb-2 text-white/90">View More Projects</h3>
                        <p class="text-white/50 mb-6">Explore more projects and source code on my GitHub</p>
                        <a href="https://github.com/Nghaiz" target="_blank" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-pink-500 text-primary font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,111,189,0.5)] transition-all duration-300 hover:scale-105">
                            <ion-icon name="logo-github"></ion-icon>
                            Visit GitHub
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    appContent.innerHTML = html;
    router.updatePageLinks();
};

const renderContactPage = () => {
    const html = `
        <section class="min-h-[calc(100vh-6rem)] py-20 px-6">
            <div class="max-w-5xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-16 animate-fade-in">
                    <span class="text-accent font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
                    <h1 class="text-4xl md:text-5xl font-bold mt-4">Contact <span class="text-accent">Me</span></h1>
                    <p class="text-white/50 text-lg max-w-2xl mx-auto mt-4">Let's connect! I'm always open for collaboration and exciting project discussions</p>
                </div>
                
                <div class="grid lg:grid-cols-5 gap-12">
                    <!-- Contact Info - Takes 2 columns -->
                    <div class="lg:col-span-2 space-y-6 animate-slide-up">
                        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span class="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-lg">📬</span>
                            Contact Information
                        </h2>
                        
                        <div class="space-y-4">
                            <!-- Phone -->
                            <a href="tel:0824577077" class="flex items-center gap-4 p-4 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/10 hover:border-accent/50 transition-all group hover:scale-[1.02]">
                                <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent transition-all">
                                    <ion-icon name="call-outline" class="text-2xl text-accent group-hover:text-primary"></ion-icon>
                                </div>
                                <div>
                                    <p class="text-white/40 text-sm">Phone</p>
                                    <p class="font-semibold group-hover:text-accent transition-colors text-white/90">0824 577 077</p>
                                </div>
                            </a>
                            
                            <!-- Email -->
                            <a href="mailto:Nghiaa0.NTT@gmail.com" class="flex items-center gap-4 p-4 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/10 hover:border-accent/50 transition-all group hover:scale-[1.02]">
                                <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent transition-all">
                                    <ion-icon name="mail-outline" class="text-2xl text-accent group-hover:text-primary"></ion-icon>
                                </div>
                                <div>
                                    <p class="text-white/40 text-sm">Email</p>
                                    <p class="font-semibold group-hover:text-accent transition-colors text-white/90">Nghiaa0.NTT@gmail.com</p>
                                </div>
                            </a>
                            
                            <!-- Location -->
                            <div class="flex items-center gap-4 p-4 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/10">
                                <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                                    <ion-icon name="location-outline" class="text-2xl text-accent"></ion-icon>
                                </div>
                                <div>
                                    <p class="text-white/40 text-sm">Location</p>
                                    <p class="font-semibold text-white/90">Hanoi, Vietnam</p>
                                </div>
                            </div>
                            
                            <!-- GitHub -->
                            <a href="https://github.com/Nghaiz" target="_blank" class="flex items-center gap-4 p-4 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/10 hover:border-accent/50 transition-all group hover:scale-[1.02]">
                                <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent transition-all">
                                    <ion-icon name="logo-github" class="text-2xl text-accent group-hover:text-primary"></ion-icon>
                                </div>
                                <div>
                                    <p class="text-white/40 text-sm">GitHub</p>
                                    <p class="font-semibold group-hover:text-accent transition-colors text-white/90">github.com/Nghaiz</p>
                                </div>
                            </a>
                        </div>
                        
                        <!-- Social Links -->
                        <div class="pt-6">
                            <p class="text-white/50 mb-4">Follow Me</p>
                            <div class="flex gap-3">
                                <a href="https://github.com/Nghaiz" target="_blank" class="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:scale-110 text-white/70">
                                    <ion-icon name="logo-github" class="text-xl"></ion-icon>
                                </a>
                                <a href="#" class="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:scale-110 text-white/70">
                                    <ion-icon name="logo-linkedin" class="text-xl"></ion-icon>
                                </a>
                                <a href="#" class="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:scale-110 text-white/70">
                                    <ion-icon name="logo-facebook" class="text-xl"></ion-icon>
                                </a>
                                <a href="#" class="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:scale-110 text-white/70">
                                    <ion-icon name="logo-instagram" class="text-xl"></ion-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contact Form - Takes 3 columns -->
                    <div class="lg:col-span-3 animate-slide-up" style="animation-delay: 0.2s;">
                        <form id="contact-form" class="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-accent/30 transition-colors">
                            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-white/90">
                                <span class="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-lg">✉️</span>
                                Send a Message
                            </h2>
                            
                            <div class="space-y-5">
                                <div class="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label class="block text-white/50 text-sm mb-2 font-medium">Full Name <span class="text-accent">*</span></label>
                                        <input type="text" required class="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-white placeholder-white/30" placeholder="Enter your name">
                                    </div>
                                    
                                    <div>
                                        <label class="block text-white/50 text-sm mb-2 font-medium">Email <span class="text-accent">*</span></label>
                                        <input type="email" required class="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-white placeholder-white/30" placeholder="email@example.com">
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-white/50 text-sm mb-2 font-medium">Subject</label>
                                    <input type="text" class="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-white placeholder-white/30" placeholder="Message subject">
                                </div>
                                
                                <div>
                                    <label class="block text-white/50 text-sm mb-2 font-medium">Message <span class="text-accent">*</span></label>
                                    <textarea rows="5" required class="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-white placeholder-white/30 resize-none" placeholder="Write your message here..."></textarea>
                                </div>
                                
                                <button type="submit" class="w-full py-4 bg-gradient-to-r from-accent to-pink-500 text-primary font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,111,189,0.5)] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]">
                                    <ion-icon name="send-outline" class="text-xl"></ion-icon>
                                    Send Message
                                </button>
                            </div>
                        </form>
                        
                        <!-- Quick Note -->
                        <div class="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl text-center">
                            <p class="text-accent text-sm">💡 I usually respond within 24 hours!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    appContent.innerHTML = html;
    
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        button.innerHTML = '<ion-icon name="checkmark-circle-outline" class="text-xl"></ion-icon> Message Sent Successfully!';
        button.classList.add('bg-green-500');
        button.classList.remove('bg-gradient-to-r', 'from-accent', 'to-pink-500');
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove('bg-green-500');
            button.classList.add('bg-gradient-to-r', 'from-accent', 'to-pink-500');
            form.reset();
        }, 2000);
    });
    
    router.updatePageLinks();
};

const setupMobileMenu = () => {
    if (menuToggle && mobileNavOverlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNavOverlay.classList.toggle('hidden');
            setTimeout(() => {
                mobileNavOverlay.classList.toggle('opacity-0');
            }, 10);
        });
        
        mobileNavOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNavOverlay.classList.add('opacity-0');
                setTimeout(() => {
                    mobileNavOverlay.classList.add('hidden');
                }, 300);
            });
        });
    }
};

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('bg-primary/90', 'py-3');
        header.classList.remove('bg-primary/40', 'py-5');
    } else {
        header.classList.add('bg-primary/40', 'py-5');
        header.classList.remove('bg-primary/90', 'py-3');
    }
});

router
    .on('/', () => {
        renderHomePage();
    })
    .on('/about', () => {
        renderAboutPage();
    })
    .on('/skills', () => {
        renderSkillsPage();
    })
    .on('/projects', () => {
        renderProjectsPage();
    })
    .on('/contact', () => {
        renderContactPage();
    })
    .notFound(() => {
        appContent.innerHTML = `
            <section class="min-h-[calc(100vh-6rem)] flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-8xl font-bold text-accent mb-4">404</h1>
                    <p class="text-2xl text-white/50 mb-8">Page Not Found</p>
                    <a href="/" data-navigo class="px-6 py-3 bg-gradient-to-r from-accent to-pink-500 text-primary font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,111,189,0.5)] transition-all">
                        Go Home
                    </a>
                </div>
            </section>
        `;
        router.updatePageLinks();
    })
    .resolve();

setupMobileMenu();
