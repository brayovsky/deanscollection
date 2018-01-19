const express = require('express');
const app = express();

app.use('/build', express.static('./build'));
app.get('/*', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(3000, () => console.log('Deans collection listening on port 3000!'));
