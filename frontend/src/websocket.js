import { Client } from "@stomp/stompjs";

const stompClient = new Client({
  brokerURL: "ws://localhost:8080/ws", // Ensure this matches your backend WebSocket URL
  reconnectDelay: 500, // Try reconnecting every 0.5 seconds
  onConnect: () => {
    console.log("✅ WebSocket connected!");
    stompClient.subscribe("/topic/game", (message) => {
      console.log("📩 Received: ", message.body);
    });
  },
  onStompError: (frame) => {
    console.error("🚨 STOMP Error: " + frame.headers["message"]);
  },
  onWebSocketClose: () => {
    console.error("🚨 WebSocket connection closed!");
  },
  onWebSocketError: (error) => {
    console.error("🚨 WebSocket error: ", error);
  },
});

stompClient.activate(); // Connect to WebSocket

export const publishMessage = (destination, body) => {
  if (stompClient.connected) {
    stompClient.publish({ destination, body });
  } else {
    console.error("🚨 STOMP connection not ready!");
  }
};

export default stompClient;