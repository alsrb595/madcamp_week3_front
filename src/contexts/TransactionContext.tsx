// src/contexts/TransactionContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import transactions from '../assets/jsons/transaction.json';
import products from '../assets/jsons/products.json';


interface Transaction{
  photo_id:number;
  consumer_email: string;
  is_delivered:boolean;
}

interface TransactionContextType{
  userBuying: Transaction[];
  userBought: Transaction[];
  userSelling: Transaction[];
  userSold: Transaction[];

  fetchTransaction: (userEmail:string)=>void;
  startTransaction: (transaction: Transaction)=>void;
  doneTransaction:(transaction: Transaction) =>void;
  cancelTransaction: (transaction: Transaction)=> void;
  initTransaction:()=>void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within an TransactionProvider');
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userBuying, setUserBuying]= useState<Transaction[]>([]);
  const [userBought, setUserBought]=useState<Transaction[]>([]);
  const [userSelling, setUserSelling]=useState<Transaction[]>([]);
  const [userSold, setUserSold]=useState<Transaction[]>([]);

  const fetchTransaction= (userEmail: string) => {
    const buying: Transaction[]= transactions
    .filter(t=> ((t.consumer_email==userEmail) &&
      (! t.is_delivered))) ;
    const bought: Transaction[]=transactions
      .filter(t=> ((t.consumer_email==userEmail) &&
      (t.is_delivered)));
    setUserBuying(buying);
    setUserBought(bought);
    const sellingProducts=products.filter(p=> p.pictured_by == userEmail);
    const selling: Transaction[]=transactions
      .filter(t=> 
        sellingProducts.some(sellingProduct => sellingProduct.photo_id==t.photo_id)
        && (!t.is_delivered)
    );
    const sold: Transaction[]=transactions
      .filter(t=> 
        sellingProducts.some(sellingProduct => sellingProduct.photo_id==t.photo_id)
        && (t.is_delivered)
    );
    setUserSelling(selling);
    setUserSold(sold);
    
  }

  const startTransaction=(transaction: Transaction)=>{
    if(! transaction.is_delivered){
      setUserBuying([...userBuying, transaction]);
    }
  }
  const doneTransaction=(transaction: Transaction)=>{
    if(transaction.is_delivered){
      setUserBuying(userBuying.filter(t=>
        (t.consumer_email != transaction.consumer_email)&&
        (t.photo_id != transaction.photo_id)));
      setUserBought([...userBought, transaction]);
    }
  }
  const cancelTransaction=(transaction: Transaction)=>{
    if(! transaction.is_delivered){ 
      setUserBuying(userBuying.filter(t=>
      (t.consumer_email != transaction.consumer_email)&&
      (t.photo_id != transaction.photo_id)));
    }
  }
  const initTransaction=()=>{
    setUserBuying([]);
    setUserBought([]);
    setUserSelling([]);
    setUserSold([]);
  }


  return (
    <TransactionContext.Provider value={{userBuying,userBought,userSelling,userSold,fetchTransaction,startTransaction, doneTransaction, cancelTransaction,initTransaction}}>
      {children}
    </TransactionContext.Provider>
  );
};
