
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MENÚ HAMBURGUESA MOBILE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // No prevenir si es solo "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // 80px del header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // NAVEGACIÓN - CAMBIO DE FONDO AL SCROLL
    // ============================================
    const nav = document.querySelector('.glass-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(251, 250, 249, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.background = 'rgba(251, 250, 249, 0.8)';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // INTERSECTION OBSERVER - ANIMACIONES AL SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observar las tarjetas de beneficios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // ============================================
    // TRACKING DE CLICKS EN WHATSAPP
    // (Para Google Analytics - opcional)
    // ============================================
    const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Click en botón de WhatsApp:', this.href);
            
            // Si tenés Google Analytics configurado, podés descomentar esto:
            // gtag('event', 'click', {
            //     'event_category': 'WhatsApp',
            //     'event_label': this.textContent.trim()
            // });
        });
    });
    
    // ============================================
    // LAZY LOADING DE IMÁGENES
    // (Ya está nativo con loading="lazy" pero este es fallback)
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Si querés usar data-src en vez de src, descomentá esto
        // const lazyImages = document.querySelectorAll('img[data-src]');
        // lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // ANIMACIÓN DEL HERO TITLE
    // ============================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // ============================================
    // BOTÓN WHATSAPP - APARECER DESPUÉS DE 3 SEG
    // ============================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0.8) translateY(20px)';
        
        setTimeout(() => {
            whatsappFloat.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1) translateY(0)';
        }, 3000);
    }
    
});

// ============================================
// CSS ADICIONAL PARA MENÚ MOBILE
// (Se inyecta dinámicamente)
// ============================================
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 767px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(251, 250, 249, 0.98);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            pointer-events: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);