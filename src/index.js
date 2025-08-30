const button   = document.getElementById("addBookmarkBtn");
const input    = document.getElementById("bookmarkInput");
const list     = document.getElementById("bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderItem(url) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${url}</span>
    <button class="delete">X</button>
  `;
  list.appendChild(li);

  li.querySelector(".delete").addEventListener("click", () => {
    bookmarks = bookmarks.filter(item => item !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    li.remove();
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