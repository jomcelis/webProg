let cartIcone = document.querySelector("#cart");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcone.onclick = () =>{
    cart.classList.add("active");
}

closeCart.onclick = () =>{
    cart.classList.remove("active")
}
