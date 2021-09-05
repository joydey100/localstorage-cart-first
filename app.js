// Initialize Elements
const cartInput = document.getElementById("cart-input");
const cartBtn = document.getElementById("cart-btn");
const productContainer = document.getElementById("product-container");

// Function for update UI
const updateUI = (value) => {
  const li = document.createElement("li");
  li.classList.add("list-group-item", "mt-2");
  li.innerText = value;
  productContainer.appendChild(li);
};

// Getting info from local storage
const getCart = () => {
  const cart = localStorage.getItem("cart");
  let cartObj;
  if (cart) {
    cartObj = JSON.parse(cart);
  } else {
    cartObj = {};
  }
  return cartObj;
};

// update in local storage cart
const updateLocalStorageCart = (name) => {
  const cart = getCart();
  if (Object.keys(cart).includes(name)) {
    // if there is cart[name] then it is shortcut form of Object.keys(cart).includes(name)
    cart[name] += 1;
  } else {
    cart[name] = 1;
  }

  const objStringified = JSON.stringify(cart);

  localStorage.setItem("cart", objStringified);
};

// update UI if there store the information
const updateUIFromLocalStorage = () => {
  const cart = getCart();
  for (let product in cart) {
    updateUI(product);
  }
};
updateUIFromLocalStorage();

// Function for Placing Order
const placeOrder = () => {
  productContainer.textContent = "";
  localStorage.removeItem("cart");
};

// Button Add Event Listener
cartBtn.addEventListener("click", () => {
  // get Input Value
  const cartValue = cartInput.value;

  if (!cartValue) {
    return;
  }

  //   Update in UI
  updateUI(cartValue);

  // Add to Local Storage
  updateLocalStorageCart(cartValue);

  //   Clear Input Value
  cartInput.value = "";
});
