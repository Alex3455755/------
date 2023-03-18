import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main';
import Question from './pages/questionPage';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';

document.addEventListener('dragover', ev => ev.preventDefault())
document.addEventListener('drop', ev => ev.preventDefault())

ReactDOM.createRoot(
  document.getElementById("root")
)
  .render(
    <Router>
      <div>
        <Routes>
          <Route path='/question' element={<Question />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );