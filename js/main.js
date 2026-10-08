// ---------- Tema mensal ----------
// Por padrão o site usa as cores da escola (branco, amarelo e azul).
// Para ativar a troca automática por mês (Setembro Amarelo / Outubro Rosa),
// mude TEMA_AUTOMATICO para true.
const TEMA_AUTOMATICO = false;
// Para forçar um tema manualmente, coloque a classe direto no <body> no HTML
// (ex.: <body class="tema-setembro-amarelo">) — ela tem prioridade.
const temasPorMes = {
    8: 'tema-setembro-amarelo', // setembro (janeiro = 0)
    9: 'tema-outubro-rosa'      // outubro
};
(function aplicarTemaMensal() {
    const temJaDefinido = [...document.body.classList].some(c => c.startsWith('tema-'));
    if (!TEMA_AUTOMATICO || temJaDefinido) return;
    const tema = temasPorMes[new Date().getMonth()];
    if (tema) document.body.classList.add(tema);
})();

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');
hamburgerBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    document.getElementById('mobileCta').style.display = isOpen ? 'inline-flex' : 'none';
});
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
});

// Scroll reveal
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal-onscroll');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Count-up stats
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const isPlain = el.dataset.plain === 'true';
    const duration = 1400;
    const start = performance.now();
    const startVal = isPlain ? target - 40 : 0;
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.floor(startVal + (target - startVal) * eased);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
    }
    if (reduceMotion) { el.textContent = target + suffix; }
    else requestAnimationFrame(tick);
};
const statsIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(animateCounter);
            statsIo.disconnect();
        }
    });
}, { threshold: 0.4 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsIo.observe(heroStats);

// Lightbox
const photoData = {
    horta: { src: "assets/img/horta.jpg", caption: "Horta — plantio, rega e cuidado com a terra" },
    taekwondo: { src: "assets/img/taekwondo.jpg", caption: "Taekwondo — disciplina e atividade física" },
    zumba: { src: "assets/img/zumba.jpg", caption: "Zumba — movimento, saúde e integração" },
    musica: { src: "assets/img/musica.jpg", caption: "Música — ritmo, expressão e descoberta artística" },
    marcenaria: { src: "assets/img/marcenaria.jpg", caption: "Marcenaria — criatividade e habilidade manual" },
    bazar: { src: "assets/img/bazar.jpg", caption: "Bazar Social — apoio e fortalecimento da comunidade" }
};
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
function openLightbox(key) {
    const data = photoData[key];
    if (!data) return;
    lightboxImg.src = data.src;
    lightboxImg.alt = data.caption;
    lightboxCaption.textContent = data.caption;
    lightbox.classList.add('open');
}
function closeLightbox() {
    lightbox.classList.remove('open');
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });