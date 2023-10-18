let ProductsInCart = localStorage.getItem("ProductsInCart");
let allproducts = document.querySelector(".products");
let Favs = document.querySelector(".fav-list");
let price = document.querySelector(".price");

if (ProductsInCart) {
  ProductsInCart = JSON.parse(ProductsInCart);
  
  drawCartProducts(ProductsInCart);
  drawPrice(ProductsInCart)
}
function drawCartProducts(ProductsInCart) {
  let x = "";

  for (const ProductInCart of ProductsInCart) {
    x += ` 
        <div class="product-item" >
              <img class="product-item-img" src="${ProductInCart.Item.imageUrl}"alt="">

              <div class="product-item-desc">
                <h2> ${ProductInCart.Item.title}</h2>
                <p>the new mobile form oppo company 6-2022</p>
                <span> price :${ProductInCart.Item.price}$</span>
              </div>
              <div class="product-item-action">
                <button type="button" class="btn btn-primary add-to-cart" onclick="RemoveFromCart(${ProductInCart.Item.id})" >Remove From Cart</button>
                
              </div>
              <div class="d-flex ">
                  <button  onclick="removeQnty(${ProductInCart.Item.id})">-</button>
                  ${ProductInCart.quantity}
                  <button onclick="addQnty(${ProductInCart.Item.id})">+</button>
              </div>
              
        </div>
        
    `;
  }

  allproducts.innerHTML = x;
}

let badge = document.querySelector(".badge");
let cartProductDiv = document.querySelector(".carts-products Div");

// drawCartDive;
let shoppingCartIcon = document.querySelector(".shopping-cart");
let cartsproducts = document.querySelector(".carts-products");
shoppingCartIcon.addEventListener("click", openCart);

function openCart() {
  if (cartProductDiv.innerHTML != "") {
    if (cartsproducts.style.display == "block") {
      cartsproducts.style.display = "none";
    } else {
      cartsproducts.style.display = "block";
    }
  }
}
function drawCartDive() {
  cartItems = localStorage.getItem("ProductsInCart")
    ? JSON.parse(localStorage.getItem("ProductsInCart"))
    : [];
  if (cartItems) {
    let cartProductDivTxt = ``;
    for (const cartElement of cartItems) {
      cartProductDivTxt += `
       <div class="text-center">
    <div class="">
      <p>${cartElement.Item.title}</p>
    </div>
    <div class="  d-flex ">
      <button  onclick="removeQnty(${cartElement.Item.id})">-</button>
      ${cartElement.quantity}
      <button onclick="addQnty(${cartElement.Item.id})">+</button>
    </div>
    
      `;
    }
    cartProductDiv.innerHTML = cartProductDivTxt;
    badge.style.display = "block";
    badge.innerHTML = cartItems.length;
  }
}
drawCartDive();
drawFavList();


function RemoveFromCart(id) {
  let ProductsInCart = localStorage.getItem("ProductsInCart");
  ProductsInCart = JSON.parse(ProductsInCart);
  ProductsInCart = ProductsInCart.filter((ProductInCart) => {
    return ProductInCart.Item.id !== id;
  });
  localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart));
  drawCartProducts(ProductsInCart);
  drawPrice(ProductsInCart);

}

function addQnty(id) {
  let ProductsInCart = localStorage.getItem("ProductsInCart");
  ProductsInCart = JSON.parse(ProductsInCart);
  for (const ProductInCart of ProductsInCart) {
    if (ProductInCart.Item.id === id) {
      ProductInCart.quantity += 1;
    }
  }

  localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart));
  drawCartProducts(ProductsInCart);
  drawPrice(ProductsInCart);

  drawCartDive();
}
function removeQnty(id) {
  let ProductsInCart = localStorage.getItem("ProductsInCart");
  ProductsInCart = JSON.parse(ProductsInCart);
  for (const ProductInCart of ProductsInCart) {
    if (ProductInCart.quantity > 1 && ProductInCart.Item.id === id) {
      ProductInCart.quantity -= 1;
    }
  }

  localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart));
  drawCartProducts(ProductsInCart);
  drawPrice(ProductsInCart);
  drawCartDive();
}

function Search(evnt) {
  let ProductsInCart = localStorage.getItem("ProductsInCart");
  ProductsInCart = JSON.parse(ProductsInCart);
  let searchBar = document.getElementById("searchBar").value.toLowerCase();
  ProductsInCart = ProductsInCart.filter((ProductInCart) => {
    return ProductInCart.Item.title.toLowerCase().includes(searchBar);
  });
  drawCartProducts(ProductsInCart);
}
function drawFavList() {

  let FavList = localStorage.getItem("FavList");
  FavList = JSON.parse(FavList);
  let x = "";
  if(FavList.length<1){
    x = " <div> no favourites itmes </div>";
  }
  for (const FavItem of FavList) {
    x += ` 
      <div class="card w-25 px-3"  style="width: 18rem;">
      <img src="${FavItem.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${FavItem.title}</h5>
       <div class="">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <i  class="fav fas fa-heart added-to-favourite" onclick="addToFav(${FavItem.id})"></i>
       </div>
      </div>
    </div>
        
    `;
  }
  
  Favs.innerHTML = x;
}

function addToFav(id){
  let FavList = localStorage.getItem("FavList");
  FavList = JSON.parse(FavList);
  FavList = FavList.filter((favItem)=>{
    return favItem.id !== id;
  })
  localStorage.setItem("FavList", JSON.stringify(FavList));
  drawFavList();
}
function drawPrice(ProductsInCart){
  totalPrices = 0;
  for(const Product of ProductsInCart){
    quantity =Product.quantity
    ItemPrice = Product.Item.price
    totalPrices += (Number(ItemPrice) * Number(quantity));

  }
  
  price.innerHTML = totalPrices + '$';
}

