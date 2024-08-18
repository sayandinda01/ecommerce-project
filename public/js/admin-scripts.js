// Add a new product
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            price: price,
            category: category,
            description: description
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added successfully');
        loadProducts(); // Refresh the product list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add product. Please try again.');
    });
}


// Update an existing product
function updateProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const description = document.getElementById('productDescription').value;

    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            price: price,
            category: category,
            description: description
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Product updated successfully');
        loadProducts(); // Refresh the product list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update product. Please try again.');
    });
}

// Delete a product
function deleteProduct() {
    const id = document.getElementById('productId').value;

    fetch(`/api/products/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Product deleted successfully');
        loadProducts(); // Refresh the product list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete product. Please try again.');
    });
}

// Add a new category
function addCategory() {
    const name = document.getElementById('categoryName').value;

    fetch('/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Category added successfully');
        loadCategories(); // Refresh the category list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add category. Please try again.');
    });
}

// Update an existing category
function updateCategory() {
    const id = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value;

    fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Category updated successfully');
        loadCategories(); // Refresh the category list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update category. Please try again.');
    });
}

// Delete a category
function deleteCategory() {
    const id = document.getElementById('categoryId').value;

    fetch(`/api/categories/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Category deleted successfully');
        loadCategories(); // Refresh the category list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete category. Please try again.');
    });
}

// Load and display products
function loadProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            productList.innerHTML = ''; // Clear the list

            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <p>Description: ${product.description}</p>
                    <button onclick="populateProductForm(${product.id}, '${product.name}', ${product.price}, '${product.category}', '${product.description}')">Edit</button>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load products. Please try again.');
        });
}

// Populate the product form with existing product details
function populateProductForm(id, name, price, category, description) {
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('productPrice').value = price;
    document.getElementById('productCategory').value = category;
    document.getElementById('productDescription').value = description;
}

// Load and display categories
function loadCategories() {
    fetch('/api/categories')
        .then(response => response.json())
        .then(categories => {
            const categoryList = document.getElementById('categoryList');
            categoryList.innerHTML = ''; // Clear the list

            categories.forEach(category => {
                const categoryItem = document.createElement('div');
                categoryItem.className = 'category-item';
                categoryItem.innerHTML = `
                    <h3>${category.name}</h3>
                    <button onclick="populateCategoryForm(${category.id}, '${category.name}')">Edit</button>
                `;
                categoryList.appendChild(categoryItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load categories. Please try again.');
        });
}

// Populate the category form with existing category details
function populateCategoryForm(id, name) {
    document.getElementById('categoryId').value = id;
    document.getElementById('categoryName').value = name;
}

// Event listeners for form submissions
document.getElementById('addProductForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    addProduct();
});

document.getElementById('updateProductForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    updateProduct();
});

document.getElementById('deleteProductForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    deleteProduct();
});

document.getElementById('addCategoryForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    addCategory();
});

document.getElementById('updateCategoryForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    updateCategory();
});

document.getElementById('deleteCategoryForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    deleteCategory();
});

// Initial load of products and categories
window.onload = function() {
    loadProducts();
    loadCategories();
};
