
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import {useSelector} from 'react-redux'
import Profile from './Pages/Profile';
import AdminPorfile from './Admin/AdminProfile'
import UpdateAdminProfile from './Admin/UpdateAdminProfile'
import ListOfUsers from './Admin/ListOfUsers'
import Cart from './Pages/Cart'
import BuyNow from './Pages/BuyNow';
import Admin from './Admin/AdminLogin';
import AddCompany from './Admin/addCompany';
import CompanyLogin from './Company/CompanyLogin';
import CompanyHome from './Company/CompanyHome';
import CartRenter from './Pages/cartRenter'
import ProductDetails from './Pages/ProductDetails';
import Orders from './Pages/orders';
import Allcompanys from './Admin/allcomanys';
import CompanyProduct from './Company/CompanyProduct';
import CompanyOrders from './Company/companyOrders';
import UserProfile from './Pages/UserProfile';
import UserProfileUpdate from './Pages/UserProfileUpdate';


function App() {
  const Adminlogin= useSelector((state) => state.admin?.AdminLoginInfo[0]);
  const logininfom = useSelector((state) => state.login?.LoginInfo[0]);
  const companyLogin=useSelector((state)=>state.company?.CompanyLoginInfo[0]);
  

  if(logininfom){
    var token=logininfom.Token
  }
  if(Adminlogin){
    var pass=Adminlogin.Pass
    console.log("from app.js:",pass)
  }
  if(companyLogin){
    var companypass=companyLogin.CompanyPass
    console.log("companyPass:",companypass)
  }


  const app=createBrowserRouter([
    {
      path:'/',
      element:token?<Home/>:<Login/>
    },
    {
      path:'/Profile',
      element:token?<Profile/>:<Login/>
    },
    {
      path:'/UserProfile',
      element:token?<UserProfile/>:<Login/>
    },

    {
      path:'/Update',
      element:token?<UserProfileUpdate />:<Login/>
    },
    
    {
      path:'/CartRenter',
      element:token?<CartRenter/>:<Login/>
    },
    {
      path:'/Cart',
      element:token?<Cart/>:<Login/>
    },
    {
      path:'/orders',
      element:token?<Orders/>:<Login/>
    },
    {
      path: '/ProductDetails/:id',
      element: token ? <ProductDetails/> : <Login/>
    },
    {
      path: '/BuyNow/:id',
      element: token ? <BuyNow /> : <Login/>
    },
    {
      path:'/Signup',
      element:<Signup/>
    }
    ,
    {
      path:'/AdminPorfile',
      element:pass?<AdminPorfile/>:<Admin/>
    }
    ,
     {
      path:'/UpdateAdminProfile',
      element:pass?<UpdateAdminProfile/>:<Admin/>
    }, 
    {
      path:'/Admin',
      element:pass?<ListOfUsers/>:<Admin/>
    }
    , 
    {
      path:'/AddCompany',
      element:pass?<AddCompany/>:<Admin/>
    }
    , 
    {
      path:'/Allcompanys',
      element:pass?<Allcompanys/>:<Admin/>
    }
    , 
    {
      path:'/Company',
      element:companypass?<CompanyHome/>:<CompanyLogin/>
    }, 
    {
      path:'/CompanyProduct',
      element:companypass?<CompanyProduct/>:<CompanyLogin/>
    },
    {
      path:'/CompanyOrders',
      element:companypass?<CompanyOrders/>:<CompanyLogin/>
    }
    
  ])
  return (
    <div>
     <RouterProvider router={app}/>
    </div>
  );
}

export default App;
