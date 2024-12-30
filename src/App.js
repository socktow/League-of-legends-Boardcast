import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Kết nối tới WebSocket Server
    const socket = new WebSocket('ws://localhost:5000/ws/in');

    // Lắng nghe sự kiện khi có tin nhắn từ server
    socket.onmessage = (event) => {
      const newMessage = event.data;
      
      try {
        // Chuyển đổi chuỗi JSON thành đối tượng
        const jsonMessage = JSON.parse(newMessage);
        // Cập nhật tin nhắn dưới dạng JSON
        setCurrentMessage(JSON.stringify(jsonMessage, null, 2));  // Định dạng JSON dễ đọc
      } catch (error) {
        // Nếu không thể parse được JSON, hiển thị tin nhắn gốc
        setCurrentMessage(newMessage);
      }
    };

    // Khi WebSocket đóng kết nối
    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    // Khi có lỗi trong WebSocket
    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    // Lưu WebSocket vào state để sử dụng sau này
    setWs(socket);

    // Dọn dẹp khi component bị hủy
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>League of legends - Boardcast</h1>
      <div>
        {/* Hiển thị tin nhắn dưới dạng JSON */}
        <pre>{currentMessage}</pre>  {/* Sử dụng <pre> để hiển thị định dạng JSON dễ đọc */}
      </div>
    </div>
  );
}

export default App;
