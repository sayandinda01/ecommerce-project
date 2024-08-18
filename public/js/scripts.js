document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();

    // Ensure the search form exists before adding event listener
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('searchQuery').value;
            fetchProducts(query);
        });
    }

    // Ensure the category filter exists before adding event listener
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            const categoryId = categoryFilter.value;
            fetchProducts('', categoryId);
        });
    }
});

//
// Fetch and populate categories into the dropdown
function fetchCategories() {
    fetch('/api/categories')
        .then(response => response.json())
        .then(data => {
            const categoryFilter = document.getElementById('categoryFilter');
            categoryFilter.innerHTML = '<option value="">Select a category</option>';
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categoryFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}


// Fetch and display products based on search query and/or category filter
function fetchProducts(query = '', categoryId = '') {
    const url = new URL('/api/products', window.location.origin);
    if (query) url.searchParams.append('query', query);
    if (categoryId) url.searchParams.append('categoryId', categoryId);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            if (productList) {
                productList.innerHTML = ''; // Clear previous products
                if (data.length === 0) {
                    productList.innerHTML = '<p>No products found.</p>';
                } else {
                    data.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.className = 'product';
                        productDiv.innerHTML = `
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Price: $${product.price}</p>
                        `;
                        productList.appendChild(productDiv);
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            alert('Failed to load products. Please try again.');
        });
}
