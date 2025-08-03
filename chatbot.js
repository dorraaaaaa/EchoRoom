async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const chatBox = document.getElementById('chat');

  chatBox.innerHTML += `<div><b>You:</b> ${userInput}</div>`;

  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userInput })
  });

  const data = await response.json();
  chatBox.innerHTML += `<div><b>Bot:</b> ${data.reply}</div>`;
}
