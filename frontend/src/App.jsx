import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Me } from "./pages/Me"

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/send" element={<SendMoney/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/" element={<Me/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
