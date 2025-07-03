async function reportBug() {
  const bug = document.getElementById('bugOption').value;
  const bugDesc = document.getElementById('bugDesc').value;
  const statusMsg = document.getElementById('statusMsg');

  if (bugDesc.trim() === '') {
    statusMsg.textContent = 'Please describe the bug before submitting.';
    return;
  }

  statusMsg.textContent = 'Submitting Your Report ...';

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        section: bugSection,
        bugDesc: bugDesc
      })
    });
    const id = Date.now(); 
    const data = await res.json();
    console.log("Bug Reported: ", data);

    statusMsg.textContent = `✅ Bug Reported For ${bug}. Your Reporting ID is ${id} \n Thank You !`

    document.getElementById("bugDesc").value = "";
    document.getElementById("bugOption").value = "login";

  } catch (err) {
    console.log("Error Reporting Bug: ", err);
    statusMsg.textContent = "Failed to report bug. Try again !!"
  }
}