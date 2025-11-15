let express = require('express');
let path = require('path');
let app = express();

// Configurar tipos MIME correctos
app.use(express.static(path.join(__dirname, 'front/dist/front/browser'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Manejar todas las rutas para SPA
app.get('/*', (req, resp) => {
    resp.sendFile(path.join(__dirname, 'front/dist/front/browser/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Front-end server started on port ${port}`);