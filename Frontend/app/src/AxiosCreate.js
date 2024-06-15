import axios from "axios";

const backendUrl = 'https://e-commerce-web-6qp7.onrender.com'; // Update with your actual backend URL

const persistedLoginData = localStorage.getItem("persist:logindata");
const loginData = persistedLoginData ? JSON.parse(persistedLoginData) : {};
const loginInfo = loginData.login ? JSON.parse(loginData.login).LoginInfo[0] : null;
const adminInfo = loginData.admin ? JSON.parse(loginData.admin).AdminLoginInfo[0] : null;
const companyInfo = loginData.company ? JSON.parse(loginData.company).CompanyLoginInfo[0] : null;
const TOKEN = loginInfo ? loginInfo.Token : '';
const PASS = adminInfo ? adminInfo.Pass : '';
const COMPANYPASS = companyInfo ? companyInfo.CompanyPass : '';

export const basicRequest = axios.create({
  baseURL: backendUrl,
});

export const TokenRequest = axios.create({
  baseURL: backendUrl,
  headers: { Authorization: `Bearer ${TOKEN}` } 
});

export const PassRequest = axios.create({
  baseURL: backendUrl,
  headers: { Pass: PASS }
});

export const comapanyRequest = axios.create({
  baseURL: backendUrl,
  headers: { companyPass: COMPANYPASS }
});
