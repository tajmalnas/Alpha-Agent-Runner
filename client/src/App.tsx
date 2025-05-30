import { Routes, Route, Link } from 'react-router-dom';
import AgentRunner from './pages/AgentRunner';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/agent-runner" element={<AgentRunner />} />
      </Routes>
    </div>
  );
}
