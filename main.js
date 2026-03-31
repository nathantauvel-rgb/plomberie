document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineDot = document.querySelector('.timeline-dot');

    const isInViewport = el => {
        const rect = el.getBoundingClientRect();
        // L'élément est considéré visible s'il entre par le bas de l'écran (à 150px du bord pour bien voir l'animation)
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 150
        );
    };

    const run = () => {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('is-visible');
            }
        });

        // Animation dynamique de la barre et du point central
        if (timeline && timelineProgress && timelineDot) {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            let progress = (windowHeight / 2 - rect.top) / rect.height;
            progress = Math.max(0, Math.min(1, progress)); // Garde la valeur entre 0 et 1

            const heightPx = progress * rect.height;
            timelineProgress.style.height = `${heightPx}px`;
            timelineDot.style.top = `${heightPx}px`;
        }
    };

    window.addEventListener('scroll', run);
    run(); // Lance la fonction une fois au chargement pour les éléments déjà visibles

    // --- Lightbox Portfolio ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (portfolioItems.length > 0 && lightbox && lightboxImg) {
        portfolioItems.forEach(item => {
            item.style.cursor = 'pointer'; // Rendre cliquable
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Bloquer le scroll de la page principale
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restaurer le scroll
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // Fermeture en cliquant en dehors de l'image (sur le fond sombre)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Fermeture avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});

// Script pour forcer la traduction d'Elfsight
document.addEventListener("DOMContentLoaded", function () {
    // Utiliser un observateur de mutation est plus performant pour le changement de contenu dynamique
    const observer = new MutationObserver(function (mutations) {
        const elementsToTranslate = document.querySelectorAll('.elfsight-app-cd437e8d-3c51-4298-8b46-0d5c8c64a46d, .elfsight-app-cd437e8d-3c51-4298-8b46-0d5c8c64a46d *');

        elementsToTranslate.forEach(el => {
            if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                let text = el.textContent.trim();
                // Dictionnaire de traduction Elfsight
                if (text.toLowerCase() === 'review us on google') el.textContent = 'Voir nos avis sur Google';
                else if (text.toLowerCase() === 'write a review') el.textContent = 'Écrire un avis';
                else if (text.toLowerCase() === 'reviews') el.textContent = 'Avis';
                else if (text.toLowerCase() === 'read more') el.textContent = 'Lire la suite';
                else if (text.includes('days ago')) el.textContent = text.replace('days ago', 'jours');
                else if (text.includes('months ago')) el.textContent = text.replace('months ago', 'mois');
                else if (text.includes('years ago')) el.textContent = text.replace('years ago', 'ans');
                else if (text === 'a month ago') el.textContent = 'il y a 1 mois';
                else if (text === 'a year ago') el.textContent = 'il y a 1 an';
            }
        });
    });

    // On observe le body pour attraper quand Elfsight injecte son code
    observer.observe(document.body, { childList: true, subtree: true });

    // On désactive l'observateur après 15 secondes pour économiser les performances une fois chargé
    setTimeout(() => observer.disconnect(), 15000);
});
