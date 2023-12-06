import './App.css';
import Login from './Components/Login/Login';
import AdminHome from './Components/Admin/AdminHome';
import InstructorHome from './Components/Instructor/InstructorHome';
import MemberHome from './Components/CommiteeMember/MemberHome';
import ApplicantHome from './Components/Applicant/ApplicantHome';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" Component={Login}/>
        <Route path="/admin" Component={AdminHome}/>
        <Route path="/instructor" Component={InstructorHome}/>
        <Route path="/member" Component={MemberHome}/>
        <Route path="/applicant" Component={ApplicantHome}/>
      </Routes>
    </div>
  );
}

export default App;
