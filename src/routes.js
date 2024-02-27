import scrape from './scraper.js';

export default function setupRoutes(app) {
	// Rota para iniciar o processo de scraping
	app.get('/api/scrape', async (req, res) => {
		try {
			// Permissão de Cors
			res.setHeader("Access-Control-Allow-Origin", "*")

			const keyword = req.query.keyword;

			// Verificando se o parâmetro de palavra-chave foi fornecido
			if (!keyword) {
				throw new error.status(400).json({
					error: 'Palavra-chave não fornecida',
				});
			}

			// Chamando a função que fará o scraper
			const products = await scrape(keyword);

			// Retorno dos produtos
			res.json(products);
		} catch (error) {
			// Lidando com erros
			if (error.status !== 200) {
				console.error('Erro ao realizar scraping:', error);
				res.status(500).json({ error: 'Erro ao realizar scraping' });
			}
		}
	});
}
