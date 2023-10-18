let userinfo = document.querySelector("#user_info");
let userdata = document.querySelector("#user");
let links = document.querySelector("#links");
let cartItems = [];
let FavList = [];

//check user is logged
if (localStorage.getItem("usernames")) {
  links.remove("links");
  userinfo.style.display = "flex";
  userdata.innerHTML = localStorage.getItem("usernames");
}
//logOut
let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
});

/*///////////////////////////////////*/

// ////////////////////////////////////////////////////////////

/*///////////////////////////////////*/

let allproducts = document.querySelector(".products");
let products = [
  {
    id: 1,
    title: "oppo reno 7",
    price: 300,
    imageUrl: "images/oppo reno 7.jpg",
    isAddedToFav: false,
  },
  {
    id: 2,
    title: "iphone 13",
    price: 800,
    imageUrl: "images/iphone 13.jpg",
    isAddedToFav: false,
  },
  {
    id: 3,
    title: "Samsung A25",
    price: 300,
    imageUrl: "images/Samsung A25.jpg",
    isAddedToFav: false,
  },
  {
    id: 4,
    title: "Apple Watch",
    price: 120,
    imageUrl: "images/Apple Watch.jpg",
    isAddedToFav: false,
  },
  {
    id: 5,
    title: "Band Watch 9",
    price: 100,
    imageUrl: "images/Band Watch 9.jpg",
    isAddedToFav: false,
  },
  {
    id: 6,
    title: "air pods",
    price: 700,
    imageUrl: "images/air pods.jpg",
    isAddedToFav: false,
  },
  {
    id: 7,
    title: "iphone 15",
    price: 600,
    imageUrl: "images/iphone 15.jpg",
    isAddedToFav: false,
  },
  {
    id: 8,
    title: "oppo x5",
    price: 500,
    imageUrl: "images/oppo x5.jpg",
    isAddedToFav: false,
  },
  {
    id: 9,
    title: "poco x5",
    price: 100,
    imageUrl: "images/poco x5.jpg",
    isAddedToFav: false,
  },
];

function drawItems() {
  let FavList = localStorage.getItem("FavList");
  FavList = JSON.parse(FavList);

  let x = "";

  for (const item of products) {
    if (
      FavList.find((favItem) => {
        if (favItem.id === item.id) {
          return true;
        }
      })
    ) {
      item.isAddedToFav = true;
    }
    if (item.isAddedToFav) {
      x += ` <div class="product-item" >
              <img class="product-item-img" src="${item.imageUrl}"alt="">

              <div class="product-item-desc">
                <h2> ${item.title}</h2>
                <p>the new mobile from  company 6-2022</p>
                <span> price :${item.price}$</span>
              </div>
              <div class="product-item-action">
                <button type="button" class="btn btn-primary add-to-cart"  onclick="addtoCart(${item.id})" >Add To Cart</button>
                <i id="${item.id}" class=" fav fas fa-heart added-to-favourite"  onclick="addToFav(${item.id})"></i>
              </div>
        </div>
      `;
    } else {
      x += ` <div class="product-item"  >
      <img class="product-item-img" src="${item.imageUrl}"alt="">

      <div class="product-item-desc">
        <h2> ${item.title}</h2>
        <p>the new mobile from  company 6-2022</p>
        <span> price :${item.price}$</span>
      </div>
      <div class="product-item-action">
        <button type="button" class="btn btn-primary add-to-cart"  onclick="addtoCart(${item.id})" >Add To Cart</button>
        <i id="${item.id}" class=" fav fas fa-heart not-added-to-favourite"  onclick="addToFav(${item.id})"></i>
      </div>
</div>
`;
    }
  }

  allproducts.innerHTML = x;
}
drawItems();

let badge = document.querySelector(".badge");
let cartProductDiv = document.querySelector(".carts-products Div");

