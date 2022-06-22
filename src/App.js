import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<h1>about page</h1>} />
        <Route path="/users" element={<h1>users page</h1>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
