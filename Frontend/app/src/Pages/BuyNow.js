import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TokenRequest } from '../AxiosCreate';
import { Form, Nav } from 'react-bootstrap';
import './BuyNow.css';
import axios from 'axios';
import { placeOrder } from '../api';
import UserFooter from './UserFooter';
import Nav1 from '../nav';
import { useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";


function BuyNow() {
  const { id } = useParams();
  const [newOrder, setNewOrder] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('')
  const [companyId, setCompanyId] = useState('');



  const MyData = useSelector((state) => state.login.LoginInfo[0]);
  let userID;
  if (MyData) {
    userID = MyData.id;
  }
  console.log("user id>>>>>>>>>>>>>", userID);



  const fetchProduct = async (productId) => {
    try {
      console.log("Fetching product from /Admin/FindProduct endpoint with ID:", productId);
      const result = await TokenRequest.get(`/Admin/FindProduct/${productId}`);
      setNewOrder(result.data);
      console.log(result.data.ComapanyID)
      setCompanyId(result.data.CompanyID);
      console.log('companyid;', companyId)
    } catch (err) {
      console.error("Error fetching product from /Admin/FindProduct:", err);
      try {
        console.log("Fetching product from /Admin/FindProductFromAddToCart endpoint with ID:", productId);
        const fallbackResult = await axios.get(`http://localhost:5007/Admin/FindProductFromAddToCart/${productId}`);
        setNewOrder(fallbackResult.data);
        console.log("Product fetched from /Admin/FindProductFromAddToCart:", fallbackResult.data);
      } catch (fallbackErr) {
        console.error("Error fetching product from /Admin/FindProductFromAddToCart:", fallbackErr);
      }
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  function Placeorder(data) {
    placeOrder(data)
  }

  return (
    <>
      <div className='navbarhome'>
        <Nav1 />

      </div>
      <div className='OrderPage' style={{ marginTop: "77px" }}>
        {newOrder && Object.keys(newOrder).length !== 0 && (
          <section className="vh-100 gradient-custom-2">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard
                className="card-stepper"
                style={{ borderRadius: "16px" }}
              >
                <MDBCardHeader className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-2">
                      
                        <span className="fw-bold text-body">Place Order</span>
                      </p>
                    </div>
                  </div>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex flex-row mb-4 pb-2">
                    <div className="flex-fill">
                      <MDBTypography tag="h5" className="bold">
                      {newOrder.productname} 
                      </MDBTypography>
                      <p className="text-muted"> Qt: 1 item</p>
                      <MDBTypography tag="h4" className="mb-3">
                        {" "}
                        $ {newOrder.productofferprice}{" "}
                        <span className="small text-muted"> via (COD) </span>
                      </MDBTypography>
                      <p className="text-muted">
                      <Form.Control
                      className='custom-input'
                      size='sm'
                      type='text'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '50%', backgroundColor: 'rgb(97 97 231 / 8%)' }}
                    />
                      </p>
                      <p className="text-muted">
                      <Form.Control
                      className="custom-input"
                      size="sm"
                      type="Email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: "50%", backgroundColor: "rgb(97 97 231 / 8%)" }}
                    />

                      </p>
                      <p className="text-muted">
                      <Form.Control
                      className="custom-input"
                      size="sm"
                      type="number"
                      placeholder="Enter contact number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      style={{ width: "50%", backgroundColor: "rgb(97 97 231 / 8%)" }}
                    />

                      </p>
                      <p className="text-muted">
                      <Form.Control
                      className="custom-input"
                      size="sm"
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{ width: "50%", backgroundColor: "rgb(97 97 231 / 8%)" }}
                    />

                      </p>
                      <p className="text-muted">
                      <Form.Control
                      className="custom-input"
                      size="sm"
                      type="text"
                      placeholder="Enter PinCode"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      style={{ width: "50%", backgroundColor: "rgb(97 97 231 / 8%)" }}
                    />

                      </p>

                    </div>
                    <div>
                      <MDBCardImage
                        fluid
                        className="align-self-center"
                        src={require(`../Images/${newOrder.image}`)}
                        width="250"
                      />
                    </div>
                  </div>

                </MDBCardBody>
                <MDBCardFooter className="p-4">
                  <div className="d-flex justify-content-between">
                    <div className="border-start h-100"></div>
                    <MDBTypography tag="h5" className="fw-normal mb-0">
                    <button onClick={() => Placeorder({ newOrder, name, email, phoneNumber, address, pin, companyId, userID })}>Place Order</button>
                    </MDBTypography>
                    <div className="border-start h-100"></div>
                    <MDBTypography tag="h5" className="fw-normal mb-0">
                      <p className="text-muted">
                        Payment method:cash on delivery
                      </p>
                    </MDBTypography>
                    <div className="border-start h-100"></div>
                  </div>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

        )}
      </div>
      <UserFooter />

      

    </>
  );
}

export default BuyNow;
