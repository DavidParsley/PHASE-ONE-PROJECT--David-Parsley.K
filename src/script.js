// Fetch all products
function fetchAllProducts() {
    fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
            const productsRow = document.getElementById("productsRow")
            
            data.forEach(product => {
                productsRow.innerHTML += `
                    <div class="col-md-3 mb-4">
                        <div class="card bg-white">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">Price: ${product.price} KSH</p>
                                <button onclick="viewProduct('${product.id}')" class="btn btn-primary btn-sm mb-2">View</button>
                                <button onclick="editProduct('${product.id}')" class="btn btn-warning btn-sm mb-2 ms-3">Edit</button>
                                <button onclick="quantityProduct('${product.id}')" class="btn btn-success btn-sm mb-2 ms-3">Quantity</button>
                                <button onclick="deleteProduct('${product.id}')" class="btn btn-danger btn-sm ms-4">Delete</button>
                            </div>
                        </div>
                    </div>
                `
            })
        })
}