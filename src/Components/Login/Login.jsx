import { useFormik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { authCountext } from '../../Context/AuthCountext'
import { CartContext } from '../../Context/CartContext'
import LoadindScreen from '../Layout/LoadingScreen/LoadindScreen'
import { ColorRing } from 'react-loader-spinner'
export default function Login() {
  const { setToken } = useContext(authCountext);
  const { getUserCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const loginUser = async (values) => {
    setIsClicked(true);
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      setToken(response.data.token);
      localStorage.setItem('tkn', response.data.token);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      getUserCart();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsClicked(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  const registerFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: loginUser,
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid value').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').max(12, 'Password must be less than 12 characters').required('Password is required'),
    }),
  });

  const forgotPasswordFormik = useFormik({
    initialValues: { email: '' },
    onSubmit: async (values) => {
      setIsSubmittingPassword(true);
      try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
        alert("Password reset link sent to your email.");
        navigate('/change-password'); 
      } catch (error) {
        alert("Error sending reset link. Please try again.");
      } finally {
        setIsSubmittingPassword(false);
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email').required('Email is required'),
    }),
  });

  return (
    <div className='p-5 pt-12'>
      {isSuccess && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          Welcome back
        </div>
      )}
      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {errorMessage}
        </div>
      )}

      {!isForgotPasswordClicked ? (
        <>
          <h2 className='text-center'>Login Now</h2>
          <form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={registerFormik.values.email}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email:
              </label>
              {registerFormik.errors.email && registerFormik.touched.email && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  {registerFormik.errors.email}
                </div>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                value={registerFormik.values.password}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password:
              </label>
              {registerFormik.errors.password && registerFormik.touched.password && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  {registerFormik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {!isClicked ? 'Login' : (
                <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}/>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsForgotPasswordClicked(true)}
              className="text-blue-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={forgotPasswordFormik.handleSubmit} className="max-w-md mx-auto mt-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={forgotPasswordFormik.values.email}
              onChange={forgotPasswordFormik.handleChange}
              onBlur={forgotPasswordFormik.handleBlur}
              type="email"
              name="email"
              id="forgot-email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="forgot-email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email:
            </label>
            {forgotPasswordFormik.errors.email && forgotPasswordFormik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {forgotPasswordFormik.errors.email}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isSubmittingPassword ? 'Sending...' : 'Send Reset Link'}
          </button>
          <div className="text-center mt-4">
            <button
              onClick={() => setIsForgotPasswordClicked(false)}
              className="text-blue-700 hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}




