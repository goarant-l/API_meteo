<div class="meteo-wrapper">

    <div class="search-section">
        <h1 class="main-title">Votre météo en France!</h1>
        <p class="subtitle">Prévisions en temps réel</p>
        <div class="search-bar">
            <input type="text" id="villeInput" placeholder="Rechercher une ville..." autocomplete="off" />
            <button id="searchBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
            </button>
        </div>
        <div id="errorMsg" class="error-msg" style="display:none;"></div>
    </div>

    <div id="meteoResult" style="display:none;">

        <div class="city-header">
            <div>
                <h2 id="titreVille"></h2>
                <p id="dateAujourdhui" class="date-label"></p>
            </div>
            <div class="temp-main">
                <span id="tempMin"></span>
                <span class="temp-sep">–</span>
                <span id="tempMax"></span>
            </div>
        </div>

        <div class="current-card">
            <div class="current-icon-wrap">
                <img id="imgMeteoJour" alt="météo" />
                <p id="conditionJour"></p>
            </div>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-label">Vent</span>
                    <span class="stat-value" id="vent"></span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Humidité</span>
                    <span class="stat-value" id="humidite"></span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Condition</span>
                    <span class="stat-value" id="soleil"></span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Cumul pluie</span>
                    <span class="stat-value" id="pluie"></span>
                </div>
            </div>
        </div>

        <h3 class="previsions-title">Prévisions 5 jours</h3>
        <div class="previsions-grid" id="previsions"></div>

    </div>

</div>