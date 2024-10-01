import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { basicRequest, TokenRequest } from '../AxiosCreate';
import axios from 'axios';
import { placeOrder } from '../api';
import { useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCardImage
} from 'mdb-react-ui-kit';
import Nav1 from '../nav';
import UserFooter from './UserFooter';
import { Form } from 'react-bootstrap';

function BuyNow() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [newOrder, setNewOrder] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [companyId, setCompanyId] = useState('');

  const MyData = useSelector((state) => state.login.LoginInfo[0]);
  let userID;
  if (MyData) {
    userID = MyData.id;
  }

  const fetchProduct = async (productId) => {
    try {
      const result = await TokenRequest.get(`/Admin/FindProduct/${productId}`);
      setNewOrder(result.data);
      setCompanyId(result.data.CompanyID);
    } catch (err) {
      try {
        const fallbackResult = await basicRequest.get(`/Admin/FindProductFromAddToCart/${productId}`);
        setNewOrder(fallbackResult.data);
      } catch (fallbackErr) {
        console.error("Error fetching product:", fallbackErr);
      }
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const handleRazorpayPayment = async (data) => {
    // Validation check for required fields
    if (!name || !email || !phoneNumber || !address || !pin) {
      alert('Please fill in all the required fields!');
      return;
    }

    try {
      // Create order from backend
      const orderData = await basicRequest.post('/Payment/createOrder', {
        amount: newOrder.productofferprice * 100, // Razorpay requires amount in paise
      });

      const options = {
        key: 'rzp_test_T975QT6olxQszO', // Replace with your Razorpay Key ID
        amount: orderData.data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        image: "/your_logo.png",
        order_id: orderData.data.id, // Pass the order ID from the backend
        handler: async function (response) {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            name,
            email,
            phoneNumber,
            address,
            pin,
            companyId,
            userID,
          };
          await placeOrder(data);
          navigate('/orders');
        },
        prefill: {
          name,
          email,
          contact: phoneNumber,
        },
        notes: {
          address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

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
                              required
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
                              required
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
                              required
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
                              required
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
                              required
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
                          <button onClick={() => handleRazorpayPayment({ newOrder, name, email, phoneNumber, address, pin, companyId, userID })}>Place order</button>
                        </MDBTypography>
                        <div className="border-start h-100"></div>
                        <MDBTypography tag="h5" className="fw-normal mb-0">
                          <p className="text-muted">
                            Payment method: online
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

