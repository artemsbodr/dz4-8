const button = document.querySelector("#addBookmarkBtn");
const input = document.querySelector("#bookmarkInput");
const list = document.querySelector("#bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderItem(url) {
  const ind = document.createElement("li");
  ind.innerHTML = `${url} <button class="delete">X</button>`;
  list.appendChild(ind);

  const deleteButton = ind.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    bookmarks = bookmarks.filter((item) => item !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    ind.remove();
  });
}

bookmarks.forEach(renderItem);

button.addEventListener("click", () => {
  const url = input.value.trim();
  if (!url) return;
  bookmarks.push(url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderItem(url);
  input.value = "";
});
