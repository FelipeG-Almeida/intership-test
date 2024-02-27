import express from 'express';
import cors from 'cors';
import setupRoutes from './routes.js';

const app = express();
app.use(cors);

setupRoutes(app);

// Iniciando o servidor
app.listen(3000, () => {
	console.log(`Servidor rodando em http://localhost:3000`);
});
