const openPortalBtn = document.getElementById('open-portal-btn');
const gateContainer = document.getElementById('central-gate-container');
const doorLeft = document.getElementById('door-left');
const doorRight = document.getElementById('door-right');
const camera = document.getElementById('camera');
const flashLayer = document.getElementById('flash-screen');
const buildingA = document.getElementById('building-a');
const buildingB = document.getElementById('building-b');

if (openPortalBtn && gateContainer && doorLeft && doorRight && camera && flashLayer) {
    openPortalBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const targetUrl = this.getAttribute('href');

        // Masque le bouton
        this.classList.add('hidden');
        this.style.pointerEvents = 'none';

        // Animation de recul de la caméra
        camera.classList.add('pullback');

        // Ouverture des portes après 300ms
        setTimeout(() => {
            doorLeft.style.transform = 'rotateY(100deg)';
            doorLeft.style.opacity = '0';
            doorRight.style.transform = 'rotateY(-100deg)';
            doorRight.style.opacity = '0';

            // Masque les panneaux (si ils existent)
            const panels = gateContainer.querySelectorAll('.gate-panel');
            panels.forEach(panel => {
                panel.style.opacity = '0';
                panel.style.transform = 'scale(0.8)';
            });

            // ⬇️ COULEURS MISES À JOUR (remplace l'or par le bleu néon)
            gateContainer.style.boxShadow = '0 0 60px rgba(74, 144, 226, 0.8), 0 0 120px rgba(74, 144, 226, 0.4)';
            gateContainer.style.borderColor = 'var(--neon-bleu)'; // Utilise la variable CSS
        }, 300);

        // Plongée de la caméra après 700ms
        setTimeout(() => {
            camera.classList.remove('pullback');
            camera.classList.add('dive');
        }, 700);

        // Flash blanc après 1100ms
        setTimeout(() => {
            flashLayer.classList.add('active');
        }, 1100);

        // Transition finale après 1600ms
        setTimeout(() => {
            flashLayer.classList.remove('active');

            setTimeout(() => {
                if (buildingB) buildingB.style.overflowY = 'auto';
                if (buildingA) buildingA.remove();

                document.body.classList.remove('portal-locked');
                document.body.style.overflow = 'auto';

                const scene = document.getElementById('scene-3d');
                if (scene) scene.remove();

                if (buildingB) {
                    buildingB.style.position = 'relative';
                    buildingB.style.transform = 'none';
                    buildingB.style.width = '100%';
                    buildingB.style.height = 'auto';
                    buildingB.style.minHeight = '100vh';
                }

                if (targetUrl) {
                    window.location.href = targetUrl;
                }
            }, 400);
        }, 1600);
    });
}