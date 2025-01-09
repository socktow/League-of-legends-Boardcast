import { useEffect, useState } from 'react';

function useWebSocket(url) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      try {
        const jsonMessage = JSON.parse(event.data);
        setMessage(jsonMessage); // Lưu tin nhắn dưới dạng JSON
      } catch {
        setMessage(event.data); // Nếu không phải JSON, lưu chuỗi gốc
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return message;
}

export default useWebSocket;
