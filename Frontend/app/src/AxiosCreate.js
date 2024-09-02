import axios from "axios";

const SampleUrl = 'http://localhost:5000';
const persistedLoginData = localStorage.getItem("persist:logindata");
const loginData = persistedLoginData ? JSON.parse(persistedLoginData) : {};
const loginInfo = loginData.login ? JSON.parse(loginData.login).LoginInfo[0] : null;
const adminInfo = loginData.admin ? JSON.parse(loginData.admin).AdminLoginInfo[0] : null;
const companyInfo=loginData.company ? JSON.parse(loginData.company).CompanyLoginInfo[0]:null;
const TOKEN = loginInfo ? loginInfo.Token : '';
const PASS = adminInfo ? adminInfo.Pass : '';
const COMPANYPASS=companyInfo? companyInfo.CompanyPass:'';

export const basicRequest = axios.create({
  baseURL: SampleUrl
});

export const TokenRequest = axios.create({
  baseURL: SampleUrl,
  headers: { Authorization: `Bearer ${TOKEN}` } 
});

export const PassRequest = axios.create({
  baseURL: SampleUrl,
  headers: { Pass: PASS }
});

export const comapanyRequest=axios.create({
  baseURL:SampleUrl,
  headers:{companyPass:COMPANYPASS}
})