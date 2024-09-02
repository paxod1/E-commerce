import React, { useEffect, useState } from 'react';
import Nav from '../nav';
import './Home.css';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { IoBagHandle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { profileData } from '../api'
import { CgProfile } from "react-icons/cg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import UserFooter from './UserFooter';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { basicRequest } from '../AxiosCreate';


function Home() {
  const [allProduct, setAllProduct] = useState([]);
  const [cartSize, setCartSize] = useState([]);

  const MyData = useSelector((state) => state.login.LoginInfo[0])
  if (MyData) {
    var ID = MyData.id
    var userID = MyData.id
  }
  console.log(userID);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('helloo')
        const result = await basicRequest.get('/Admin/getimage');
        setAllProduct(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    const fetchCart = async () => {
      try {
        const result = await basicRequest.get('/Admin/displaycard', { params: { userID } });
        console.log(result.data);
        setCartSize(result.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, []);


  async function addToCart(data) {
    try {
      setCartSize(cartSize + 1);
      var Quantity=1;
      await basicRequest.post('/Admin//addToCarts', {
        image: data.image,
        productname: data.productname,
        productdocs: data.productdocs,
        companyname: data.companyname,
        productprice: data.productprice,
        productofferprice: data.productofferprice,
        ComapanyID:data.ComapanyID,
        userID,
        productID:data._id,
        Quantity
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  const [profile, setProfile] = useState([])
  useEffect(() => {
    async function GetProileData() {
      const MyProfileData = await profileData(ID)
      setProfile(MyProfileData)
    }
    GetProileData()
  }, [])
  console.log('Profile:', profile)
  return (
    <>
      <div className='navbarhome'>
        <Nav />

      </div>

      <div className='middile'>
        <div className='search-cart'>
          <div className='search-container'>
            <input type='text' placeholder='Search...' />
            <h4 type='submit' className='search-button' style={{ color: '#5591b7' }}>

              <i className='search-sim' style={{ color: "#5591b7" }}>
                <FaSearch />
              </i>

            </h4>
          </div>
          <Container className='rights-side'>
          <Link to={'/UserProfile'}  >
            <h5 className='profilelinks'><CgProfile /></h5>
            </Link>
            
            <Link to={'/Cart'} style={{ color: "blue", height: "40px" }} >
              <h5 className='cartlinks'>{cartSize === 0 ? 0 : cartSize}<IoBagHandle /></h5>
            </Link>

          </Container>
        </div>
        <div className='poster-container'>
          <img
            className='poster'
            src='https://www.indianterrain.com/cdn/shop/files/Sunlit-Banner-web.jpg?v=1710389623&width=1500'
            alt=''
          />
          <img
            className='poster'
            src='https://m.media-amazon.com/images/S/aplus-media/sc/6c546106-284f-458a-ae01-ba02f5c7ed29.__CR0,0,1464,600_PT0_SX1464_V1___.jpg'
            alt=''
          />
          <img
            className='poster'
            src='https://i.pinimg.com/originals/d7/3f/8c/d73f8c9c1073585858a0a4abb519d1b5.jpg'
            alt=''
          />
        </div>
      </div>

      <div className='container overflow-hidden'>
        <div className="row gy-4 gy-lg-0 gx-xxl-5">
          {
            allProduct.length > 0 ? (
              allProduct.map((data, index) => (
                <div className="col-12 col-md-6 col-lg-3">
                  <div class="card border-0 border-bottom border-primary shadow-sm overflow-hidden">
                    <div className="card p-0">
                      <figure className='m-0 p-0'>
                        <Link to={`/ProductDetails/${data._id}`} style={{ marginRight: "5px" }}>
                          <img src={require(`../Images/${data.image}`)} className="card-img-top" alt='#'
                            style={{ cursor: 'pointer' }}
                          />
                        </Link>
                        <div className="card-body">
                          <figcaption className="m-0 p-4">
                          <h5 className="card-title" id='card-titles' style={{color:"#5591b7"}}>{data.companyname}</h5>
                            <h5 className="card-title" id='card-titles'>{data.productname}</h5>
                            <button className="btn btn-black" id='pricebtn'><span id='prices'>${data.productprice}</span> <span id='offers'>Offer Price: </span><span id='offerprices'>${data.productofferprice}</span></button>
                          </figcaption>
                        </div>
                      </figure>
                      <button className='cartbutton' onClick={() => addToCart(data)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>loading....</p>
            )
          }
        </div>
        <UserFooter />
      </div>


    </>
  );
}

export default Home;