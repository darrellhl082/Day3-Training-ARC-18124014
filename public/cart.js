document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/cart")
      .then(response => response.json())
      .then(data => {
        
        const container = document.getElementById("cart-list");
        container.classList.add("container");
        
        if (data.length === 0) {
          const cart_empty = document.createElement("h2");
          cart_empty.textContent = "Empty";
          container.appendChild(cart_empty);
          return;
        } else {
            data.forEach(product => {
              const item_container = document.createElement("div");
              item_container.classList.add("item");
            
              const thumbnail = document.createElement("img");
              thumbnail.src = product.thumbnail;
              thumbnail.alt = product.title;
      
              const item_content = document.createElement("div");
              item_content.classList.add("item-content");
      
              const item_title = document.createElement("h3");
              item_title.classList.add("title");
              item_title.textContent = product.name;
      
              const item_description = document.createElement("p");
              item_description.classList.add("description");
              item_description.textContent = product.desc;
      
              const item_price = document.createElement("span");
              item_price.classList.add("price");
              item_price.textContent = `$${product.price}`;
      
              const item_rating = document.createElement("span");
              item_rating.classList.add("rating");
              item_rating.textContent = `★${product.rating}`;
      
              item_content.append(item_title, item_description, item_price, item_rating);
              item_container.append(thumbnail,item_content);
              container.appendChild(item_container);
            });
        }
      })
  });