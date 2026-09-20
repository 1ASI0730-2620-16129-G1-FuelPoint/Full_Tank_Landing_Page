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

    // 4. FAQ ACCORDION
    document.querySelectorAll('.faq-item').forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const body = item.querySelector('.faq-body');

        trigger?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(other => {
                other.classList.remove('open');
                other.querySelector('.faq-body')?.classList.remove('open');
                other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('open');
                body?.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 5. PRICING TOGGLE
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const monthPrices = document.querySelectorAll('.price-monthly');
    const yearPrices = document.querySelectorAll('.price-yearly');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const isYearly = btn.dataset.period === 'yearly';
            monthPrices.forEach(p => p.style.display = isYearly ? 'none' : '');
            yearPrices.forEach(p => p.style.display = isYearly ? '' : 'none');
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


    // 7. CONTADOR DE MÉTRICAS
    const counters = document.querySelectorAll('.metric-number[data-target]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderCounter = (el, value) => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const display = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
        el.textContent = prefix + display + suffix;
    };

    if (prefersReducedMotion) {
        // Si la persona pidió menos movimiento, mostramos el número final sin animar.
        counters.forEach(el => renderCounter(el, parseFloat(el.dataset.target)));
    } else {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const duration = 1600;
                const start = performance.now();

                const tick = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    renderCounter(el, target * progress);
                    if (progress < 1) requestAnimationFrame(tick);
                };

                requestAnimationFrame(tick);
                countObserver.unobserve(el);
            });
        }, { threshold: 0.5 });

        counters.forEach(el => countObserver.observe(el));
    }

    // 8. SCROLL TO TOP
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 9. NAVBAR ACTIVE LINK
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a');

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => activeObserver.observe(s));


    // 10. LANGUAGE SYSTEM
    // All translations use data-i18n (textContent) or data-i18n-html (innerHTML)
    // Symbols use HTML entities in the dictionary (rendered via innerHTML for those keys)


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
            'social.label': 'Sectores que coordinan combustible todos los días',
            'social.s1': 'Construcción',
            'social.s2': 'Minería',
            'social.s3': 'Transporte y logística',
            'social.s4': 'Agroindustria',
            'social.s5': 'Manufactura',
            'social.s6': 'Pesca industrial',

            'segments.label': 'A quién está dirigido',
            'segments.title': 'Una plataforma. Dos soluciones.',
            'segments.subtitle': 'FullTank está diseñado desde cero para las dos partes del proceso.',
            'segments.req.badge': 'Empresas solicitantes',
            'segments.req.role': 'Encargado logístico',
            'segments.req.quote': '“Necesito saber exactamente dónde está mi pedido sin tener que estar llamando todo el día.”',
            'segments.req.desc': 'Empresas de construcción, minería, agroindustria y transporte que necesitan combustible de forma constante para su maquinaria y no pueden permitirse que una obra se detenga.',
            'segments.req.li1': 'Registra tu pedido y tu comprobante de pago en un solo lugar',
            'segments.req.li2': 'Consulta el estado del pedido sin llamar al proveedor',
            'segments.req.li3': 'Controla el nivel de combustible de tus equipos y tanques',
            'segments.req.li4': 'Recibe avisos de aprobación, despacho y entrega',
            'segments.req.li5': 'Descarga el historial y los reportes de consumo en PDF',
            'segments.req.cta': 'Soy solicitante →',
            'segments.sup.badge': 'Empresas proveedoras',
            'segments.sup.role': 'Coordinadora de despacho',
            'segments.sup.quote': '“Si pudiera ver todos los pedidos organizados automáticamente, ahorraría horas de trabajo cada día.”',
            'segments.sup.desc': 'Distribuidoras autorizadas que atienden a varios clientes corporativos y quieren atender más pedidos sin sumar personal ni errores de coordinación.',
            'segments.sup.li1': 'Centraliza las solicitudes que hoy llegan por varios canales',
            'segments.sup.li2': 'Valida el comprobante de pago y aprueba con un clic',
            'segments.sup.li3': 'Asigna cisternas y conductores disponibles sin cruces',
            'segments.sup.li4': 'Mantén tu inventario y tus precios actualizados',
            'segments.sup.li5': 'Genera reportes de ventas por cliente y periodo',
            'segments.sup.cta': 'Soy proveedor →',

            'metrics.label': 'Nuestras metas',
            'metrics.title': 'Lo que queremos lograr con quienes usen FullTank',
            'metrics.m1': 'Menos tiempo dedicado a coordinar pedidos',
            'metrics.m2': 'Pedidos confirmados sin correcciones',
            'metrics.m3': 'Para registrar un pedido completo',
            'metrics.m4': 'Menos llamadas de seguimiento',
            'metrics.note': 'Son las metas de validación que definimos con nuestras hipótesis de producto, no resultados ya medidos.',

            'testimonials.label': 'Investigación con usuarios',
            'testimonials.title': 'Lo que nos dijeron quienes viven este problema',
            'testimonials.subtitle': 'Frases recogidas en las entrevistas que hicimos a empresas solicitantes y proveedoras de combustible.',
            'testimonials.t1.text': '“Mando el pedido por WhatsApp y después me toca llamar para saber si sale hoy o mañana. Si el camión no llega, la máquina se queda parada y el ingeniero me llama a mí.”',
            'testimonials.t1.name': 'Carlos R.',
            'testimonials.t1.role': 'Encargado logístico · Empresa constructora, Lima Norte',
            'testimonials.t2.text': '“Recibo pedidos por llamada, por correo y por mensaje. Se me va la mañana solo en confirmar quién pagó y qué cisterna sale primero.”',
            'testimonials.t2.name': 'Andrea L.',
            'testimonials.t2.role': 'Coordinadora de despacho · Distribuidora de combustible, Callao',
            'testimonials.t3.text': '“La conversación queda en el chat, el voucher en la galería y la factura en el correo. Cuando me piden el resumen del mes, me demoro juntando todo.”',
            'testimonials.t3.name': 'Jorge S.',
            'testimonials.t3.role': 'Jefe de logística · Empresa de transporte, Callao',
            'testimonials.note': 'Los nombres de las empresas se omiten por pedido de las personas entrevistadas.',
            'team.m4.desc': 'Estudiante de Ingeniería de Software en la UPC, con conocimientos en C++, Python, JavaScript, HTML y CSS. Destaca por su trabajo en equipo, su capacidad de adaptarse a nuevos retos y su interés por mejorar constantemente sus habilidades.',
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
            'social.label': 'Industries that coordinate fuel every day',
            'social.s1': 'Construction',
            'social.s2': 'Mining',
            'social.s3': 'Transport & logistics',
            'social.s4': 'Agribusiness',
            'social.s5': 'Manufacturing',
            'social.s6': 'Industrial fishing',

            'segments.label': 'Who it is for',
            'segments.title': 'One platform. Two solutions.',
            'segments.subtitle': 'FullTank was designed from the ground up for both sides of the process.',
            'segments.req.badge': 'Fuel buyers',
            'segments.req.role': 'Logistics coordinator',
            'segments.req.quote': '“I need to know exactly where my order is without calling all day long.”',
            'segments.req.desc': 'Construction, mining, agribusiness and transport companies that need a constant fuel supply for their machinery and cannot afford a site to stop.',
            'segments.req.li1': 'Register your order and your payment voucher in one place',
            'segments.req.li2': 'Check the order status without calling your provider',
            'segments.req.li3': 'Monitor the fuel level of your equipment and tanks',
            'segments.req.li4': 'Get notified on approval, dispatch and delivery',
            'segments.req.li5': 'Download your order history and consumption reports as PDF',
            'segments.req.cta': 'I am a buyer →',
            'segments.sup.badge': 'Fuel providers',
            'segments.sup.role': 'Dispatch coordinator',
            'segments.sup.quote': '“If I could see every order organized automatically, I would save hours of work every day.”',
            'segments.sup.desc': 'Authorized distributors that serve several corporate clients and want to handle more orders without adding staff or coordination errors.',
            'segments.sup.li1': 'Centralize the requests that today arrive through several channels',
            'segments.sup.li2': 'Validate the payment voucher and approve with one click',
            'segments.sup.li3': 'Assign available tankers and drivers without overlaps',
            'segments.sup.li4': 'Keep your inventory and prices up to date',
            'segments.sup.li5': 'Generate sales reports by client and period',
            'segments.sup.cta': 'I am a provider →',

            'metrics.label': 'Our goals',
            'metrics.title': 'What we want to achieve with FullTank users',
            'metrics.m1': 'Less time spent coordinating orders',
            'metrics.m2': 'Orders confirmed without corrections',
            'metrics.m3': 'To register a complete order',
            'metrics.m4': 'Fewer follow-up calls',
            'metrics.note': 'These are the validation goals defined with our product hypotheses, not results already measured.',

            'testimonials.label': 'User research',
            'testimonials.title': 'What the people who live this problem told us',
            'testimonials.subtitle': 'Quotes gathered in our interviews with fuel buyers and providers.',
            'testimonials.t1.text': '“I send the order on WhatsApp and then I have to call to find out whether it ships today or tomorrow. If the truck does not arrive, the machine stops and the engineer calls me.”',
            'testimonials.t1.name': 'Carlos R.',
            'testimonials.t1.role': 'Logistics coordinator · Construction company, Lima Norte',
            'testimonials.t2.text': '“Orders reach me by call, by email and by message. My whole morning goes into confirming who paid and which tanker leaves first.”',
            'testimonials.t2.name': 'Andrea L.',
            'testimonials.t2.role': 'Dispatch coordinator · Fuel distributor, Callao',
            'testimonials.t3.text': '“The conversation stays in the chat, the voucher in the gallery and the invoice in the inbox. When they ask me for the monthly summary, it takes me ages to put it together.”',
            'testimonials.t3.name': 'Jorge S.',
            'testimonials.t3.role': 'Logistics manager · Transport company, Callao',
            'testimonials.note': 'Company names are omitted at the request of the interviewees.',
            'team.m4.desc': 'Software Engineering student at UPC with knowledge of C++, Python, JavaScript, HTML and CSS. He stands out for his teamwork, his ability to adapt to new challenges and his constant interest in improving his skills.',
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


    // Attach click to all lang buttons
    document.querySelectorAll('.lang-select').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLanguage(currentLang === 'es' ? 'en' : 'es');
        });
    });

    // Init: apply stored language preference on load
    if (currentLang !== 'es') {
        applyLanguage(currentLang);
    }

    // CONTACT FORM (static — no backend, just confirms receipt client-side)
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('form-note');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.reset();
        if (formNote) {
            formNote.hidden = false;
        }
    });
});
