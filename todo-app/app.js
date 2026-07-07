const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const remaining = document.getElementById('remaining');
const clearBtn = document.getElementById('clear-btn');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() { localStorage.setItem('todos', JSON.stringify(todos)); }

function render() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');
    li.innerHTML = `<input type="checkbox" ${todo.done ? 'checked' : ''}><span>${todo.text}</span><button class="del">✕</button>`;
    li.querySelector('input').addEventListener('change', () => { todos[i].done = !todos[i].done; save(); render(); });
    li.querySelector('.del').addEventListener('click', () => { todos.splice(i, 1); save(); render(); });
    list.appendChild(li);
  });
  remaining.textContent = `${todos.filter(t => !t.done).length} tasks left`;
}

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = '';
  save(); render();
});
input.addEventListener('keydown', e => e.key === 'Enter' && addBtn.click());
clearBtn.addEventListener('click', () => { todos = todos.filter(t => !t.done); save(); render(); });
render();
