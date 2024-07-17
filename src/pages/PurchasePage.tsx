//src/pages/PurchasePage.tsx


import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTransaction } from "../contexts/TransactionContext";
import products from '../assets/jsons/products.json';
import './PurchasePage.css';
import { useEffect, useState } from "react";

interface Transaction{
  photo_id:number;
  consumer_email: string;
  is_delivered:boolean;
}

function PurchasePage() {
  const [whichToDone,setWhichToDone]= useState<Transaction|false>(false);
  const [whichToCancel,setWhichToCancel]= useState<Transaction|false>(false);
  const {isLoggedIn, userEmail} = useAuth();
  const{userBuying, userBought, fetchTransaction, doneTransaction,cancelTransaction}=useTransaction();
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
      navigate('/purchases');
    }
  }
  
  const handleLogin = ()=>{
    if (isLoggedIn){
      navigate('/purchases');
    }
    else{
      navigate('/purchases/login');
    }
  }

  const toggleDonePopup= (whichTrans: Transaction|false)=>{
    setWhichToDone(whichTrans);
  }
  const toggleCancelPopup=(whichTrans: Transaction|false)=>{
    setWhichToCancel(whichTrans);
  }

  if(isLoggedIn){

    return  (
      <div className="purchases-history-container">
        <h1 className="purchases-history-heading">구매 내역</h1>
        <h2>배송중</h2>
        <table className="purchases-table">
          <thead>
            <tr> 
              <th>제품</th>
              <th>가격</th>
              <th>판매자</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { userBuying.map(t=>{
                const item=products.find(p => p.photo_id==t.photo_id);
                if(item) {
                  return (
                    <tr key={item.photo_id}>
                      <td><img src={item?.url} alt={item.description} width="50" /></td>
                      <td>{item.price}</td>
                      <td>{item.pictured_by}</td>
                      <td>
                        <button onClick={()=> toggleDonePopup(t)}>배송 완료</button>
                      </td>
                      <td>
                        <button onClick={()=>toggleCancelPopup(t)}>주문 취소</button>
                      </td>
                    </tr>);}
                else{
                  return;
                }
            }) }
          </tbody>
        </table>
        <h2>배송 완료</h2>
        <table className="purchases-table" >
          <thead>
            <tr>
              <th>제품</th>
              <th>가격</th>
              <th>판매자</th>
            </tr>
          </thead>
          <tbody>
            { userBought.map(t=>{
                const item=products.find(p => p.photo_id==t.photo_id);
                if(item) {
                  return (
                    <tr key={item.photo_id}>
                      <td><img src={item?.url} alt={item.description} width="50" /></td>
                      <td>{item.price}</td>
                      <td>{item.pictured_by}</td>
                    </tr>);}
                else{
                  return;
                }
            }) }
          </tbody>
        </table>
        <button onClick={handleLogout}>Logout</button>
        {(whichToDone)&&
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={()=>toggleDonePopup(false)}>X</button>
            <h2>배송 완료</h2>
            <p>상품을 전달 받으신 경우</p><p>'확인'을 눌러 배송 완료 처리를 해주세요</p>
            <button className="btn" onClick={
              ()=>{doneTransaction(whichToDone); toggleDonePopup(false)}
              }> 확인
            </button>
          </div>
        </div>
      }
      {(whichToCancel)&&
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={()=>toggleDonePopup(false)}>X</button>
            <h2>주문 취소</h2>
            <p>정말 주문을 취소하시겠습니까?</p><p>판매자와의 합의가 이뤄지지 않은 취소는 환불이 불가합니다.</p>
            <button className="btn" onClick={
              ()=>{cancelTransaction(whichToCancel); toggleCancelPopup(false)}
              }> 주문 취소
            </button>
          </div>
        </div>
      }
      </div>
    );
  }
  else{
    return(
      <div>
        <h1>로그인 해주세요</h1>
        <h2>구매내역 보기는 로그인 후 가능합니다.</h2>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
}
  
  export default PurchasePage;