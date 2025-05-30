import { Routes, Route} from 'react-router-dom';
import AgentRunner from './pages/AgentRunner';
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
