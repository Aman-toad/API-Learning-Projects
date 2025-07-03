
async function sendFeedback() {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const resultBox = document.getElementById('resultBox');

  if (name == '' || message == '') {
    alert('field must be filled');
  }

  else {

    resultBox.textContent = 'Sending...';
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          name: name,
          message: message
        })
      });

      const id = Date.now();      

      const data = await res.json()

      resultBox.textContent = `Thanks, ${data.name}. we got your message: "${data.message}" (fake ID: ${id})`;
    } catch (err) {
      resultBox.textContent = 'failed to send feedback';
      console.error(err);
    }
  }
}