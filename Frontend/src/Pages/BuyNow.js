import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { basicRequest, TokenRequest } from '../AxiosCreate';
import { placeOrder } from '../api';
import { useSelector } from 'react-redux';
import './BuyNow.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCardImage,
  MDBBtn // Change this line
} from 'mdb-react-ui-kit'; // Ensure this import is correct
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
  let userID = MyData ? MyData.id : null;

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

  const handleRazorpayPayment = async () => {
    if (!name || !email || !phoneNumber || !address || !pin) {
      alert('Please fill in all the required fields!');
      return;
    }

    try {
      const orderData = await basicRequest.post('/Payment/createOrder', {
        amount: newOrder.productofferprice * 100,
      });

      const options = {
        key: 'rzp_test_T975QT6olxQszO',
        amount: orderData.data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        image: "/your_logo.png",
        order_id: orderData.data.id,
        handler: async function (response) {
          await placeOrder({ newOrder, name, email, phoneNumber, address, pin, companyId, userID });
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
          color: "#FF9800", // Flipkart orange
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
              <MDBRow className="justify-content-center align-items-start h-100">
                <MDBCol md="10" lg="8" xl="6">
                  <MDBCard className="card-stepper">
                    <MDBCardHeader className="p-4 text-center" style={{ backgroundColor: "#f9f9f9" }}>
                      <h3 className="fw-bold text-body">Order Summary</h3>
                    </MDBCardHeader>
                    <MDBCardBody className="p-4">
                      <MDBCardImage
                        fluid
                        className="mb-3"
                        src={require(`../Images/${newOrder.image}`)}
                        alt={newOrder.productname}
                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                      />
                      <MDBTypography tag="h5" className="bold text-center">
                        {newOrder.productname}
                      </MDBTypography>
                      <p className="text-muted text-center">Qt: 1 item</p>
                      <MDBTypography tag="h4" className="mb-3 text-center">
                        ₹ {newOrder.productofferprice} <span className="small text-muted">via (COD)</span>
                      </MDBTypography>

                      <Form.Control
                        className='custom-input mb-2'
                        size='sm'
                        type='text'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <Form.Control
                        className='custom-input mb-2'
                        size="sm"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Form.Control
                        className='custom-input mb-2'
                        size="sm"
                        type="number"
                        placeholder="Contact number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <Form.Control
                        className='custom-input mb-2'
                        size="sm"
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                      <Form.Control
                        className='custom-input mb-2'
                        size="sm"
                        type="text"
                        placeholder="PinCode"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                    </MDBCardBody>
                    <MDBCardFooter className="p-4 text-center">
                      <MDBBtn className="btn-warning" onClick={handleRazorpayPayment}>
                        Place Order
                      </MDBBtn>
                      <p className="text-muted mt-2">Payment method: online</p>
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