// drawCartDive;
function drawCartDive() {
  cartItems = localStorage.getItem("ProductsInCart")
    ? JSON.parse(localStorage.getItem("ProductsInCart"))
    : [];
  if (cartItems) {
    let cartProductDivTxt = ``;
    for (const cartElement of cartItems) {
      cartProductDivTxt += `
       <div class="  d-flex justify-content-between">
    <div class="d-flex">
      <p>${cartElement.Item.title}</p>
    </div>
    <div class="d-flex justify-content-between">
      <button  onclick="removeQnty(${cartElement.Item.id})">-</button>
      ${cartElement.quantity}
      <button onclick="addQnty(${cartElement.Item.id})">+</button>
    </div>
      <br>`;
    }
    cartProductDiv.innerHTML = cartProductDivTxt;
    badge.style.display = "block";
    badge.innerHTML = cartItems.length;
  }
}
drawCartDive();

if (localStorage.getItem("usernames")) {
  function addtoCart(id) {
    let choosenItem = products.find((item) => item.id === id);
    let isExsist = false;
    if (cartItems.length > 0) {
      for (const cartElement of cartItems) {
        if (cartElement.Item.id == choosenItem.id) {
          cartElement.quantity += 1;
          isExsist = true;
        }
      }
      if (!isExsist) {
        cartItems = [
          ...cartItems,
          {
            Item: choosenItem,
            quantity: 1,
          },
        ];
      }
    } else {
      cartItems = [
        ...cartItems,
        {
          Item: choosenItem,
          quantity: 1,
        },
      ];
    }

    let cartProductDivTxt = ``;
    for (const cartElement of cartItems) {
      cartProductDivTxt += `
       <div class="  d-flex justify-content-between">
    <div class="d-flex">
      <p>${cartElement.Item.title}</p>
    </div>
    <div class="d-flex justify-content-between">
      <button>-</button>
      ${cartElement.quantity}
      <button>+</button>
    </div>
      <br>`;
    }
    cartProductDiv.innerHTML = cartProductDivTxt;

    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));

    let cartProductLenght = document.querySelectorAll(".carts-products Div p");
    badge.style.display = "block";
    badge.innerHTML = cartProductLenght.length;
  }
} else {
  window.location = "login.html";
}

/*/////////////////////////////////////////////////////////////////////////////////*/
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

function addQnty(id) {
  let ProductsInCart = localStorage.getItem("ProductsInCart");
  ProductsInCart = JSON.parse(ProductsInCart);
  for (const ProductInCart of ProductsInCart) {
    if (ProductInCart.Item.id === id) {
      ProductInCart.quantity += 1;
    }
  }
  console.log(ProductsInCart);
  localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart));
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
  drawCartDive();
}
function addToFav(id) {
  let FavList = localStorage.getItem("FavList");
  FavList = JSON.parse(FavList);
  let addedToFav = false;
  let choosenItem = products.find((item) => item.id === id);
  if (
    document.getElementById(id).classList.contains("not-added-to-favourite")
  ) {
    document.getElementById(id).classList.add("added-to-favourite");
    document.getElementById(id).classList.remove("not-added-to-favourite");

    if (FavList.length > 0) {
      for (const item of FavList) {
        if (item.id === choosenItem.id) {
          addedToFav = true;
        } else {
        }
      }
      if (!addedToFav) {
        choosenItem.isAddedToFav = true;
        FavList = [...FavList, choosenItem];
      }
    } else {
      choosenItem.isAddedToFav = true;
      FavList = [...FavList, choosenItem];
    }
  } else if (
    document.getElementById(id).classList.contains("added-to-favourite")
  ) {
    document.getElementById(id).classList.add("not-added-to-favourite");
    document.getElementById(id).classList.remove("added-to-favourite");
    FavList = FavList.filter((favItem) => {
      return favItem.id !== id;
    });
  }
  localStorage.setItem("FavList", JSON.stringify(FavList));
}
