import { BASE_URL } from './constants';

export default async function scrape() {
	// URL de busca da Amazon com a palavra-chave fornecida
	const url = `${BASE_URL}${keyword}`;

	// Obtendo o HTML da página de resultados de pesquisa
	const response = await axios.get(url, {
		headers: {
			Accept: 'application/json',
			'User-Agent': 'axios 1.6.7',
		},
	});

	const html = response.data;

	// Usando Cheerio para analisar o HTML
	const $ = load(html);

	// Array para armazenar os detalhes dos produtos
	const products = [];

	// Iterando sobre cada listagem de produto na primeira página de resultados de pesquisa
	$('.s-result-item').each((index, element) => {
		// Extrair detalhes do produto
		const title = $(element).find('h2 span').text();
		const rating = $(element).find('.a-icon-star-small span').text();
		const numReviews = $(element)
			.find('.a-size-small .a-link-normal')
			.text();
		const imageUrl = $(element).find('img').attr('src');

		// Adicionando os detalhes do produto ao array
		if (title && rating) {
			products.push({ title, rating, numReviews, imageUrl });
		}
	});

	return products;
}
