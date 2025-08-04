async function sendMessageToGPT(userMessage) {
  const chatLog = document.getElementById("chat-log");

  const userDiv = document.createElement("div");
  userDiv.textContent = "🧍 You: " + userMessage;
  chatLog.appendChild(userDiv);

  const responseDiv = document.createElement("div");
  responseDiv.textContent = "🤖 Bot: typing...";
  chatLog.appendChild(responseDiv);

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    responseDiv.textContent = "🤖 Bot: " + data.reply;
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (error) {
    responseDiv.textContent = "❌ Bot: Error contacting AI.";
  }
}
