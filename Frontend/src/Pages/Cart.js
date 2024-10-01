import React, { useEffect, useState } from 'react';
import Nav from '../nav';
import axios from 'axios';
import './Cart.css';
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
} from "mdb-react-ui-kit";
import './ProductDetails.css';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserFooter from './UserFooter';
import { basicRequest } from '../AxiosCreate';

function Cart() {
    const [allProduct, setAllProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [cartSize, setCartSize] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const MyData = useSelector((state) => state.login.LoginInfo[0]);
    let userID;
    if (MyData) {
        userID = MyData.id;
    }

    const fetchCart = async () => {
        try {
            const result = await basicRequest.get('/Admin/displaycard', { params: { userID } });
            console.log(result.data)
            setCartSize(result.data.length);
            setAllProduct(result.data);

            let total = 0;
            result.data.forEach(item => {
                total += item.productprice;
            });

            setCount(result.data.length);
            setTotalPrice(total);
        } catch (err) {
            console.error('Error fetching cart:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userID) {
            fetchCart();
        }
    }, [userID]);

    const removeFromCart = async (id) => {
        console.log("from frontend of cart..............")
        try {
            await basicRequest.delete(`/Admin/removeFromCart/${id}`);
            console.log("from frontend of cart..............")
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return (
        <>
        <div className='navbarhome'>
        <Nav />

      </div>
            <div className='cart-main-cont'  style={{marginTop:"75px"}}>
                <div className='right-side'>
                    {loading ? (
                        <p>Loading....</p>
                    ) : allProduct.length > 0 ? (
                        allProduct.map((data) => (
                            <MDBContainer fluid key={data._id}>
                                <MDBRow className="justify-content-center mb-0">
                                    <MDBCol md="12" xl="10">
                                        <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                        <MDBRipple
                                                            rippleColor="light"
                                                            rippleTag="div"
                                                            className="bg-image rounded hover-zoom hover-overlay"
                                                        >
                                                            <MDBCardImage
                                                                src={require(`../Images/${data.image}`)}
                                                                fluid
                                                                className="w-100"
                                                            />
                                                            <a href="#!">
                                                                <div
                                                                    className="mask"
                                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                                ></div>
                                                            </a>
                                                        </MDBRipple>
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        <h5>{data.productname}</h5>
                                                        <div className="d-flex flex-row">
                                                            <div className="text-danger mb-1 me-2">
                                                                <MDBIcon fas icon="star" />
                                                                <MDBIcon fas icon="star" />
                                                                <MDBIcon fas icon="star" />
                                                                <MDBIcon fas icon="star" />
                                                            </div>
                                                            <span>310</span>
                                                        </div>
                                                        <div className="mt-1 mb-0 text-muted small">
                                                            <span>100% cotton</span>
                                                            <span className="text-primary"> • </span>
                                                            <span>Light weight</span>
                                                            <span className="text-primary"> • </span>
                                                            <span>
                                                                Best finish
                                                                <br />
                                                            </span>
                                                        </div>
                                                        <div className="mb-2 text-muted small">
                                                            <span>Unique design</span>
                                                            <span className="text-primary"> • </span>
                                                            <span>For men</span>
                                                            <span className="text-primary"> • </span>
                                                            <span>
                                                                Casual
                                                                <br />
                                                            </span>
                                                        </div>
                                                        <p className="text-truncate mb-4 mb-md-0">
                                                            {data.productdocs}
                                                        </p>
                                                    </MDBCol>
                                                    <MDBCol
                                                        md="6"
                                                        lg="3"
                                                        className="border-sm-start-none border-start"
                                                    >
                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <h4 className="mb-1 me-1">${data.productprice}</h4>
                                                        </div>
                                                        <h6 className="text-success">Quantity:{data.Quantity} </h6>
                                                        <h6 className="text-success">Free shipping</h6>
                                                        <div className="d-flex flex-column mt-4">
                                                            <Link to={`/BuyNow/${data._id}`} style={{ marginRight: "5px" }}>
                                                            <MDBBtn outline color="primary" size="sm" className="mt-2">
                                                                Buy Now
                                                            </MDBBtn>
                                                                
                                                            </Link>
                                                            <MDBBtn outline color="primary" size="sm" className="mt-2" onClick={() => removeFromCart(data._id)}>
                                                                Remove
                                                            </MDBBtn>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        ))
                    ) : (
                        <p>empty</p>
                    )}
                </div>
                <div className="total-price">
                    <h5>{count} <FaCartShopping /></h5>
                    <p>Total Price: ${totalPrice}</p>
                    <button className="btn-buy" onClick={() => navigate('/checkout')}>Check Out</button>
                </div>
            </div>
            <UserFooter />
        </>
    );
}

export default Cart;
