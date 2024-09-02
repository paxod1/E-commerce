
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CompanyNav from './companynav';
import UserFooter from '../Pages/UserFooter';
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
import { TokenRequest, basicRequest } from '../AxiosCreate';

function CompanyOrders() {
    const [orderlist, setOrderlist] = useState([])
    const companyLogin = useSelector((state) => state.company?.CompanyLoginInfo[0]);
    let ComapanyID;

    if (companyLogin) {
        ComapanyID = companyLogin.id;
    }
    console.log("CompanyID from front-end:", ComapanyID);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await basicRequest.get('/Admin/companyOrders', { params: { ComapanyID } });
                console.log("Orders from back-end:", result.data);
                setOrderlist(result.data)
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        if (ComapanyID) {
            fetchOrders();
        }
    }, [ComapanyID]);

    async function Cancelorder(id){
        try{
         await TokenRequest.delete(`/Admin/orderdelete/${id}`)
        console.log("canceled")
        }catch(err){
         console.log(err)
        }
 }

    return (
        <div>
            <div className='navbarhomecompany'>
                <CompanyNav />
            </div>
            {
                orderlist.length > 0 ? (
                  orderlist.map((data, index) => (
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
                                    {" "}
                                    Order ID{" "}
                                    <span className="fw-bold text-body">1222528743</span>
                                  </p>
                                  <p className="text-muted mb-0">
                                    {" "}
                                    Place On{" "}
                                    <span className="fw-bold text-body">
                                      12,March 2019
                                    </span>{" "}
                                  </p>
                                </div>
                                <div>
                                  <MDBTypography tag="h6" className="mb-0">
                                    {" "}
                                    <a href="#">View Details</a>{" "}
                                  </MDBTypography>
                                </div>
                              </div>
                            </MDBCardHeader>
                            <MDBCardBody className="p-4">
                              <div className="d-flex flex-row mb-4 pb-2">
                                <div className="flex-fill">
                                  <MDBTypography tag="h5" className="bold">
                                  {data.newOrder.productname}
                                  </MDBTypography>
                                  <p className="text-muted"> Qt: 1 item</p>
                                  <MDBTypography tag="h4" className="mb-3">
                                    {" "}
                                    $ {data.newOrder.productofferprice}{" "}
                                    <span className="small text-muted"> via (COD) </span>
                                  </MDBTypography>
                                  <p className="text-muted">
                                  Custmer Name:{data.name}
                             
                                </p>
                                <p className="text-muted">
                                Custmer Email:{data.email}
                          
                              </p>
                              <p className="text-muted">
                                Contact number:{data.phoneNumber}
                           
                              </p>
                              <p className="text-muted">
                                Post code:{data.pin}
                               
                              </p>
                              <p className="text-muted">
                              Address:{data.address}
                         
                            </p>
                            
                                </div>
                                <div>
                                  <MDBCardImage
                                    fluid
                                    className="align-self-center"
                                    src={require(`../Images/${data.newOrder.image}`)}
                                    width="250"
                                  />
                                </div>
                              </div>
                            
                            </MDBCardBody>
                            <MDBCardFooter className="p-4">
                              <div className="d-flex justify-content-between">
                                <div className="border-start h-100"></div>
                                <MDBTypography tag="h5" className="fw-normal mb-0">
                                  <a href="#!" onClick={()=>Cancelorder(data._id)}>Reject The Order</a>
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
                  ))
                ) : (
                  <p>loading....</p>
                )
              }

            <UserFooter />
        </div>
    );
}

export default CompanyOrders;
