const products = [
  { name:"Smirnoff", category:"vodka", price:120 },
  { name:"Absolut", category:"vodka", price:150 },

  { name:"Tanqueray", category:"gin", price:180 },

  { name:"Bacardi", category:"rum", price:120 },

  { name:"Jack Daniel’s", category:"whiskey", price:200 },

  { name:"Heineken", category:"beer", price:180 },

  { name:"Mojito", category:"cocktail", price:260 }
];

function render(list){
  const box = document.getElementById("products");
  box.innerHTML = "";

  list.forEach(p=>{
    box.innerHTML += `
      <div class="card">
        <h4>${p.name}</h4>
        <div class="price">NT$ ${p.price}</div>
        <button>加入購物車</button>
      </div>
    `;
  });
}

function filter(type){
  if(type === "all") render(products);
  else render(products.filter(p => p.category === type));
}

render(products);