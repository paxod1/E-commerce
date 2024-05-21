import React, { useEffect, useState } from 'react'
import { TokenRequest } from '../AxiosCreate'
import Card from 'react-bootstrap/Card';
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
import './order.css'


function Orders() {
  const [orderlist, setOrderlist] = useState([])
  const MyData = useSelector((state) => state.login.LoginInfo[0]);
    let userID;
    if (MyData) {
        userID = MyData.id;
    }
  console.log("user id>>>>>>>>>>>>>",userID);

  useEffect(() => {
    const featchOrders = async () => {
      const result = await TokenRequest.get('/Admin/Oreders',{params:{userID}})
      console.log(result.data)
      setOrderlist(result.data)
    }
    featchOrders()
  }, [])

  async function Cancelorder(id){
         try{
          await TokenRequest.delete(`/Admin/orderdelete/${id}`)
         console.log("canceled")
         }catch(err){
          console.log(err)
         }
  }
  return (
    <>
    <div className='navbarhome'>
    <Nav1/>

  </div>
      <div style={{marginTop:"80px"}}>
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
                              Tracking Status on:{" "}
                              <span className="text-body">11:30pm, Today</span>
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
                        <ul
                          id="progressbar-1"
                          className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4"
                        >
                          <li className="step0 active" id="step1">
                            <span style={{ marginLeft: "22px", marginTop: "12px" }}>
                              PLACED
                            </span>
                          </li>
                          <li className="step0 active text-center" id="step2">
                            <span>SHIPPED</span>
                          </li>
                          <li className="step0 text-muted text-end" id="step3">
                            <span style={{ marginRight: "22px" }}>DELIVERED</span>
                          </li>
                        </ul>
                      </MDBCardBody>
                      <MDBCardFooter className="p-4">
                        <div className="d-flex justify-content-between">
                          <MDBTypography tag="h5" className="fw-normal mb-0">
                            <a href="#!">Track</a>
                          </MDBTypography>
                          <div className="border-start h-100"></div>
                          <MDBTypography tag="h5" className="fw-normal mb-0">
                            <a href="#!" onClick={()=>Cancelorder(data._id)}>Cancel</a>
                          </MDBTypography>
                          <div className="border-start h-100"></div>
                          <MDBTypography tag="h5" className="fw-normal mb-0">
                            <a href="#!">cash on delivery</a>
                          </MDBTypography>
                          <div className="border-start h-100"></div>
                          <MDBTypography tag="h5" className="fw-normal mb-0">
                            <a href="#!" className="text-muted">
                              <MDBIcon fas icon="ellipsis-v" />
                            </a>
                          </MDBTypography>
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

      <UserFooter/>


      </div>
    </>

  )
}

export default Orders