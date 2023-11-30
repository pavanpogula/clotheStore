import React from "react";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Header from "./Components/Login/Header";
import AdminDashboardPage from "./Components/Admin/Dashboard/AdminDashboard";
import CustomerDashboardPage from "./Components/Customer/Dashboard/CustomerDashboardPage";
import AddProduct from "./Components/Admin/Products/AddProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct/UpdateProduct";
import ViewProductsPageAdmin from "./Components/Admin/ViewProducts/AdminDashboardPage";
import CustomerRegistration from "./Components/Customer/CustomerRegistration/CustomerRegistration";
import ErrorPage from "./Components/Customer/ErrorPage/ErrorPage";
import ViewProductsPage from "./Components/Customer/ViewProducts/ViewProductsPage";


function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Header />
        <Routes>
       
          <Route path="/" element={<Login />} />
         {/* Admin routes */}
          <Route path="/adminDashboard"  element={<AdminDashboardPage/>} />
          <Route path="/adminEditProduct"  element={<UpdateProduct/>} />
          <Route path="/viewProductsAdmin" element={<ViewProductsPageAdmin/>}/>
          <Route path="/adminAddProduct"  element={<AddProduct/>} />
           {/* student routes */}
           
           <Route path="/customerDashboard"  element={<CustomerDashboardPage/>} />
           <Route path="/CustomerRegistration"  element={<CustomerRegistration/>} />
           <Route path="/CustomerOrdersPage" element={<ErrorPage/>}/>
           <Route path="/viewProductsCustomer" element={<ViewProductsPage/>}/>
           <Route path="/customerUpdateOrder" element={<ErrorPage/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
