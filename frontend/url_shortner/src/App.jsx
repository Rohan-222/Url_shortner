import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ShortUrl from './pages/ShortUrl';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      {/* ✅ Navbar */}
      

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shorten" element={<ShortUrl />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
