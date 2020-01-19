const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// State
const items = [];

function handleSubmit(e) {
  e.preventDefault();
  console.log('submitted');
  const name = e.currentTarget.item.value;

  if (!name) return;

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  // push items into state
  items.push(item);
  console.log(`There are currently ${items.length} in your list.`);
  e.target.reset();
  displayItems();
}

function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
        <input type="checkbox">
        <span class="itemName">${item.name}</span>
        <button aria-label="Remove ${item.name}">&times;</button>
      </li>
      `
    )
    .join('');
    list.innerHTML = html;
}

shoppingForm.addEventListener('submit', handleSubmit);