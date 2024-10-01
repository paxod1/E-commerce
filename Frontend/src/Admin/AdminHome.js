import React, { useState } from 'react'
import AdminNav from './AdminNav'
import './AdminHome.css'
import axios from 'axios'
import UserFooter from '../Pages/UserFooter'


function AddminHome() {
  const [image, setImage] = useState([])
  const [companyName,setCompanyName]=useState()
  const [productName, setProductName] = useState()
  const [productDocs, setProductDocs] = useState()
  const [productPrice, setProductPrice] = useState()
  const [allProduct, setAllProduct] = useState([])
  const submitImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image)
    formData.append('companyname',companyName)
    formData.append('productname', productName)
    formData.append('productdocs', productDocs)
    formData.append('productprice', productPrice)
    await basicRequest.post('/Admin/upload', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  }
  const ShowImage = async () => {
    const result = await basicRequest.get('/Admin/getimage')
    console.log(result.data)
    setAllProduct(result.data)
  }
  return (
    <div>
    <div className='navbarhomeadmin'>
    <AdminNav/>
    </div>
    <div className='main-navgap'>
      <div className='maindiv'>
        <div className='innerdiv'>
          <input className='adminInput' type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <input className='adminInput'  placeholder='Enter company name' type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <input className='adminInput'  placeholder='Enter Product name' type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input className='adminInput'  placeholder='Enter Product docs' type="text" value={productDocs} onChange={(e) => setProductDocs(e.target.value)} />
          <input className='adminInput'  type="number" placeholder=" Enter Product Price" value={productPrice}  onChange={(e) => setProductPrice(e.target.value)} />
          <button className='sibmitbutton' type='button' onClick={submitImage}>upload</button>
          <button onClick={ShowImage}>show</button>
        </div>
      </div>

      {
        Array.isArray(allProduct) && allProduct.map((data, index) => (
          <img key={index} src={require(`../Images/${data.image}`)} />
        ))}
        <UserFooter/>
        </div>
    </div>
  )
}

export default AddminHome