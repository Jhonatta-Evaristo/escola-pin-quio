const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        hamburgerBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    mainNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
        });
    });
}


/* Carrossel de parceiros: duplica a fila para o loop ficar contínuo (sem "pulo") */
(function () {
    var track = document.getElementById('partnerTrack');
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    Array.prototype.slice.call(track.children).forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        var img = clone.querySelector('img');
        if (img) img.setAttribute('alt', '');
        track.appendChild(clone);
    });
})();
