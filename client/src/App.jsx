import { BrowserRouter,Routes,Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import FooterCom from "./components/FooterCom"

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element ={<Home/>} />
      <Route path="/about" element ={<About/>} />
      <Route path="/sign-in" element ={<Signin/>} />
      <Route path="/sign-up" element ={<Signup/>} />
      <Route path="/dashboard" element ={<Dashboard/>} />
      <Route path="/projects" element ={<Projects/>} />
    </Routes>
    <FooterCom/>
    
    </BrowserRouter>
  
  )
}

export default App
