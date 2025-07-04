let editId = null;

async function BugReport() {
  const bug = document.getElementById('bugOption').value;
  const desc = document.getElementById('bugDesc').value;
  const status = document.getElementById('statusMsg');
  const display = document.querySelector('displayBugs');

  if (desc === '') {
    status.textContent = 'Please Provide description about the bug...';
    return;
  }

  status.textContent = editId ? 'Updating your Bug' : 'Submitting your report';

  let bugs = JSON.parse(localStorage.getItem('bugs')) || [];

  try {
    if (editId !== null) {
      const index = bugs.findIndex(b => b.id === editId);
      if (index !== -1) {
        bugs[index].bug = bug;
        bugs[index].desc = desc;

        localStorage.setItem('bugs', JSON.stringify(bugs));

        await fetch(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application.json' },
          body: JSON.stringify({ bug, desc })
        });

        status.textContent = `Bug ID ${editId} updated`;
      }

      editId = null;
      document.querySelector('button').textContent = 'Submit Bug';

    } else {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bug, desc })
      });

      const id = Date.now();
      const data = await res.json();

      status.textContent = `✅ Bug Reported For ${bug}. Your Reporting ID is ${id} \n Thank You !`

      const newBug = {
        id: id,
        bug: bug,
        desc: desc
      };

      //get bugs from local storage    
      let bugs = JSON.parse(localStorage.getItem("bugs")) || [];
      bugs.push(newBug);

      localStorage.setItem("bugs", JSON.stringify(bugs));

      document.getElementById("bugDesc").value = "";
      document.getElementById("bugOption").value = "login";

      //Re-render bugs
      renderBugs();

    }

  } catch (err) {
    console.log("Error Reporting Bug: ", err);
    status.textContent = "Failed to report bug. Try again !!"
  }
}

function renderBugs() {
  const display = document.querySelector('.displayBugs')
  display.innerHTML = '';

  const bugs = JSON.parse(localStorage.getItem('bugs')) || [];

  if (bugs.length === 0) {
    display.textContent = 'No bugs reported yet.';
    return;
  }

  bugs.forEach((bug) => {
    const bugDiv = document.createElement('div');
    bugDiv.style.padding = "10px";
    bugDiv.style.background = "#111";
    bugDiv.style.borderRadius = "8px";

    bugDiv.innerHTML = `
      <strong>Report ID:</strong> ${bug.id}<br>
      <strong>Section:</strong> ${bug.bug}<br>
      <strong>Description:</strong> ${bug.desc}<br>
      <div class='btns'>
        <button onclick="editBug(${bug.id})">Edit</button>
        <button onclick="deleteBug(${bug.id})">Delete</button>
      </div>
      
    `;

    display.appendChild(bugDiv);
  });
}

renderBugs();

function editBug(id) {
  const bugs = JSON.parse(localStorage.getItem('bugs')) || [];
  const bugToEdit = bugs.find(bug => bug.id === id);

  if (!bugToEdit) return;

  document.getElementById('bugOption').value = bugToEdit.bug;
  document.getElementById('bugDesc').value = bugToEdit.desc;
  document.getElementById('button').textContent = 'Update Bug';

  editId = id;
}

function deleteBug(id){
  let bugs = JSON.parse(localStorage.getItem('bugs')) || [];

  const updatedBugs = bugs.filter(bug => bug.id !== id);

  localStorage.setItem('bugs',JSON.stringify(updatedBugs));

  renderBugs();
}