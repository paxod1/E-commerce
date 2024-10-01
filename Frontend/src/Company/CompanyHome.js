import React, { useState } from 'react';
import axios from 'axios';
import Companynav from './companynav';
import UserFooter from '../Pages/UserFooter';
import { useSelector } from 'react-redux';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import './CompanyHome.css';
import { basicRequest } from '../AxiosCreate';

function CompanyHome() {
  const ComapanyId = useSelector((state) => state.company.CompanyLoginInfo[0]);
  let ComapanyID;
  if (ComapanyId) {
    ComapanyID = ComapanyId.id;
  }
  console.log(ComapanyID);

  const [image, setImage] = useState(null);
  const [companyname, setCompanyname] = useState('');
  const [productname, setProductname] = useState('');
  const [productdocs, setProductdocs] = useState('');
  const [productprice, setProductprice] = useState('');
  const [productofferprice, setProductofferprice] = useState('');

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    formData.append('companyname', companyname);
    formData.append('productname', productname);
    formData.append('productdocs', productdocs);
    formData.append('productprice', productprice);
    formData.append('productofferprice', productofferprice);
    formData.append('ComapanyID', ComapanyID);
    try {
      await basicRequest.post('/Admin/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    height:'20px'
  };

  return (
    <div>
    <div className='navbarhomecompany'>
      <Companynav />
      </div>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <h2 className="fw-bold mb-2 text-uppercase">Add Product</h2>
                <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Image' id='formControlLg' type='file' size="lg" accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])} style={inputStyle} />
                <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Product company name' id='formControlLg' type="text"
                  value={companyname}
                  onChange={(e) => setCompanyname(e.target.value)} size="lg" style={inputStyle} />
                <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Product Name' id='formControlLg' type="text"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)} size="lg" style={inputStyle} />
                <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Product document' id='formControlLg' type="text"
                  value={productdocs}
                  onChange={(e) => setProductdocs(e.target.value)} size="lg" style={inputStyle} />
                <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Product Price' id='formControlLg' type="number"
                  value={productprice}
                  onChange={(e) => setProductprice(e.target.value)} size="lg" style={inputStyle} />
                <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Product offerPrice' id='formControlLg' type="number"
                  value={productofferprice}
                  onChange={(e) => setProductofferprice(e.target.value)} size="lg" style={inputStyle} />
                <MDBBtn outline className='mx-2 px-5' color='white' size='lg' type='button' style={{color:"white",border:"solid white 2px"}}
                  onClick={submitImage}>
                  Submit
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <UserFooter />
    </div>
  );
}

export default CompanyHome;