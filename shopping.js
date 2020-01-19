const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// State
const items = [];

function handleSubmit(e) {
  e.preventDefault();
  console.log('submitted');
  const name = e.currentTarget.item.value;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  // push items into state
  items.push(item);
  console.log(`There are currently ${items.length} in your list.`);
  e.currentTarget.item.value = '';
}

shoppingForm.addEventListener('submit', handleSubmit);