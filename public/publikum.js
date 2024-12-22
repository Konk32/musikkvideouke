// Opprett forbindelse til serveren via socket.io
const socket = io();

// Når en ny forbindelse er etablert, vil vi vente på oppdaterte gruppedata
socket.on('update', function(groups) {
    displayGroups(groups);  // Oppdater gruppene på publikum-siden
});

// Funksjon for å vise grupper og poeng i sanntid
function displayGroups(groups) {
    const groupListDiv = document.getElementById('group-list');
    groupListDiv.innerHTML = '';  // Tøm eksisterende data

    // Sorter gruppene etter poeng (høyest poeng først)
    groups.sort((a, b) => b.points - a.points);

    groups.forEach(function(group) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');

        // Legg til bilde
        const imgElement = document.createElement('img');
        imgElement.src = group.image || '';  // Bruk bilde-URL
        imgElement.alt = group.name;
        imgElement.classList.add('group-image');

        // Legg til gruppenavn
        const groupName = document.createElement('span');
        groupName.classList.add('group-name');
        groupName.textContent = group.name;

        // Legg til poeng
        const points = document.createElement('span');
        points.classList.add('points');
        points.textContent = `Poeng: ${group.points}`;

        // Høyest poeng får en spesiell markering
        if (group.points === groups[0].points) {
            groupDiv.classList.add('top-group');
        }

        // Sett sammen innholdet
        groupDiv.appendChild(imgElement);
        groupDiv.appendChild(groupName);
        groupDiv.appendChild(points);

        // Legg til i gruppelisten
        groupListDiv.appendChild(groupDiv);
    });
}
