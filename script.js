// =========================================
// SCRIPT PRINCIPAL: ZONA EN LLAMAS
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MANEJO DEL MODAL (Para elementos pares) ---
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-btn');
    
    // Seleccionamos TODOS los elementos con la clase 'accordion-item'
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Si el elemento tiene el atributo 'data-src', significa que debe abrir el modal
            if (this.dataset.src) {
                event.preventDefault(); // Prevenir cualquier comportamiento por defecto (por si acaso)
                const imgSrc = this.dataset.src;
                const imgAlt = this.dataset.alt || 'Imagen de galería';
                modalImg.src = imgSrc;
                modalImg.alt = imgAlt;
                modal.classList.add('active');
            } 
            // Si NO tiene 'data-src', entonces es un <a> y debe navegar. No hacemos nada.
            // El navegador manejará la navegación por defecto del <a>.
        });
    });

    // Cerrar modal al hacer clic en la 'x'
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // Cerrar modal al hacer clic fuera de la imagen (en el fondo oscuro)
    // Guard: solo si el modal existe (no existe en contacto.html ni en páginas de detalle)
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // --- 2. SCROLL PARA NAVBAR (Código que ya tenías, lo mantengo) ---
    const header = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Lógica para ocultar/mostrar navbar al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('navbar-hidden');
        } else {
            header.classList.remove('navbar-hidden');
        }
        
        // Lógica para cambiar estilo al hacer scroll (fondo más sólido)
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // --- 3. MENÚ HAMBURGUESA MÓVIL (Código que ya tenías, lo mantengo) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace (útil para móvil)
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // --- 4. ANIMACIONES FADE-IN AL HACER SCROLL (Opcional, para mantener dinamismo) ---
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFadeIn() {
        const triggerBottom = window.innerHeight * 0.85; // Punto de activación
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn(); // Para elementos visibles desde el inicio

});