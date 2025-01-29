const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');  // Agregar CORS
const { insertData } = require('./database');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Habilitar CORS para permitir solicitudes desde el navegador

app.post('/decode', async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                error: 'Token no proporcionado',
                status: false
            });
        }

        const decoded = jwt.decode(token);
        
        if (!decoded) {
            return res.status(400).json({
                error: 'Token inválido',
                status: false
            });
        }

        await insertData(decoded)

        return res.json({
            status: true,
            decoded: {
                header: decoded.header,
                payload: decoded
            }
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Error al decodificar el token',
            details: error.message,
            status: false
        });
    }
});

app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
