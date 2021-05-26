const add = document.getElementById('add');
add.addEventListener('click', () => addNewNote());

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach(note => addNewNote(note));
}

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
      <div class="tools">
          <button class="edit"><i class="far fa-edit"></i></button>
          <button class="delete"><i class="far fa-trash-alt"></i></button>
      </div>

      <div class="main ${text ? '' : 'hidden'}"></div>
      <textarea class="${text ? 'hidden' : ''}"></textarea>
  `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  main.innerHTML = text;
  textArea.value = text;

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  textArea.addEventListener('input', e => {
    const { value } = e.target;
    main.innerHTML = value;

    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];

  notesText.forEach(note => notes.push(note.value));
  localStorage.setItem('notes', JSON.stringify(notes));
}
