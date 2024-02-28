// Adição do listener no botão de pesquisa
document.getElementById('scrapeBtn').addEventListener('click', async () => {
	const keyword = document.getElementById('keyword').value;
	const titleElement = document.getElementsByTagName('h1')[0];
	const currentTitle = titleElement.textContent;
	const lastM = currentTitle.lastIndexOf('m');
	const newText =
		currentTitle.slice(0, lastM) + 'o' + currentTitle.slice(lastM);
	titleElement.textContent = newText;

	// Verificando se a palavra-chave foi fornecida
	if (!keyword) {
		alert('Insira uma palavra-chave');
		return;
	}

	try {
		//Consultando o servidor
		const response = await fetch(
			`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(
				keyword
			)}`
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

		const imageDiv = document.createElement('div');
		imageDiv.classList.add('image-container');

		const image = document.createElement('img');
		image.src = product.imageUrl;

		imageDiv.appendChild(image);

		const infoDiv = document.createElement('div');
		infoDiv.classList.add('info-container');

		const title = document.createElement('h3');
		title.textContent = product.title;

		const rating = document.createElement('p');
		rating.textContent = `Nota: ${product.rating}`;

		const numReviews = document.createElement('p');
		numReviews.textContent = `Avaliações: ${product.numReviews}`;

		infoDiv.appendChild(title);
		infoDiv.appendChild(rating);
		infoDiv.appendChild(numReviews);

		productDiv.appendChild(imageDiv);
		productDiv.appendChild(infoDiv);

		resultsContainer[0].appendChild(productDiv);
	});
}
