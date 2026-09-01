import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { ApiProvider } from "./Axios";
import { ToastContainer } from "react-toastify";
import { PropertiesProvider } from "./PropertiesContext";
import { CartProvider } from "./CartContext";
import { FavoritesProvider } from "./FavoritesContext";

function App() {
  return (
    <>
      <ApiProvider>
        <PropertiesProvider>
          <CartProvider>
            <FavoritesProvider>
              <ToastContainer position="top-right" autoClose={3000} />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/properties/:id" element={<PropertyDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </FavoritesProvider>
          </CartProvider>
        </PropertiesProvider>
      </ApiProvider>
    </>
  );
}

export default App;
