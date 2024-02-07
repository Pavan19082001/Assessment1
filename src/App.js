import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import GetAllUsers from './component/GetAllUsers';
import GetUserById from './component/GetUserById';

function App() {
  return (
    <div className="App">

<Router>
  <Routes>
  <Route path="/" element={<Login/>} exact/>
  <Route path="/getAllUsers" element={<GetAllUsers/>} exact/>
  <Route path="/getUsersById/:emailId" element={<GetUserById/>} exact/>
  <Route path="/register" element={<Register/>} exact/>
  </Routes>
</Router>
      
    </div>
  );
}

export default App;
