import express from 'express';
import setupRoutes from './routes.js';

const app = express();

setupRoutes(app);

// Iniciando o servidor
app.listen(3000, () => {
	console.log(`Servidor rodando em http://localhost:3000`);
});
