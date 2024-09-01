

// const API_URL = 'https://ecommerce.routemisr.com/api/v1/wishlist';

// export const getWishlist = async (userId) => {
//     const response = await fetch(`${API_URL}/${userId}`, {
//         method: 'GET',
//         headers: {
//             token: localStorage.getItem("token"),
//         },
//     });
//     return response.json();
// };

// export const addToWishlist = async (userId, productId) => {
//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//             token: localStorage.getItem("tkn"),
//         },
//         body: JSON.stringify({ userId, productId }),
//     });
//     return response.json();
// };

// export const removeFromWishlist = async (id) => {
//     await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             token: localStorage.getItem("tkn"),
//         },
//     });
// };
