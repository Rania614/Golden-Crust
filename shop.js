document.addEventListener("DOMContentLoaded", () => {
  const usernameLabel = document.getElementById("username-label");
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    usernameLabel.textContent = storedUsername;
  }

  const addBtns = document.querySelectorAll(".add-btn");
  const cart = document.getElementById("cart");
  const totalElement = document.getElementById("total");
  const clearBtn = document.querySelector(".clear-btn");
  let total = 0;

  addBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const name = card.querySelector("h3").textContent;
      const price = parseFloat(card.querySelector(".price").textContent.replace("$", ""));

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${name}</span>
        <span>$${price.toFixed(2)}</span>
        <button class="delete-btn">❌</button>
      `;

      cart.appendChild(cartItem);
      total += price;
      totalElement.textContent = total.toFixed(2);

      cartItem.querySelector(".delete-btn").addEventListener("click", () => {
        cartItem.remove();
        total -= price;
        totalElement.textContent = total.toFixed(2);
      });
    });
  });

  clearBtn.addEventListener("click", () => {
    cart.innerHTML = "";
    total = 0;
    totalElement.textContent = "0.00";
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      products.forEach((product) => {
        if (category === "all" || product.dataset.category === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  });
});
