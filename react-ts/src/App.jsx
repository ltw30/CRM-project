import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';  // 로그인 컴포넌트
import Main from './main';    // 메인 컴포넌트

const App = () => { // TypeScript 제거
  return (
    <Router>
      <Routes>
        {/* 로그인 라우터  */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} /> */}
        {/* 메인 테스트용 라우터 */}
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
