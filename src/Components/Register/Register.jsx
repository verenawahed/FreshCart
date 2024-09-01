import { useFormik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'

export default function Register() {
const navigate =   useNavigate();
  const [ errorMessage , setErrormessage ] = useState(null);
  const [ isSuccess , setIsSuccess ] = useState(false);
  const [ isClicked, setIsClicked ] = useState(false);
  let user = {
    name:'',
    phone:'',
    password:'',
    rePassword:'',
    email:'',
    
  }
   async function registeruser(values){
    setIsClicked(true);
      axios.post( 'https://ecommerce.routemisr.com/api/v1/auth/signup' , values).then(
        function( x ){
          setIsSuccess(true); 
          setIsClicked(false);
          setTimeout(() => {
            navigate('/login')
          }, 2000);
         
        }
      ).catch(function( x ){
        
        setErrormessage(x.response.data.message);
        setIsClicked(false);
        setTimeout(() => {
          setErrormessage(null);
        }, 2000);
      })
  }
  const registerFormik = useFormik({
    initialValues:user,
    onSubmit:registeruser,
    
    
validationSchema: yup.object().shape({
  name: yup.string().required('name is required').min(3,"minmum must be 3 characters").max(12,"max must be 12 characters"),
  email: yup.string().email('Invaild value').required(),
  password: yup.string().min(6).max(12).required(),
  rePassword: yup.string().required().oneOf([ yup.ref('password')],"Re password doesn't match"),
  phone: yup.string().required('phone required').matches(/^01[0125][0-9{8}]/),
})
  });
  return ( 
   

<div className='p-5 pt-12'>
  {isSuccess ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   congratulations
</div> :''}
  {errorMessage ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   { errorMessage }
</div> :''}
 
  <h2 className='text-center'>Register Now</h2>
<form onSubmit={ registerFormik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input value={ registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name:</label>
     {registerFormik.errors.name && registerFormik.touched.name ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {registerFormik.errors.name}
</div> :'' }
    
  </div>
  <div className="relative z-0 w-full mb-5 group">
  <input value={ registerFormik.values.email} onChange={registerFormik.handleChange}  onBlur={registerFormik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
  <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email:</label>
  {registerFormik.errors.email && registerFormik.touched.email ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {registerFormik.errors.email}
</div> :'' }
    
  </div>
  <div className="relative z-0 w-full mb-5 group">
  <input type="tel" value={ registerFormik.values.phone} onChange={registerFormik.handleChange}  onBlur={registerFormik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone:</label>
  {registerFormik.errors.phone && registerFormik.touched.phone ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {registerFormik.errors.phone}
</div> :'' }
    
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" value={ registerFormik.values.password} onChange={registerFormik.handleChange}  onBlur={registerFormik.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">confirm password</label>
      {registerFormik.errors.password && registerFormik.touched.password ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {registerFormik.errors.password}
</div> :'' }
    
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" value={ registerFormik.values.rePassword} onChange={registerFormik.handleChange}  onBlur={registerFormik.handleBlur} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">confirm password</label>
      {registerFormik.errors.rePassword && registerFormik.touched.rePassword ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {registerFormik.errors.rePassword}
</div> :'' }
    
  </div>
  

  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    { !isClicked ? 'Submit' : <ColorRing
  visible={true}
  height="40"
  width="40"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  />  }
    
  
  </button>
</form>
</div>

  )
}
