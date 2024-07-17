//src/pages/SalesPage.tsx


import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTransaction } from "../contexts/TransactionContext";
import products from '../assets/jsons/products.json';
import './SalesPage.css';
import { useEffect } from "react";

/*interface Transaction{
  photo_id:number;
  consumer_email: string;
  is_delivered:boolean;
}*/

/*interface Product{
  photo_id:number;
  filename: string;
  pictured_by: string;
  url: string;
  mimetype: string;
  price: number;
  description: string;
  tags: string[];
  location:string;
}*/


function SalesPage() {
  const {isLoggedIn, userEmail} = useAuth();
  const{userSelling, userSold, fetchTransaction}=useTransaction();
  const navigate =useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchTransaction(userEmail);
    }
  }, [isLoggedIn, userEmail]);
  
  const handleLogout = () =>{
    if(isLoggedIn){
      navigate('/logout');
    }
    else{
      navigate('/sales');
    }
  }
  
  const handleLogin = ()=>{
    if (isLoggedIn){
      navigate('/sales');
    }
    else{
      navigate('/sales/login');
    }
  }

  if(isLoggedIn){
    return  (
      <div className="sales-history-container">
        <h1 className="sales-history-heading">판매 내역</h1>
        <h2>배송 대기중</h2>
        <table className="sales-table">
          <thead>
            <tr>
              <th>제품</th>
              <th>가격</th>
              <th>구매자</th>
            </tr>
          </thead>
          <tbody>
            { userSelling.map(t=>{
                const item=products.find(p => p.photo_id==t.photo_id);
                if(item) {
                  return (
                    <tr key={item.photo_id}>
                      <td><img src={item?.url} alt={item.description} width="50" /></td>
                      <td>{item.price}</td>
                      <td>{t.consumer_email}</td>
                    </tr>);}
                else{
                  return;
                }
            }) }
          </tbody>
        </table>
        <h2>배송 완료</h2>
        <table className="sales-table" >
          <thead>
            <tr>
              <th>제품</th>
              <th>가격</th>
              <th>구매자</th>
            </tr>
          </thead>
          <tbody>
            { userSold.map(t=>{
                const item=products.find(p => p.photo_id==t.photo_id);
                if(item) {
                  return (
                    <tr key={item.photo_id}>
                      <td><img src={item?.url} alt={item.description} width="50" /></td>
                      <td>{item.price}</td>
                      <td>{t.consumer_email}</td>
                    </tr>);}
                else{
                  return;
                }
            }) }
          </tbody>
        </table>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  else{
    return(
      <div>
        <h1>로그인 해주세요</h1>
        <h2>판매내역 보기는 로그인 후 가능합니다.</h2>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
}
  
  export default SalesPage;