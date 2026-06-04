document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("searchInput");
  const suggestBox = document.getElementById("suggestBox");

  if (!input || !suggestBox) return;

  window.searchProduct = function () {

    const value = input.value.toLowerCase().trim();

    const match = products.find(p =>
      p.key.includes(value) ||
      p.title.toLowerCase().includes(value)
    );

    if (match) {
      window.location.href = getPath(match.url);
    } else {
      alert("找不到商品");
    }
  };

  input.addEventListener("input", () => {

    const value = input.value.toLowerCase().trim();

    if (!value) {
      suggestBox.style.display = "none";
      return;
    }

    const result = products.filter(p =>
      p.key.includes(value) ||
      p.title.toLowerCase().includes(value)
    );

    suggestBox.style.display = "block";

    suggestBox.innerHTML = result.map(p => `
      <div class="suggest-item" onclick="go('${p.url}')">
        ${p.title}
      </div>
    `).join("");

  });

  window.go = function(url){
    window.location.href = getPath(url);
  };

  function getPath(url){

    const path = window.location.pathname;

    if (path.includes("/html/pages/") || path.includes("/html/system/")) {
      return "../" + url;
    }

    if (path.includes("/html/softdrink/")) {
      return url.split("/")[1];
    }

    return "html/" + url;
  }

});