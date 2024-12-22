let data = [];  // For å lagre dataene fra Excel-filen

// Funksjon for å lese Excel-fil og vise dataene
document.getElementById('excel-file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (!file) {
        alert('Vennligst velg en fil!');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Antar at dataene er i første ark
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Hent dataene og vis dem
        displayData(rows);
    };

    reader.readAsBinaryString(file);
});

// Funksjon for å vise dataene i admin-grensesnittet
function displayData(dataRows) {
    data = dataRows;  // Lagre dataene i den globale variabelen
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Tøm eksisterende data

    // Gå gjennom alle rader i dataene og vis dem
    data.forEach(function(row, index) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('group-row');
        
        // Bilde
        const imgElement = document.createElement('img');
        imgElement.src = row[1] || '';  // Bilde-URL i andre kolonne
        imgElement.style.width = '50px';
        imgElement.style.height = '50px';
        imgElement.style.objectFit = 'cover';

        // Knapp for å endre bilde
        const uploadImageButton = document.createElement('button');
        uploadImageButton.innerText = 'Endre Bilde';
        uploadImageButton.onclick = function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = function(e) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imgElement.src = e.target.result;  // Oppdater bilde med nytt
                };
                reader.readAsDataURL(fileInput.files[0]);
            };

            // Prompt for image source (URL or Local)
            const imageSource = prompt("Skriv 'lokal' for å laste opp bilde fra din maskin, eller lim inn URL for å laste opp bilde fra internett.");
            if (imageSource && imageSource.toLowerCase() === 'lokal') {
                fileInput.click();
            } else if (imageSource && imageSource.toLowerCase() === 'url') {
                const imageUrl = prompt("Lim inn URL til bildet:");
                imgElement.src = imageUrl;  // Sett bilde fra URL
            }
        };

        // Gruppe-navn
        const groupNameInput = document.createElement('input');
        groupNameInput.value = row[0] || '';  // Gruppe-navn i første kolonne
        groupNameInput.style.width = '150px';

        // Poeng
        const pointsDisplay = document.createElement('span');
        pointsDisplay.innerText = row[2] || 0;  // Poeng i tredje kolonne, sett standard til 0
        pointsDisplay.classList.add('points-display');
        
        // Felt for å legge til eller trekke fra poeng
        const addPointsInput = document.createElement('input');
        addPointsInput.type = 'number';
        addPointsInput.placeholder = 'Legg til/trekk poeng';
        addPointsInput.style.width = '100px';

        // Knapp for å oppdatere poeng
        const addPointsButton = document.createElement('button');
        addPointsButton.innerText = 'Oppdater';
        addPointsButton.onclick = function() {
            const pointsToAdd = parseInt(addPointsInput.value);
            if (!isNaN(pointsToAdd)) {
                row[2] = (parseInt(row[2]) || 0) + pointsToAdd;  // Oppdater poeng, sett default til 0 hvis NaN
                pointsDisplay.innerText = row[2];  // Vis oppdatert poeng
            }
            // Nullstill input-feltet etter oppdatering
            addPointsInput.value = '';
        };

        // Legg til event for Enter-tast for oppdatering av poeng
        addPointsInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addPointsButton.click();  // Klikk på oppdater-knappen når Enter trykkes
            }
        });

        // Vise oppdatert poengsum
        rowDiv.appendChild(imgElement);
        rowDiv.appendChild(uploadImageButton);
        rowDiv.appendChild(groupNameInput);
        rowDiv.appendChild(addPointsInput);
        rowDiv.appendChild(addPointsButton);
        rowDiv.appendChild(pointsDisplay);  // Poengsummen legges til helt til høyre

        outputDiv.appendChild(rowDiv);
        
        // Oppdater data-arrayet når gruppenavn endres
        groupNameInput.addEventListener('input', function() {
            data[index][0] = groupNameInput.value;
        });

        // Oppdater data-arrayet når bilde-URL endres
        imgElement.addEventListener('load', function() {
            data[index][1] = imgElement.src;  // Oppdater bilde-URL
        });
    });
}

// Funksjon for å laste ned dataene som et Excel-dokument
document.getElementById('download-button').addEventListener('click', function() {
    const wb = XLSX.utils.book_new();
    
    // Lag en kopi av dataene og ekskluder bilder som er lastet inn fra URL
    const dataForExcel = data.map(row => [row[0], row[2]]);
    const ws = XLSX.utils.aoa_to_sheet(dataForExcel);

    // Legg til arkene til arbeidsboken
    XLSX.utils.book_append_sheet(wb, ws, 'Grupper');
    
    // Lagre arbeidsboken som en Excel-fil
    XLSX.writeFile(wb, 'gruppedata.xlsx');
});

// Når admin endrer poeng
socket.emit('updateGroups', updatedGroups);  // Sender nye gruppedata til alle tilkoblede klienter
