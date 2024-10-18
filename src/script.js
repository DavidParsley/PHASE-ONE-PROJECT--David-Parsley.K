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

// Add Product
const addProductForm = document.getElementById("addProductForm")
const addProductButton = document.getElementById("addProduct")

addProductButton.addEventListener("click", () => {
    addProductForm.reset()
    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'))
    addProductModal.show()
})

addProductForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = document.getElementById("productName").value
    const price = document.getElementById("productPrice").value
    const image = document.getElementById("productImage").value
    const description = document.getElementById("productDescription").value

    fetch("http://localhost:3000/products", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            price: price,
            image: image,
            description: description
        }),
        headers: {
            'Content-type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((product) => {
        console.log("Product added:", product)
        fetchAllProducts()
        const addProductModal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'))
        addProductModal.hide() 
        console.log("Finished adding product")
    })
})