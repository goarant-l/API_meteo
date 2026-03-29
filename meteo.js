const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const mois = ['jan.', 'fév.', 'mar.', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sep.', 'oct.', 'nov.', 'déc.'];

function fetchMeteo(ville = 'chateaulin') {
    const villeSlug = ville.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');

    const url = `https://prevision-meteo.ch/services/json/${villeSlug}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                afficherErreur("Ville introuvable. Essayez un autre nom.");
                return;
            }
            cacherErreur();
            afficheMeteo(data);
        })
        .catch(() => {
            afficherErreur("Impossible de récupérer la météo. Vérifiez votre connexion.");
        });
}

function afficheMeteo(data) {
    document.getElementById('meteoResult').style.display = 'block';

    // Ville & date
    const now = new Date();
    document.getElementById('titreVille').textContent = data.city_info.name;
    document.getElementById('dateAujourdhui').textContent =
        `${jours[now.getDay()]} ${now.getDate()} ${mois[now.getMonth()]} ${now.getFullYear()}`;

    // Jour actuel
    const j0 = data.fcst_day_0;
    document.getElementById('tempMin').textContent = j0.tmin + '°C';
    document.getElementById('tempMax').textContent = j0.tmax + '°C';
    document.getElementById('imgMeteoJour').src = j0.icon_big;
    document.getElementById('conditionJour').textContent = j0.condition;

    // Stats
    const heures = Object.values(j0.hourly_data);
    const midi = j0.hourly_data['12H00'] || heures[Math.floor(heures.length / 2)];

    document.getElementById('vent').textContent = midi.WNDSPD10m !== undefined ? midi.WNDSPD10m + ' km/h' : '—';
    document.getElementById('humidite').textContent = midi.RH2m !== undefined ? midi.RH2m + ' %' : '—';
    document.getElementById('soleil').textContent = j0.condition || '—';
    document.getElementById('pluie').textContent = midi.APCPsfc !== undefined ? midi.APCPsfc + ' mm' : '—';

    // Prévisions 5 jours
    const prevContainer = document.getElementById('previsions');
    prevContainer.innerHTML = '';

    for (let i = 0; i <= 4; i++) {
        const jour = data[`fcst_day_${i}`];
        if (!jour) continue;

        const date = new Date();
        date.setDate(date.getDate() + i);
        const label = i === 0 ? "Aujourd'hui" : jours[date.getDay()].slice(0, 3) + '.';

        const card = document.createElement('div');
        card.className = 'prev-card' + (i === 0 ? ' today' : '');
        card.innerHTML = `
            <p class="prev-day">${label}</p>
            <img src="${jour.icon_big}" alt="${jour.condition}" />
            <p class="prev-temps">${jour.tmax}° <span>${jour.tmin}°</span></p>
        `;
        prevContainer.appendChild(card);
    }
}

function afficherErreur(msg) {
    const el = document.getElementById('errorMsg');
    el.textContent = msg;
    el.style.display = 'inline-block';
    document.getElementById('meteoResult').style.display = 'none';
}

function cacherErreur() {
    document.getElementById('errorMsg').style.display = 'none';
}

// Événements
document.addEventListener('DOMContentLoaded', () => {
    fetchMeteo('chateaulin');

    document.getElementById('searchBtn').addEventListener('click', () => {
        const ville = document.getElementById('villeInput').value.trim();
        if (ville) fetchMeteo(ville);
    });

    document.getElementById('villeInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const ville = e.target.value.trim();
            if (ville) fetchMeteo(ville);
        }
    });
});
