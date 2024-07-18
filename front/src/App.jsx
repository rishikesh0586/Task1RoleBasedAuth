
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GetUser from './components/getUser';
import Login from './components/Register'; // Assuming 'Register' is the login component
//import SignUp from './components/Signup/SignUp';
import CreateRoles from './components/Roles/CreateRoles';
import ProtectedRoute from './Context/ProtectedRoute'; // Assuming correct import path
//import { useAuth } from "./AuthHook"; // Import your useAuth hook

function App() {
  //const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />

        {/* Public Route - Login */}
        <Route path="/login" element={<Login />} />

        <Routes>
          {/* Protected Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute element={<GetUser />} /> // Assuming role check in ProtectedRoute
            }
          />
          <Route
            path="/create-roles"
            element={
              <ProtectedRoute element={<CreateRoles />} /> // Assuming role check in ProtectedRoute
            }
          />
          <Route path="/nav4" element={<ProtectedRoute element={<h1>this is nav4</h1>} />} />
          {/* ... other protected routes */}
          {/* Add a default route for "Not Found" if needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
