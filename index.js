// Adição do listener no botão de pesquisa
document.getElementById('scrapeBtn').addEventListener('click', async () => {
	const keyword = document.getElementById('keyword').value;

	// Verificando se a palavra-chave foi fornecida
	if (!keyword) {
		alert('Insira uma palavra-chave');
		return;
	}

	try {
		//Consultando o servidor
		const response = await fetch(
			`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
		);

		const data = await response.json();

		displayResults(data);
	} catch (error) {
		//Tratamento de erros
		console.error('Error:', error);
		alert('Ocorreu um erro durante o scrape');
	}
});

// Função para exibir os resultados na página
function displayResults(products) {
	const resultsContainer = document.getElementsByTagName('section');
	resultsContainer[0].innerHTML = '';

	if (products.length === 0) {
		resultsContainer.innerHTML = '<p>Nenhum produto encontrado...</p>';
		return;
	}

	products.forEach((product) => {
		const productDiv = document.createElement('div');
		productDiv.classList.add('product');

		const image = document.createElement('img');
		image.src = product.imageUrl;

		const title = document.createElement('h3');
		title.textContent = product.title;

		const rating = document.createElement('p');
		rating.textContent = `Rating: ${product.rating}`;

		const numReviews = document.createElement('p');
		numReviews.textContent = `Number of Reviews: ${product.numReviews}`;

		productDiv.appendChild(image);
		productDiv.appendChild(title);
		productDiv.appendChild(rating);
		productDiv.appendChild(numReviews);

		resultsContainer[0].appendChild(productDiv);
	});
}
