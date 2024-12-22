const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

// Bruk JSON parsing for å håndtere POST-forespørsler
app.use(express.json());

// Server statiske filer fra admin-mappen
app.use(express.static(path.join(__dirname, 'admin')));

// Server statiske filer fra public-mappen for publikum-siden
app.use(express.static(path.join(__dirname, 'public')));

// Dummy-data for grupper og poeng
let grupper = [
  { navn: 'Gruppe 1', poeng: 10 },
  { navn: 'Gruppe 2', poeng: 15 },
  { navn: 'Gruppe 3', poeng: 20 }
];

// Rute for å vise admin.html (admin-siden)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

// Rute for å hente gruppeinformasjon (for publikum-siden)
app.get('/api/grupper', (req, res) => {
  res.json(grupper);
});

// Rute for å oppdatere poeng for en gruppe (admin-side)
app.post('/api/oppdater-poeng', (req, res) => {
  const { gruppeNavn, nyePoeng } = req.body;
  const gruppe = grupper.find(g => g.navn === gruppeNavn);
  
  if (gruppe) {
    gruppe.poeng = nyePoeng;
    res.status(200).json(gruppe);
  } else {
    res.status(404).send('Gruppe ikke funnet');
  }
});

// Start serveren
app.listen(port, () => {
  console.log(`Serveren kjører på http://localhost:${port}`);
});
