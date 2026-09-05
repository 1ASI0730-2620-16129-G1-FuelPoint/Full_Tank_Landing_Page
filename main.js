document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 24) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // 2. HAMBURGER / DRAWER
    const hamburger = document.getElementById('hamburger');
    const navDrawer = document.getElementById('navDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');

    const openDrawer = () => {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        navDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', () => {
        hamburger.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    drawerOverlay?.addEventListener('click', closeDrawer);
    drawerClose?.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-nav-link').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // 6. INTERSECTION OBSERVER (fade-in)
    const fadeEls = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObserver.observe(el));


    const I18N = {
        es: {
            'nav.how':          'C\u00f3mo funciona',
            'nav.benefits':     'Beneficios',
            'nav.pricing':      'Precios',
            'nav.testimonials': 'Testimonios',
            'nav.about':        'Sobre nosotros',
            'nav.contact':      'Contacto',
            'nav.cta':          'Comenzar ahora',
            'hero.badge': '&#9201; Gesti\u00f3n de combustible en tiempo real',
            'hero.h1':    'Deja atr\u00e1s el <span class="hero-strike">caos</span>.<br>Gestiona combustible<br>como un <span class="hero-underline">profesional.</span>',
            'hero.subtitle': 'FullTank conecta empresas industriales con sus proveedores de combustible en una plataforma centralizada. Pedidos, pagos, log\u00edstica y trazabilidad en tiempo real \u2014 sin llamadas, sin Excel, sin errores.',
            'hero.check1':   'Sin tarjeta de cr\u00e9dito requerida',
            'hero.check2':   'Configuraci\u00f3n en menos de 10 minutos',
            'hero.check3':   'Soporte multiidioma incluido',
            'hero.cta':      'Solicitar una demo',
            'hero.play':     'Ver c\u00f3mo funciona',
            'mockup.greeting': '👋 Buenos d\u00edas, Carlos',
            'mockup.kpi1':     'Pedidos activos',
            'mockup.kpi2':     'Pend. pago',
            'mockup.kpi3':     'En tr\u00e1nsito',
            'mockup.kpi4':     'Completados',
            'mockup.col1':     'ID',
            'mockup.col2':     'Tipo',
            'mockup.col3':     'Estado',
            'mockup.status1':  'Aprobado',
            'mockup.status2':  'Tr\u00e1nsito',
            'mockup.status3':  'Pendiente',
            'mockup.chart':    'Consumo mensual (galones)',
            'mockup.month1':   'Nov',
            'mockup.month2':   'Dic',
            'mockup.month3':   'Ene',
            'mockup.month4':   'Feb',
            'mockup.month5':   'Mar',
            'mockup.month6':   'Abr',
            'section.problema': "El problema",
            'section.como-funciona': "Cómo funciona",
            'section.beneficios': "Beneficios",
            'section.segmentos': "A quién está dirigido",
            'section.metricas': "Métricas",
            'section.sobre-nosotros': "Sobre nosotros",
            'section.equipo': "Nuestro equipo",
            'section.testimonios': "Testimonios",
            'section.precios': "Planes y precios",
            'section.faq': "Preguntas frecuentes",
            'section.formulario': "Formulario de contacto",
            'section.contacto': "Contacto",
        },
        en: {
            'nav.how':          'How it works',
            'nav.benefits':     'Benefits',
            'nav.pricing':      'Pricing',
            'nav.testimonials': 'Testimonials',
            'nav.about':        'About us',
            'nav.contact':      'Contact',
            'nav.cta':          'Get started now',
            'hero.badge': '&#9201; Real-time fuel management',
            'hero.h1':    'Leave the <span class="hero-strike">chaos</span> behind.<br>Manage your fuel<br>like a <span class="hero-underline">professional.</span>',
            'hero.subtitle': 'FullTank connects industrial companies with their fuel suppliers on a centralized platform. Orders, payments, logistics, and real-time traceability \u2014 no calls, no spreadsheets, no errors.',
            'hero.check1':   'No credit card required',
            'hero.check2':   'Setup in less than 10 minutes',
            'hero.check3':   'Multi-language support included',
            'hero.cta':      'Request a demo',
            'hero.play':     'See how it works',
            'mockup.greeting': '👋 Good morning, Carlos',
            'mockup.kpi1':     'Active orders',
            'mockup.kpi2':     'Pending payment',
            'mockup.kpi3':     'In transit',
            'mockup.kpi4':     'Completed',
            'mockup.col1':     'ID',
            'mockup.col2':     'Type',
            'mockup.col3':     'Status',
            'mockup.status1':  'Approved',
            'mockup.status2':  'In transit',
            'mockup.status3':  'Pending',
            'mockup.chart':    'Monthly consumption (gallons)',
            'mockup.month1':   'Nov',
            'mockup.month2':   'Dec',
            'mockup.month3':   'Jan',
            'mockup.month4':   'Feb',
            'mockup.month5':   'Mar',
            'mockup.month6':   'Apr',
            'section.problema': "The problem",
            'section.como-funciona': "How it works",
            'section.beneficios': "Benefits",
            'section.segmentos': "Who it is for",
            'section.metricas': "Metrics",
            'section.sobre-nosotros': "About us",
            'section.equipo': "Our team",
            'section.testimonios': "Testimonials",
            'section.precios': "Plans and pricing",
            'section.faq': "Frequently asked questions",
            'section.formulario': "Contact form",
            'section.contacto': "Contact",
        }
    };

    let currentLang = 'en';
    try { currentLang = localStorage.getItem('ft-lang') === 'es' ? 'es' : 'en'; } catch {}
    const applyLanguage = lang => {
        currentLang = lang;
        const dictionary = I18N[lang];
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            if (dictionary[element.dataset.i18n] !== undefined) element.textContent = dictionary[element.dataset.i18n];
        });
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            if (dictionary[element.dataset.i18nHtml] !== undefined) element.innerHTML = dictionary[element.dataset.i18nHtml];
        });
        document.querySelectorAll('.lang-select').forEach(button => {
            button.textContent = lang.toUpperCase() + ' ▾';
            button.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
        });
        hamburger.setAttribute('aria-label', lang === 'en' ? 'Open menu' : 'Abrir menú');
        drawerClose.setAttribute('aria-label', lang === 'en' ? 'Close menu' : 'Cerrar menú');
        navDrawer.setAttribute('aria-label', lang === 'en' ? 'Navigation menu' : 'Menú de navegación');
        navbar.setAttribute('aria-label', lang === 'en' ? 'Main navigation' : 'Navegación principal');
        try { localStorage.setItem('ft-lang', lang); } catch {}
    };
    document.querySelectorAll('.lang-select').forEach(button => button.addEventListener('click', () => applyLanguage(currentLang === 'en' ? 'es' : 'en')));
    applyLanguage(currentLang);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navDrawer.classList.contains('open')) { closeDrawer(); hamburger.focus(); }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 1024) closeDrawer(); });
});
