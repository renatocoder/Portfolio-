// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MENU MOBILE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// ============================================
// SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TYPED TEXT EFFECT
// ============================================
const typedTexts = [
    'Estudante de Engenharia de Software', 
    'Desenvolvedor Full Stack', 
    'Freelancer 99Freelas',
    'Futuro Engenheiro de Dados'
];
let typedIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed-text');

function typeEffect() {
    if (!typedElement) return;
    const currentText = typedTexts[typedIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typedIndex = (typedIndex + 1) % typedTexts.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

if (typedElement) {
    typeEffect();
}

// ============================================
// ANIMATE NUMBERS ON SCROLL
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + '+';
            }
        };
        updateNumber();
    });
    animated = true;
}

// ============================================
// ANIMATE LEVEL BARS
// ============================================
function animateLevelBars() {
    const levelBars = document.querySelectorAll('.level-fill');
    levelBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        let width = '0%';
        
        if (level === 'intermediate') width = '66%';
        else if (level === 'advanced') width = '100%';
        
        bar.style.width = width;
    });
}

// ============================================
// INTERSECTION OBSERVER
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-item') && !animated) {
                animateNumbers();
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-item, .projeto-card, .formacao-card, .timeline-item, .skill-category, .cert-item, .language-card').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }
});

// Observar seção de habilidades
const skillsSection = document.querySelector('#habilidades');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLevelBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
}

// ============================================
// PROJECT FILTER
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.projeto-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Obrigado pela mensagem! Entrarei em contato em breve. ✨');
        contactForm.reset();
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.id = 'backToTop';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ASSISTENTE IA - GEMINI (BASEADO NO CURRÍCULO)
// ============================================

const btnGemini = document.getElementById('btn-gemini');
const perguntaGemini = document.getElementById('pergunta-gemini');
const respostaGemini = document.getElementById('resposta-gemini');

if (btnGemini) {
    btnGemini.addEventListener('click', () => {
        const pergunta = perguntaGemini.value.trim();
        if (pergunta === '') {
            respostaGemini.innerHTML = '⚠️ Por favor, digite uma pergunta!';
            return;
        }
        
        respostaGemini.innerHTML = '🤔 Processando sua pergunta...';
        
        setTimeout(() => {
            const perguntaLower = pergunta.toLowerCase();
            let resposta = '';
            
            // ========== PERGUNTAS SOBRE EXPERIÊNCIA ==========
            if (perguntaLower.includes('experiência') || perguntaLower.includes('trabalho') || perguntaLower.includes('freelancer') || perguntaLower.includes('99freelas')) {
                resposta = 'Renato trabalhou como <strong>Freelancer Full Stack Developer na 99Freelas</strong> (Fev 2024 - Mai 2025).<br><br>✅ <strong>Principais atividades:</strong><br>• Manutenção e melhoria contínua de sistemas, correção de bugs<br>• Desenvolvimento em Java e C#<br>• Realização de testes unitários e de integração<br>• Documentação técnica<br>• Suporte e atendimento a clientes<br>• Criação de painéis e relatórios<br>• Acompanhamento de tendências do mercado';
            }
            
            // ========== PERGUNTAS SOBRE FORMAÇÃO ==========
            else if (perguntaLower.includes('formação') || perguntaLower.includes('faculdade') || perguntaLower.includes('universidade') || perguntaLower.includes('estuda') || perguntaLower.includes('ceub')) {
                resposta = '🎓 <strong>Formação Acadêmica:</strong><br><br>📚 <strong>Engenharia de Software</strong> - UniCEUB (Dez 2025 - Dez 2027)<br>📖 <strong>Status:</strong> Cursando<br><br>📚 <strong>Engenharia da Computação</strong> - UniCEUB (Fev 2024 - Dez 2025)<br>📖 <strong>Status:</strong> 4º semestre - Trancado';
            }
            
            // ========== PERGUNTAS SOBRE HABILIDADES ==========
            else if (perguntaLower.includes('habilidade') || perguntaLower.includes('sabe fazer') || perguntaLower.includes('tecnologia') || perguntaLower.includes('stack') || perguntaLower.includes('linguagem')) {
                resposta = '💻 <strong>Principais Habilidades Técnicas:</strong><br><br>🔹 <strong>Linguagens:</strong> Python (Avançado), JavaScript (Avançado), Java (Intermediário), C# (Intermediário), SQL (Avançado)<br>🔹 <strong>Frameworks:</strong> React.js, Node.js<br>🔹 <strong>Bancos de Dados:</strong> PostgreSQL, MySQL, Oracle<br>🔹 <strong>Data & Analytics:</strong> Power BI, Excel Avançado, VBA<br>🔹 <strong>Versionamento:</strong> Git, GitHub';
            }
            
            // ========== PERGUNTAS SOBRE CERTIFICAÇÕES ==========
            else if (perguntaLower.includes('certificação') || perguntaLower.includes('curso') || perguntaLower.includes('certificado') || perguntaLower.includes('hashtag') || perguntaLower.includes('onero
