import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";


export default function Payment() {
    const {cartId,clearUi}=useContext(CartContext);
    
    const[isonline,setisonline] =useState(false);
    function detectAndCall(values){
        if(isonline){
            onlinepayment(values);
            
                }
        else{
            
            creatcashorder(values);
            
        }
    }
    function creatcashorder(values){
    const backendBody = {
        shippingAddress:values,
    };
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,backendBody,{
        headers:{
            token:localStorage.getItem('tkn')
        }
    }).then((res)=>{
        console.log('after cash order',res);
        clearUi();
    })
    .catch((erro)=>{
        console.log('erro',erro)
    });
    };
    function onlinepayment(values){
        const backendBody = {
            shippingAddress:values,
        };
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,backendBody,{
            headers:{
                token:localStorage.getItem('tkn')
            },
            params:{
                url:'http://localhost:5173'
            }
        }).then((res)=>{
            console.log('after online order',res);
            window.open(res.data.session.url,'_self');
            
        })
        .catch((erro)=>{
            console.log('erro',erro)
        });
        };
    
            const paymentformik= useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
        
        onSubmit:detectAndCall,
    })
    return <>
    <div className="container mx-auto w-[90%] p-5">
    <form onSubmit={paymentformik.handleSubmit} className="max-w-md mx-auto pt-10">
    
    <div className="relative z-0 w-full mb-5 group">
    <input value={ paymentformik.values.details
    } onChange={paymentformik.handleChange}  onBlur={paymentformik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details:</label>
    {paymentformik.errors.details && paymentformik.touched.details ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {paymentformik.errors.details}
</div> :'' }
    
    </div>
    
    <div className="relative z-0 w-full mb-5 group">
        <input type="tel" value={ paymentformik.values.phone} onChange={paymentformik.handleChange}  onBlur={paymentformik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> phone:</label>
        {paymentformik.errors.phone && paymentformik.touched.phone ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {paymentformik.errors.phone}
</div> :'' }
    
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" value={ paymentformik.values.city} onChange={paymentformik.handleChange}  onBlur={paymentformik.handleBlur} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city:</label>
        {paymentformik.errors.city && paymentformik.touched.city ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {paymentformik.errors.city}
</div> :'' }
    
    </div>
    
    

    
    <button onClick={ () => setisonline(false)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    cash order
    </button>
    <button onClick={ () => setisonline(true)} type="submit" className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        online payment order
    </button>
</form>
    </div>
    
    </>
}
