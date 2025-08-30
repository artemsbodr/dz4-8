


export const products = [
  { name: 'Apple',  price: 10, description: 'Соковите зелене яблуко.' },
  { name: 'Banana', price: 5,  description: 'Солодкий стиглий банан.' },
  { name: 'Cherry', price: 15, description: 'Яскраві червоні вишні.' },
  { name: 'Date',   price: 20, description: 'Сушені фініки – солодка насолода.' }
];


const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const saveBtn       = document.getElementById('saveBtn');

saveBtn.addEventListener('click', () => {
  localStorage.setItem('username', usernameInput.value);
  localStorage.setItem('password', passwordInput.value);
  alert('Дані збережено!');
});

window.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('username');
  const savedPass = localStorage.getItem('password');

  if (savedUser) usernameInput.value = savedUser;
  if (savedPass) passwordInput.value = savedPass;
});

async function loadTemplate(path) {
  const res = await fetch(path);
  return Handlebars.compile(await res.text());
}

async function initProductApp() {
  const tpl = await loadTemplate('src/template.hbs');
  const listEl = document.querySelector('#productApp .product-list');
  const searchEl = document.getElementById('search');

  function render(items) {
    listEl.innerHTML = tpl({ items });
  }

  render(products);

  searchEl.addEventListener('input', () => {
    const term = searchEl.value.trim().toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
    render(filtered);
  });
}
initProductApp();