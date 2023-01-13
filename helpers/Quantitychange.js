import {useState, useCallback} from 'react';


  


export const useQuantitychange = (nav_quantity,nav_dprice) => {


const [quantityandprice ,setquantityandprice] = useState(
   
    {quantity:nav_quantity,
     price:nav_dprice
    
})

 const FUNC_Quantitychange =useCallback((operation,ogprice)=>{

    if(operation =="plus") {

      let qn = parseInt(quantityandprice.quantity)
      qn = qn + 1
      let qp =  parseInt(ogprice)
      qp = qp *  qn

      setquantityandprice
      ({quantity:qn,price:qp})

    }else if(operation =="minus" && quantityandprice.quantity > 1 ) {

      let qn = parseInt(quantityandprice.quantity)
      qn = qn - 1
      let qp =  parseInt(ogprice)
      qp = qp *  qn

      setquantityandprice
      ({quantity:qn,price:qp})


    } else if(operation =="calu") {
 
       let qn = parseInt(quantityandprice.quantity)
       let qp =  parseInt(ogprice)
       qp = qp *  qn
       setquantityandprice
       ({quantity:qn,price:qp})
     }

    },[quantityandprice])

   return [quantityandprice,FUNC_Quantitychange]
  }