import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main';
import Question from './pages/questionPage';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import ResultPage from './pages/resultPage';

window.userSign = false;

ReactDOM.createRoot(
  document.getElementById("root")
)
  .render(
    <Router>
      <div>
        <Routes>
          <Route path='/resultPage' element={<ResultPage />} />
          <Route path='/question' element={<Question />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );