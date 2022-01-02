import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import CreatePost from './Components/CreatePost/CreatePost';
import UpdatePost from './Components/UpdatePost/UpdatePost';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/signIn" element={<SignIn></SignIn>}></Route>
          <Route path="/signUp" element={<SignUp></SignUp>}></Route>
          <Route path="/createPost" element={<CreatePost></CreatePost>}></Route>
          <Route path="/updatePost/:postId" element={<UpdatePost></UpdatePost>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
