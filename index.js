// Importamos las dependencias necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Inicializamos express
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta POST para decodificar JWT
app.post('/decode', (req, res) => {
    try {
        // Verificamos si se envió un token
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).json({
                error: 'Token no proporcionado',
                status: false
            });
        }

        // Decodificamos el token sin verificar la firma
        const decoded = jwt.decode(token);
        console.log('Respuesta deserializada:', JSON.stringify(decoded, null, 2));
        
        // Si el token no es válido, decoded será null
        if (!decoded) {
            return res.status(400).json({
                error: 'Token inválido',
                status: false
            });
        }

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

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});