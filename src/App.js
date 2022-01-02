import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import CreatePost from './Components/CreatePost/CreatePost';
import UpdatePost from './Components/UpdatePost/UpdatePost';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/signIn" element={<SignIn></SignIn>}></Route>
            <Route path="/signUp" element={<SignUp></SignUp>}></Route>
            <Route path="/createPost" element={<PrivateRoute><CreatePost></CreatePost></PrivateRoute>}></Route>
            <Route path="/updatePost/:postId" element={<PrivateRoute><UpdatePost></UpdatePost></PrivateRoute>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
