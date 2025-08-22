import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ApiProvider } from "./Axios";
import { ToastContainer } from "react-toastify";
import { PropertiesProvider } from "./PropertiesContext";

function App() {
  return (
    <>
      <ApiProvider>
        <PropertiesProvider>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PropertiesProvider>
      </ApiProvider>
    </>
  );
}

export default App;
