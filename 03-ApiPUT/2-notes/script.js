let editId = null;

async function addNote() {

  const title = document.getElementById('titleInp').value;
  const content = document.getElementById('contentInp').value;
  const status = document.getElementById('status');

  if (title === '') {
    status.textContent = 'Please add the Title ...';
    return;
  }

  status.textContent = editId ? 'Updating Your Note' : 'Adding Your Note';

  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  try {
    if (editId !== null) {
      const index = notes.findIndex(b => b.id === editId);
      if (index !== -1) {
        notes[index].title = title;
        notes[index].content = content;

        localStorage.setItem('notes', JSON.stringify(notes));

        await fetch(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application.json' },
          body: JSON.stringify({ title, content })
        });

        status.textContent = `Note ID ${editId} updated`;
      }

      editId = null;
      document.querySelector('button').textContent = 'Submit Note';

    } else {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });

      const id = Date.now();
      const data = await res.json();

      status.textContent = `✅ note added For ${title}. Your note ID is ${id} \n Thank You !`

      const newNote = {
        id: id,
        title: title,
        content: content
      };

      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(newNote);

      localStorage.setItem("notes", JSON.stringify(notes));

      document.getElementById("titleInp").value = "";
      document.getElementById("contentInp").value = "";

      renderNotes();
    }
  } catch (err) {
    console.log("Error adding notes: ", err);
    status.textContent = "Failed to add the notes. Try again !!"
  }
}

function renderNotes() {
  const display = document.getElementById('showNotes');
  display.innerHTML = '';

  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  if (notes.length === 0) {
    display.textContent = 'No Notes added yet...';
    return;
  }

  notes.forEach(note => {
    const noteDiv = document.createElement('div');
    noteDiv.style.padding = '10px';
    noteDiv.style.background = "#111";
    noteDiv.style.borderRadius = "8px";

    noteDiv.innerHTML = `
      <strong>Report ID:</strong> ${note.id}<br>
      <strong>Section:</strong> ${note.title}<br>
      <strong>Description:</strong> ${note.content}<br>
      <div class='btns'>
        <button onclick="editNote(${note.id})">Edit</button>
        <button onclick="deleteNote(${note.id})">Delete</button>
      </div>
      
    `;
    display.appendChild(noteDiv);
  });
}

renderNotes();

function editNote(id){
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteToEdit = notes.find(note => note.id === id);

  if(!noteToEdit) return;

  document.getElementById('titleInp').value = noteToEdit.title;
  document.getElementById('contentInp').value = noteToEdit.content;
  document.getElementById('button').textContent = 'Update Note';

  editId = id;
}

function deleteNote(id){
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  const updatedNotes = notes.filter(note => note.id !== id);

  localStorage.setItem('notes',JSON.stringify(updatedNotes));

  renderNotes();
}