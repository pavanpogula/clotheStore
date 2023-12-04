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
import ViewProductsPageCustomer from "./Components/Customer/ViewProducts/ViewProductsPageCustomer";
import CustomerCart from "./Components/Customer/Cart/CustomerCart";
import CustomerOrderSummary from "./Components/Customer/Orders/CustomerOrderSummary";
import Orders from "./Components/Customer/ViewOrders/Orders";
import AdminOrders from "./Components/Admin/Orders/AdminViewOrders";
import SingleOrderTable from "./Components/Admin/Orders/SingleOrderTable";
import ShowOrderPageAdmin from "./Components/Admin/Orders/ShowOrderPage";



function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Header />
        <Routes>
       
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
         {/* Admin routes */}
          <Route path="/adminDashboard"  element={<ViewProductsPageAdmin/>} />
          <Route path="/adminEditProduct"  element={<UpdateProduct/>} />
          <Route path="/viewProductsAdmin" element={<ViewProductsPageAdmin/>}/>
          <Route path="/adminAddProduct"  element={<AddProduct/>} />
          <Route path="/adminViewOrders"  element={<AdminOrders/>} />
          
          <Route path="/adminSingleOrderPage"  element={<ShowOrderPageAdmin/>} />
           {/* student routes */}
           
           <Route path="/customerDashboard"  element={<ViewProductsPageCustomer/>} />
           <Route path="/CustomerRegistration"  element={<CustomerRegistration/>} />
           <Route path="/CustomerOrdersPage" element={<ErrorPage/>}/>
           <Route path="/viewProductsCustomer" element={<ViewProductsPageCustomer/>}/>
           <Route path="/customerUpdateOrder" element={<ErrorPage/>}/>
           <Route path="/cart" element={<CustomerCart/>}/>
           <Route path="/checkout" element={<CustomerOrderSummary/>}/>
           <Route path="/customerViewOrders" element={<Orders/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
