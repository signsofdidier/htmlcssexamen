/* AOS SCRIPT */
AOS.init({
    duration: 1000, // Tijdsduur van de animatie in milliseconden
    easing: 'ease-in-out', // Easing van de animatie

    once: true,  // Animatie gebeurt slechts één keer
});

/* GEOLOCATIE API LEAFLET SCRIPT */

    let map; // Declareer de map variabele voor Leaflet
    let marker; // Declareer de marker variabele voor de gebruikerslocatie


// Initialiseer de kaart en schakel scrollwielzoom uit
map = L.map('map', {
    scrollWheelZoom: false // Standaard uitgeschakeld
}).setView([50.9460, 3.1227], 10); // Roeselare als voorbeeldlocatie

// Zet scrollwielzoom aan wanneer de gebruiker op de kaart klikt
map.on('click', function() {
    map.scrollWheelZoom.enable();
});

// Optioneel: Scrollwielzoom weer uitschakelen als de gebruiker van de kaart afgaat
map.on('mouseout', function() {
    map.scrollWheelZoom.disable();
});



// Voeg OpenStreetMap tiles toe aan de kaart
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    // Functie om succesvol de locatie te krijgen
    function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Verwijder eventuele status berichten
    status.textContent = '';

    // Verplaats de kaart naar de locatie van de gebruiker
    map.setView([latitude, longitude], 13);

    // Als er al een marker is, verplaats deze, anders voeg een nieuwe marker toe
    if (marker) {
    marker.setLatLng([latitude, longitude]);  // Verplaats de bestaande marker
} else {
    marker = L.marker([latitude, longitude]).addTo(map)  // Voeg een nieuwe marker toe
    .bindPopup('Je bent hier!')
    .openPopup();
}
}

    // Functie om fouten te behandelen
    function error() {
    status.textContent = 'Kon je locatie niet verkrijgen.';
}

    // Zoek de knop en status elementen
    const findMeButton = document.getElementById('find-me');
    const status = document.getElementById('status');

    // Event listener voor de knop
    findMeButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
    status.textContent = 'Geolocatie wordt niet ondersteund door jouw browser.';
} else {
    status.textContent = 'Locatie aan het ophalen…';
    navigator.geolocation.getCurrentPosition(success, error);
}
});