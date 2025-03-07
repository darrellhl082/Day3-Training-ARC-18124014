fetch("https://dummyjson.com/products?limit=20&skip=20")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("product-list");
    container.classList.add("container");
    
    for (let product of data.products) {
        console.log(product);
        const item_container = document.createElement("div");
        item_container.classList.add("item");

        const thumbnail = document.createElement("img");
        thumbnail.src = product.thumbnail;
        thumbnail.alt = product.title;

        const item_content = document.createElement("div");
        item_content.classList.add("item-content");

        const item_title = document.createElement("h3");
        item_title.classList.add("title");
        item_title.textContent = product.title;

        const item_description = document.createElement("p");
        item_description.classList.add("description");
        item_description.textContent = product.description;

        const item_price = document.createElement("span");
        item_price.classList.add("price");
        item_price.textContent = `$${product.price}`;

        const item_rating = document.createElement("span");
        item_rating.classList.add("rating");
        item_rating.textContent = `★${product.rating}`;

        item_content.append(item_title, item_description, item_price, item_rating); 
        item_container.append(thumbnail, item_content);
        container.appendChild(item_container);
    }
  });


document.getElementById("search-bar").addEventListener("input", function(e){
  const keyword = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".item");
  items.forEach(item => {
    const title = item.querySelector(".title").textContent.toLowerCase();
      if (title.includes(keyword)){
        item.style.display = "";
      }
      else{
        item.style.display = "none";
      }
  })
})