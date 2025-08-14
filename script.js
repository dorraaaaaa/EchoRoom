<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>EchoRooms – Loneliness Support</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #fff5e6;
      text-align: center;
      padding-top: 50px;
    }
    h1 {
      color: #7d6608;
    }
    p {
      max-width: 500px;
      margin: 20px auto;
      color: #9a7d0a;
      font-size: 18px;
    }
    #chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 300px;
      background: #7d6608;
      border-radius: 10px;
      padding: 10px;
      color: white;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    #chat-log {
      max-height: 200px;
      overflow-y: auto;
      margin-bottom: 10px;
      text-align: left;
    }
    #chat-log div {
      margin: 5px 0;
    }
    #chat-input {
      width: 100%;
      padding: 8px;
      border-radius: 5px;
      border: none;
    }
  </style>
</head>
<body>
  <h1>🤝 Loneliness Support Room</h1>
  <p>No one should feel alone. This space is for friendly conversation,  
  warmth, and connection whenever you need it.</p>

  <div id="chat-container">
    <div id="chat-log"></div>
    <input type="text" id="chat-input" placeholder="Say hello..." onkeypress="handleKeyPress(event)">
  </div>

  <script>
    async function sendMessageToGPT(userMessage) {
      const chatLog = document.getElementById("chat-log");
      const userDiv = document.createElement("div");
      userDiv.textContent = "🧝 You: " + userMessage;
      chatLog.appendChild(userDiv);

      const responseDiv = document.createElement("div");
      responseDiv.textContent = "🤖 Bot: typing...";
      chatLog.appendChild(responseDiv);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "You are a friendly and uplifting assistant who keeps people company. " + userMessage })
        });

        const data = await res.json();
        responseDiv.textContent = "🤖 Bot: " + (data.reply || "Sorry, I didn’t get that.");
        chatLog.scrollTop = chatLog.scrollHeight;
      } catch (error) {
        responseDiv.textContent = "❌ Bot: Error contacting server.";
      }
    }

    function handleKeyPress(event) {
      if (event.key === "Enter") {
        const input = document.getElementById("chat-input");
        const userText = input.value.trim();
        if (!userText) return;
        input.value = "";
        sendMessageToGPT(userText);
      }
    }
  </script>
</body>
</html>
