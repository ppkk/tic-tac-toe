const sendMove = (move) => {
  if (stompClient.connected) {
    stompClient.publish({
      destination: "/app/move",
      body: JSON.stringify(move),
    });
  } else {
    console.error("🚨 STOMP connection not ready!");
  }
};