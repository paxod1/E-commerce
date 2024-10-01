import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CompanyNav from './companynav';
import { useSelector } from 'react-redux';
import UserFooter from '../Pages/UserFooter';
import { basicRequest } from '../AxiosCreate';

function CompanyProduct() {
    const [allProduct,setAllProduct]=useState({})
    const companyLogin=useSelector((state)=>state.company?.CompanyLoginInfo[0]);
    if(companyLogin){
        var ComapanyID=companyLogin.id
        
    }
    console.log(ComapanyID)

    useEffect(()=>{
          fetchProducts()
    },[])
    const fetchProducts = async () => {
        try {
          const result = await basicRequest.get('/Admin/getcompanyproduct',{ params: {ComapanyID} });
          setAllProduct(result.data);
          console.log(result.data)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
        const deleteProduct =async (id)=>{
          console.log(id)
            try{
                await basicRequest.delete(`/Admin/deleteproduct/${id}`)
                fetchProducts()
                console.log("deleted")
            }catch(err){
                console.log(err)
            }
        }
  return (
    <div>
    <div className='navbarhomecompany'>
    <CompanyNav />
    </div>
    <div className='container overflow-hidden' style={{marginTop:"80px"}}>
      <div className="row gy-4 gy-lg-0 gx-xxl-5">
    {
        allProduct.length > 0 ? (
          allProduct.map((data, index) => (
            <div className="col-12 col-md-6 col-lg-3">
              <div class="card border-0 border-bottom border-primary shadow-sm overflow-hidden">
                <div className="card p-0">
                  <figure className='m-0 p-0'>
                      <img src={require(`../Images/${data.image}`)} className="card-img-top" alt='#'
                        style={{ cursor: 'pointer' }}
                      />
                    <div className="card-body">
                      <figcaption className="m-0 p-4">
                        <h5 className="card-title" id='card-titles'>{data.productname}</h5>
                        <h5 className="card-title" id='card-titles'>{data._id}</h5>
                        <button className="btn btn-black" id='pricebtn'><span id='prices'>${data.productprice}</span> <span id='offers'>Offer Price: </span><span id='offerprices'>${data.productofferprice}</span></button>
                      </figcaption>
                    </div>
                  </figure>
                  <button className='cartbutton' onClick={()=>deleteProduct(data._id)}>Remove Product</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>empty...</p>
        )
      }
      </div>
      </div>
      <UserFooter />
      </div>
  )
}

export default CompanyProduct