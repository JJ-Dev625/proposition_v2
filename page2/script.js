/* --- script.js --- */

// 1. Liste des développeurs
const developpeurs = [
    { nom: "Kombila Enock", type: "frontend", desc: "Expert en design et accessibilité.", portfolio: "#" },
    { nom: "Glaine Mondjo", type: "backend", desc: "Développeur spécialisé en API REST.", portfolio: "#" },
    { nom: "Rony Gael Obiang", type: "frontend", desc: "Passionné par le front-end et l'UX.", portfolio: "#" },
    { nom: "Gédéon Ndong", type: "frontend", desc: "Spécialisé dans l'intégration web.", portfolio: "#" }
];

// 2. Sélection des éléments DOM
const container = document.getElementById('developer-list');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const searchBtn = document.getElementById('searchBtn');
const suggestionsBox = document.getElementById('suggestions');

/**
 * Fonction pour afficher les cartes dans le DOM
 */
function afficherCartes(data) {
    container.innerHTML = ''; 
    
    if (data.length === 0) {
        container.innerHTML = '<p>Aucun développeur ne correspond à votre recherche.</p>';
        return;
    }

    data.forEach(dev => {
        container.innerHTML += `
            <article class="dev-card">
                <div class="dev-photo"></div>
                <h3 class="dev-name">${dev.nom}</h3>
                <p class="dev-role">${dev.type.toUpperCase()}</p>
                <p class="dev-desc">${dev.desc}</p>
                <a href="${dev.portfolio}" class="btn-portfolio">Voir le portfolio →</a>
            </article>
        `;
    });
}

/**
 * Logique de filtrage combiné (Nom + Type)
 */
function filtrerDeveloppeurs() {
    const term = searchInput.value.toLowerCase();
    const type = filterSelect.value;

    const resultats = developpeurs.filter(dev => {
        const matchNom = dev.nom.toLowerCase().includes(term);
        const matchType = (type === 'tous' || dev.type === type);
        return matchNom && matchType;
    });

    afficherCartes(resultats);
}

/**
 * Logique d'autocomplétion
 */
searchInput.addEventListener('input', () => {
    suggestionsBox.innerHTML = '';
    const val = searchInput.value.toLowerCase();
    
    if (val.length > 0) {
        const matches = developpeurs.filter(dev => 
            dev.nom.toLowerCase().includes(val) || 
            dev.type.toLowerCase().includes(val)
        );

        matches.forEach(match => {
            const div = document.createElement('div');
            div.textContent = `${match.nom} (${match.type})`;
            div.onclick = () => {
                searchInput.value = match.nom;
                suggestionsBox.innerHTML = '';
                filtrerDeveloppeurs();
            };
            suggestionsBox.appendChild(div);
        });
    }
});

// 3. Événements
searchBtn.addEventListener('click', filtrerDeveloppeurs);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') filtrerDeveloppeurs();
});

// 4. Initialisation
document.addEventListener('DOMContentLoaded', () => {
    afficherCartes(developpeurs);
});
