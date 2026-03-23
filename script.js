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
    'Freelancer na 99Freelas',
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
        const nome = document.getElementById('nome')?.value || '';
        alert(`✨ Obrigado ${nome}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve. ✨`);
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
        
        respostaGemini.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Processando sua pergunta...';
        
        setTimeout(() => {
            const perguntaLower = pergunta.toLowerCase();
            let resposta = '';
            
            // ========== PERGUNTAS SOBRE EXPERIÊNCIA ==========
            if (perguntaLower.includes('experiência') || perguntaLower.includes('trabalho') || perguntaLower.includes('freelancer') || perguntaLower.includes('99freelas')) {
                resposta = `<strong>💼 Experiência Profissional:</strong><br><br>
                Renato trabalhou como <strong>Freelancer Full Stack Developer na 99Freelas</strong> (Fevereiro 2024 - Maio 2025).<br><br>
                <strong>Principais atividades:</strong><br>
                • Manutenção e melhoria contínua de sistemas, correção de bugs e implementação de novas funcionalidades<br>
                • Realização de testes unitários e de integração, assegurando qualidade do código<br>
                • Desenvolvimento em Java e C#, atuando em sistemas corporativos<br>
                • Documentação técnica de softwares, detalhando funcionalidades e uso<br>
                • Criação de painéis e relatórios para acompanhamento de atividades<br>
                • Suporte e atendimento a clientes, oferecendo soluções e orientações<br>
                • Acompanhamento das tendências do mercado, identificando novas oportunidades`;
            }
            
            // ========== PERGUNTAS SOBRE FORMAÇÃO ==========
            else if (perguntaLower.includes('formação') || perguntaLower.includes('faculdade') || perguntaLower.includes('universidade') || perguntaLower.includes('estuda') || perguntaLower.includes('ceub')) {
                resposta = `<strong>🎓 Formação Acadêmica:</strong><br><br>
                📚 <strong>Engenharia de Software</strong> - UniCEUB (Dezembro 2025 - Dezembro 2027)<br>
                📖 <strong>Status:</strong> Cursando<br><br>
                📚 <strong>Engenharia da Computação</strong> - UniCEUB (Fevereiro 2024 - Dezembro 2025)<br>
                📖 <strong>Status:</strong> 4º semestre - Trancado`;
            }
            
            // ========== PERGUNTAS SOBRE HABILIDADES ==========
            else if (perguntaLower.includes('habilidade') || perguntaLower.includes('sabe fazer') || perguntaLower.includes('tecnologia') || perguntaLower.includes('stack') || perguntaLower.includes('linguagem')) {
                resposta = `<strong>💻 Principais Habilidades Técnicas:</strong><br><br>
                🔹 <strong>Linguagens:</strong> Python (Avançado), JavaScript (Avançado), Java (Intermediário), C# (Intermediário), SQL (Avançado)<br>
                🔹 <strong>Frameworks:</strong> React.js, Node.js<br>
                🔹 <strong>Bancos de Dados:</strong> PostgreSQL, MySQL, Oracle<br>
                🔹 <strong>Data & Analytics:</strong> Power BI, Excel Avançado, VBA<br>
                🔹 <strong>Cloud & DevOps:</strong> AWS (em aprendizado), Git, GitHub, n8n<br>
                🔹 <strong>Web:</strong> HTML5, CSS3, JavaScript`;
            }
            
            // ========== PERGUNTAS SOBRE CERTIFICAÇÕES ==========
            else if (perguntaLower.includes('certificação') || perguntaLower.includes('curso') || perguntaLower.includes('certificado') || perguntaLower.includes('hashtag') || perguntaLower.includes('oneroamap')) {
                resposta = `<strong>🏆 Certificações e Cursos:</strong><br><br>
                <strong>Hashtag Treinamentos - Comunidade Impressionadora:</strong><br>
                • Python Impressionador<br>
                • SQL Impressionador<br>
                • Power BI Impressionador<br>
                • VBA Impressionador<br>
                • Excel Avançado<br>
                • HTML Impressionador<br>
                • CSS Impressionador<br>
                • JavaScript Impressionador<br>
                • React Impressionador<br>
                • Node.js Impressionador<br><br>
                <strong>OneRoadmap:</strong><br>
                • Java – Programação Orientada a Objetos<br>
                • Inglês – Leitura, escrita e conversação<br><br>
                <strong>Em Andamento:</strong><br>
                • IBM Data Engineering Professional Certificate (Coursera)<br>
                • AWS Cloud Practitioner`;
            }
            
            // ========== PERGUNTAS SOBRE PROJETOS ==========
            else if (perguntaLower.includes('projeto') || perguntaLower.includes('github') || perguntaLower.includes('repositório') || perguntaLower.includes('desenvolveu')) {
                resposta = `<strong>🚀 Projetos em Destaque:</strong><br><br>
                📌 <strong>PortfolioHUB:</strong> Portfólio profissional desenvolvido com HTML, CSS e JavaScript, integrado com GitHub Pages e Google Gemini.<br><br>
                📌 <strong>Oracle 19c Database Administration:</strong> Configuração e administração de instâncias Oracle em Rocky Linux via SSH.<br><br>
                📌 <strong>Automação Notion - Agente Python:</strong> Sistema automatizado de rotinas diárias com integração de APIs e geração de conteúdo estruturado.<br><br>
                📌 <strong>Dashboard Power BI:</strong> Dashboard interativo para análise de dados empresariais com métricas e KPIs.<br><br>
                📌 <strong>E-commerce Full Stack:</strong> Aplicação completa com React, Node.js e PostgreSQL.<br><br>
                🔗 <strong>GitHub:</strong> https://github.com/renatocoder`;
            }
            
            // ========== PERGUNTAS SOBRE CONTATO ==========
            else if (perguntaLower.includes('contato') || perguntaLower.includes('email') || perguntaLower.includes('telefone') || perguntaLower.includes('whatsapp') || perguntaLower.includes('falar')) {
                resposta = `<strong>📞 Contato:</strong><br><br>
                📧 <strong>E-mail:</strong> montandonrenato@gmail.com<br>
                📱 <strong>WhatsApp:</strong> (61) 99988-2903<br>
                🔗 <strong>LinkedIn:</strong> https://www.linkedin.com/in/renato-amaral-montandon-a7ab1a291/<br>
                💻 <strong>GitHub:</strong> https://github.com/renatocoder<br>
                📍 <strong>Localização:</strong> Asa Sul, Brasília - DF<br><br>
                <em>Use o formulário de contato do portfólio para enviar mensagem direta!</em>`;
            }
            
            // ========== PERGUNTAS SOBRE OBJETIVOS ==========
            else if (perguntaLower.includes('objetivo') || perguntaLower.includes('meta') || perguntaLower.includes('carreira') || perguntaLower.includes('futuro') || perguntaLower.includes('data engineering')) {
                resposta = `<strong>🎯 Objetivos Profissionais:</strong><br><br>
                Renato está focado em se tornar um <strong>Engenheiro de Dados</strong>, com interesse em:<br><br>
                ✅ Data Engineering<br>
                ✅ Big Data e Cloud Computing (AWS)<br>
                ✅ ETL/ELT Pipelines<br>
                ✅ Data Warehousing<br>
                ✅ Análise e Visualização de Dados<br>
                ✅ Machine Learning (futuro)<br><br>
                Atualmente cursando <strong>IBM Data Engineering Professional Certificate</strong> no Coursera e buscando estágio na área de TI.`;
            }
            
            // ========== PERGUNTAS SOBRE SOFT SKILLS ==========
            else if (perguntaLower.includes('soft skill') || perguntaLower.includes('qualidades') || perguntaLower.includes('perfil') || perguntaLower.includes('características')) {
                resposta = `<strong>🌟 Soft Skills:</strong><br><br>
                ✅ <strong>Comunicação eficaz</strong> com colegas e clientes<br>
                ✅ <strong>Adaptabilidade</strong> a novas tecnologias e ferramentas<br>
                ✅ <strong>Aprendizado autônomo</strong> e rápido<br>
                ✅ <strong>Adaptabilidade</strong> às mudanças do mercado<br>
                ✅ <strong>Organização</strong> na otimização do ambiente de trabalho<br>
                ✅ <strong>Pontualidade</strong> na conclusão dos projetos<br>
                ✅ <strong>Colaboração</strong> em equipes multidisciplinares`;
            }
            
            // ========== PERGUNTAS SOBRE QUEM É ==========
            else if (perguntaLower.includes('quem é') || perguntaLower.includes('sobre') || perguntaLower.includes('apresente') || perguntaLower.includes('quem é renato')) {
                resposta = `<strong>👨‍💻 Sobre Renato Amaral Montandon:</strong><br><br>
                Sou estudante de <strong>Engenharia de Software</strong> na UniCEUB, com experiência prática como <strong>Desenvolvedor Full Stack Freelancer na 99Freelas</strong>.<br><br>
                Possuo formação complementar em Python, JavaScript, SQL, Power BI, Inteligência Artificial, Automação, AWS e Full Stack Development.<br><br>
                Tenho forte interesse em <strong>Cibersegurança, Ciência de Dados e Inteligência Artificial</strong>, áreas onde busco desenvolver habilidades avançadas.<br><br>
                <strong>Objetivo:</strong> Me tornar um Engenheiro de Dados de alto nível e contribuir para soluções tecnológicas inovadoras.`;
            }
            
            // ========== PERGUNTAS SOBRE IDIOMAS ==========
            else if (perguntaLower.includes('idioma') || perguntaLower.includes('inglês') || perguntaLower.includes('português')) {
                resposta = `<strong>🌐 Idiomas:</strong><br><br>
                🇧🇷 <strong>Português:</strong> Língua materna (Fluente)<br>
                🇬🇧 <strong>Inglês:</strong> Intermediário Alto - Leitura técnica, comunicação profissional e conversação<br><br>
                <em>Certificação de inglês pela OneRoadmap</em>`;
            }
            
            // ========== SAUDAÇÕES ==========
            else if (perguntaLower.includes('oi') || perguntaLower.includes('olá') || perguntaLower.includes('ola') || perguntaLower.includes('bom dia') || perguntaLower.includes('boa tarde') || perguntaLower.includes('boa noite')) {
                resposta = `Olá! 😊 Sou o assistente virtual do PortfolioHUB do Renato Amaral Montandon. Como posso ajudar você hoje?<br><br>
                Pergunte sobre:<br>
                📌 Formação acadêmica<br>
                📌 Habilidades técnicas<br>
                📌 Experiência profissional<br>
                📌 Certificações e cursos<br>
                📌 Projetos no GitHub<br>
                📌 Objetivos de carreira<br>
                📌 Contato`;
            }
            
            // ========== PERGUNTAS SOBRE AJUDA ==========
            else if (perguntaLower.includes('ajuda') || perguntaLower.includes('o que você sabe') || perguntaLower.includes('o que pode fazer')) {
                resposta = `<strong>🤖 Como posso ajudar:</strong><br><br>
                Posso responder perguntas sobre:<br><br>
                📌 <strong>Quem é Renato</strong> (apresentação)<br>
                📌 <strong>Formação acadêmica</strong> (UniCEUB)<br>
                📌 <strong>Habilidades técnicas</strong> (Python, SQL, JavaScript, Java, etc.)<br>
                📌 <strong>Certificações e cursos</strong> (Hashtag, OneRoadmap)<br>
                📌 <strong>Experiência profissional</strong> (99Freelas)<br>
                📌 <strong>Projetos no GitHub</strong><br>
                📌 <strong>Objetivos e carreira</strong> (Data Engineering)<br>
                📌 <strong>Soft Skills</strong><br>
                📌 <strong>Contato</strong><br><br>
                Pergunte de forma natural! 😊`;
            }
            
            // ========== RESPOSTA PADRÃO ==========
            else {
                resposta = `🤔 <strong>Não entendi sua pergunta sobre "${pergunta}".</strong><br><br>
                Mas posso ajudar com perguntas como:<br><br>
                📌 "Qual a experiência do Renato?"<br>
                📌 "Onde ele estuda?"<br>
                📌 "O que ele sabe fazer?"<br>
                📌 "Quais certificações ele possui?"<br>
                📌 "Quais projetos ele desenvolveu?"<br>
                📌 "Quais são seus objetivos?"<br>
                📌 "Como entro em contato?"<br><br>
                Tente perguntar de forma natural! 😊`;
            }
            
            respostaGemini.innerHTML = `💬 <strong>Você perguntou:</strong> "${pergunta}"<br><br>🤖 <strong>Resposta:</strong><br>${resposta}`;
            perguntaGemini.value = '';
        }, 500);
    });
    
    perguntaGemini.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnGemini.click();
        }
    });
}

console.log('✨ PortfolioHUB - Renato Amaral Montandon carregado com sucesso! ✨');
console.log('🤖 Assistente IA - Gemini ativado!');
