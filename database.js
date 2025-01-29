const sql = require('mssql');

// Configuración de la conexión
const config = {
    user: 'developer',
    password: 'QD2024*',
    server: '192.168.50.15', // Ejemplo: 'localhost' o '192.168.1.10'
    database: 'Campana_Digital',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Función para insertar datos
async function insertData(nombre) {
    try {
        await sql.connect(config);
        console.log('Conectado a SQL Server');

        const str = JSON.stringify(nombre);
        await sql.query`
            INSERT INTO Prueba (Nombre) VALUES (${str})
        `;

        console.log('Datos insertados correctamente');
    } catch (err) {
        console.error('Error en la conexión o consulta:', err);
    } finally {
        sql.close();
    }
}

// Exportar la función
module.exports = { insertData };
