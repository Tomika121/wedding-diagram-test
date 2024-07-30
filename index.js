const express = require('express');
const app = express();
const port = 3000;
const tableAssignments = require('./tableAssignments');

app.use(express.static('public'));

app.get('/search', (req, res) => {
  const name = req.query.name.trim().toLowerCase();
  let table = null;

  for (const [key, value] of Object.entries(tableAssignments)) {
    if (value.some(n => n.trim().toLowerCase() === name)) {
      table = key;
      break;
    }
  }

  if (table !== null) {
    res.json({ success: true, table });
  } else {
    res.json({ success: false, message: 'NOME NON TROVATO. RIVOLGITI IN SALA!' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});