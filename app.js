const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJT0HndVRQic7zKpVWG78-6ogeIz1Oe03NrQd60ucHgg&s=10"
  },
  {
    id: 2,
    name: "Shoes",
    price: 60,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQux3RuuDrBARPpRZRAmUNe5TBFpRYy8sbsCkCzzW5EDQ&s=10"
  },
  {
    id: 3,
    name: "Bag",
    price: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-u8ijiWY2HIEwLppkMXo_mBqwbhQtsGu3UpVeVcf94A&s=10"
  }
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function displayProducts() {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    productsContainer.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price.toFixed(2)}</p>

        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  displayCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  displayCart();
}

function displayCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div>
        <strong>${item.name}</strong>
        x ${item.quantity}

        — $${(item.price * item.quantity).toFixed(2)}

        <button class="glossy-btn
      " onclick="removeFromCart(${item.id})">
          Remove
        </button>
      </div>
    `;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

displayProducts();
displayCart();