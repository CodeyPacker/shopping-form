const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// State
const items = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;

  if (!name) return;

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  // push items into state
  items.push(item);
  e.target.reset();

  // fire off a custom event that tells anyone else who cares
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
        <input type="checkbox">
        <span class="itemName">${item.name}</span>
        <button value=${item.id} aria-label="Remove ${item.name}">&times;</button>
      </li>
      `
    )
    .join('');
    list.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('Restoring from LS');
  // pull the items from LS
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // items = lsItems;
    // lsItems.forEach(item => items.push(item));
    // items.push(lsItems[0], lsItems[1]);
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  // update our items array without this one
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
list.addEventListener('click', function(e) {
  if (e.target.matches('button')) {
    deleteItem(e.target.value);
  }
});

restoreFromLocalStorage();
