import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AdminPanel from './Pages/AdminPanel/AdminPanel';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AdminPanel" element={<AdminPanel />} />
    </Routes>
  </Router>
  )
}

export default App
