const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const usuarios = {
    admin: bcrypt.hashSync("1234", 10),
    sans: bcrypt.hashSync("undertale", 10)
};

app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (usuarios[usuario] && await bcrypt.compare(contrasena, usuarios[usuario])) {
        res.json({ exito: true, usuario });
    } else {
        res.json({ exito: false });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));