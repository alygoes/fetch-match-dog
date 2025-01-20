// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./views/Login";
import Dog from "./views/Dog";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Dog/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

