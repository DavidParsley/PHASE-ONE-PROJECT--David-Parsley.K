// Fetch all products
function fetchAllProducts() {
    fetch("https://phase-one-project-david-parsley-k.onrender.com/products")
        .then((res) => res.json())
        .then((data) => {
            const productsRow = document.getElementById("productsRow")
            productsRow.innerHTML = "" // (Clears existing products to avoid duplicates.) 

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
                                <button onclick="quantityProduct('${product.id}')" id="notAvailable" class="btn btn-success btn-sm mb-2 ms-3">Quantity</button>
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

    fetch("https://phase-one-project-david-parsley-k.onrender.com/products", {
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

// View Product Details
function viewProduct(id) {
    fetch(`https://phase-one-project-david-parsley-k.onrender.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            const viewProductContent = document.getElementById("viewProductContent")
            viewProductContent.innerHTML = `
                <img src="${product.image}" class="img-fluid" alt="${product.name}">
                <br><hr>
                <br>
                <h5>${product.name}</h5>
                <br>
                <p>Price: ${product.price} KSH</p>
                <p>Description: ${product.description}</p>
            `
            const viewProductModal = new bootstrap.Modal(document.getElementById('viewProductModal'))
            viewProductModal.show()
        })
}

// Edit Product
function editProduct(id) {
    fetch(`https://phase-one-project-david-parsley-k.onrender.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById("editProductName").value = product.name
            document.getElementById("editProductPrice").value = product.price
            document.getElementById("editProductImage").value = product.image
            document.getElementById("editProductDescription").value = product.description

            const editProductForm = document.getElementById("editProductForm")
            editProductForm.onsubmit = function(event) {
                event.preventDefault()

                fetch(`https://phase-one-project-david-parsley-k.onrender.com/products/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: document.getElementById("editProductName").value,
                        price: document.getElementById("editProductPrice").value,
                        image: document.getElementById("editProductImage").value,
                        description: document.getElementById("editProductDescription").value
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
                .then(() => {
                    console.log("Product edited")
                    fetchAllProducts()
                    const editProductModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'))
                    editProductModal.hide()
                })
            }
            const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'))
            editProductModal.show()
        })
}


// Delete Product
function deleteProduct(id) {
    fetch(`https://phase-one-project-david-parsley-k.onrender.com/products/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        console.log("Product deleted")
        fetchAllProducts()
    })
}

function quantityProduct(id) {
    id = document.getElementById("notAvailable")
    alert("Feature not yet Available");
}


// Initialize the Website 
document.addEventListener("DOMContentLoaded", () => {
    fetchAllProducts()
})


