import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import Voting from './pages/Voting';
import './styles/App.css';
import JoinRoom from './pages/JoinRoom';
import Admin from './Components/Admin';

function App() {
  return (
    <>
      <div id="background" />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinRoom/>}/>
          <Route path="/:roomid" element={<Voting />} />
          <Route path="user/:number" element={<User />} />
          <Route path="/admin" element={<Admin />} />
  
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
