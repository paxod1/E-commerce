import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TokenRequest } from '../AxiosCreate';
import Nav1 from '../nav';
import UserFooter from './UserFooter';
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

function ProductDetails() {
    const { id } = useParams();
    const [newOrder, setNewOrder] = useState(null);

    useEffect(() => {
        const orderProduct = async (id) => {
            try {
                const result = await TokenRequest.get(`/Admin/FindProduct/${id}`);
                setNewOrder(result.data);
            } catch (err) {
                console.log(err);
            }
        };

        orderProduct(id);

    }, [id]);

    if (!newOrder) {
       
        return <div>Loading...</div>;
    }
   

    return (
        <div>
        <div className='navbarhome'>
        <Nav1 />

      </div>
            <MDBContainer fluid style={{marginTop:"80px"}}>
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
                                            <div class="images p-3">
                                                <div class="text-center p-4" id='singleproduct'><img src={require(`../Images/${newOrder.image}`)} alt={newOrder.productname} width="250"/></div>
                                            </div>
                                            <a href="#!">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                ></div>
                                            </a>
                                        </MDBRipple>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <h5>{newOrder.productname}</h5>
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
                                            {newOrder.productdocs}
                                        </p>
                                    </MDBCol>
                                    <MDBCol
                                        md="6"
                                        lg="3"
                                        className="border-sm-start-none border-start"
                                    >
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="mb-1 me-1">${newOrder.productofferprice}</h4>
                                            <span className="text-danger">
                                                <s>${newOrder.productprice}</s>
                                            </span>
                                        </div>
                                        <h6 className="text-success">Free shipping</h6>
                                        <div className="d-flex flex-column mt-4">
                                            <Link to={`/BuyNow/${newOrder._id}`} style={{ marginRight: "5px" }}>
                                                <Button variant="primary" style={{ backgroundColor: "blue" }}>Buy Now</Button>
                                            </Link>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <UserFooter />
        </div>
    );
}

export default ProductDetails;