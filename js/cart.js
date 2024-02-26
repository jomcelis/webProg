if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

updateCartTotal()

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.querySelectorAll('.btn-primary');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', addToCartClicked);
    });
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartRow = buttonClicked.closest('.cart-row');
    var priceElement = cartRow.querySelector('.unit-price');
    var price = parseFloat(priceElement.innerText.replace('₱', ''));
    var quantityElement = cartRow.querySelector('.quantity-input');
    var quantity = quantityElement.value;

    // Subtract the removed item's price from the total
    var subtotal = price * quantity;
    var total = parseFloat(document.querySelector('.total-price').innerText.replace('₱', '')) - subtotal;

    total = Math.round(total * 100) / 100;
    document.querySelector('.total-price').innerText = '₱' + total;

    cartRow.remove();
}


function addToCartClicked(event) {
    console.log("Add to Cart button clicked");
    console.trace(); // Log the call stack for debugging purposes

    var button = event.target;
    var shopItem = button.closest('.shop-item')
    var title = shopItem.querySelector('.card-title').innerText;
    var price = shopItem.querySelector('.price').innerText;
    var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
    addItemToCart(title, price, imageSrc)
    //console.log("Before" + title, price, imageSrc)

    
    // Move the updateCartTotal() call here
    //console.log(price)
    updateCartTotal()
    //console.log("After:" + title, price, imageSrc)

}


function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('card-title');
    
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in your cart!');
            return;
        }
    }
    var cartRowContents =  `                            <div class="cart-row">
    <!-- Card -->
    <div class="card border-warning mb-3" style="width: 18rem;">
        <div class="col-sm-5">
            <img class="card-img-top" src="${imageSrc}" style="width: 15vw;" alt="Suresh Dasari Card">
        </div>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin.</p>
            <!-- Qty Input -->
            <div class="row">
                <div class="col">
                    <div class="custom-num">
                        <i class="fas fa-angle-up arr-up"></i>
                        <input
                            type="number"
                            class="quantity-input"
                            min="0"
                            max="10"
                            value="1"
                            data-color="#black"
                        />
                        <i class="fas fa-angle-down arr-down"></i>
                    </div>   
                </div>
                <div class="col d-flex align-items-center">
                    <a class="btn btn-danger">Remove</a>
                </div>  
            </div>

            <div class="row">
                <div class="col" style="margin-top: 10px;">
                    <h4>Price:</h4>
                </div>
                <div class="col" style="margin-top: 10px;">
                    <div class="d-flex justify-content-end">
                        <span class="unit-price">${price}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Card -->
    
</div>`
    
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',
    removeCartItem)
}

function updateCartTotal() {
    var cartRows = document.querySelectorAll('.cart-row');
    var total = 0;

    cartRows.forEach(function(cartRow, index) {
        // Assuming you want to exclude row 3
        if (index !== 2) {
            var priceElement = cartRow.querySelector('.unit-price');
            var quantityElement = cartRow.querySelector('.quantity-input');

            // Ensure elements are found
            if (priceElement && quantityElement) {
                var price = parseFloat(priceElement.textContent.replace('₱', '').trim());
                var quantity = parseFloat(quantityElement.value);

                // Check if price and quantity are valid numbers
                if (!isNaN(price) && !isNaN(quantity)) {
                    var rowTotal = price * quantity;
                    console.log(`Row ${index + 1}: Price = ${price}, Quantity = ${quantity}, Row Total = ${rowTotal}`);
                    total += rowTotal;
                } else {
                    console.error("Invalid price or quantity");
                }
            } else {
                console.error("Missing elements for price or quantity");
            }
        }
    });

    total = Math.round(total * 100) / 100;
    console.log("Final Total: " + total);
    document.querySelector('.total-price').innerText = '₱' + total;
}

// Call the function to update the cart total
updateCartTotal();


const customNum = document.querySelectorAll('.custom-num');

customNum.forEach(num => {
    const numInput = num.querySelector('.quantity-input');
    const arrUp = num.querySelector('.arr-up');
    const arrDown = num.querySelector('.arr-down');
    numInput.style.color = numInput.dataset.color;

    arrUp.addEventListener('click', () => {
        numInput.stepUp();
        updateCartTotal();
    });

    arrDown.addEventListener('click', () => {
        numInput.stepDown();
        updateCartTotal();
    });
});
