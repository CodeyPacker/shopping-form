const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// State
let items = [];
let contrast = '';

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
        <input
          value=${item.id}
          type="checkbox"
          ${item.complete && 'checked'}
        >
        <span class="itemName" data-contrast="${contrast}" >${item.name}</span>
        <button value=${item.id} aria-label="Remove ${item.name} "data-contrast="${contrast}">&times;</button>
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
  // pull the items from LS
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  // update our items array without this one
  items = items.filter(item => item.id !== id)
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  const itemRef = items.find(item => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
list.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }

  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();

const contrastToggler = document.querySelector('.toggle-contrast');

contrastToggler.addEventListener('click', function(e) {
  console.log(e);

  const contrastElements = document.querySelectorAll('[data-contrast]');

  const contrastArray = Array.from(contrastElements);
  contrastArray.map(function(el) {
    if (el.dataset.contrast === 'high') {
      el.setAttribute('data-contrast', 'low')
      contrast = 'low';
      contrastToggler.innerHTML = 'Increase contrast'
    } else {
      el.setAttribute('data-contrast', 'high')
      contrast = 'high';
      contrastToggler.innerHTML = 'Decrease contrast'
    }
  });
});