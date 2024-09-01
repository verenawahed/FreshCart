import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BrandDetails() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(response => setBrand(response.data.data))
      .catch(error => console.error('Error fetching brand details:', error));
  }, [id]);

  if (!brand) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5 pt-14">
      <h1 className="text-4xl font-bold text-center mb-5">{brand.name}</h1>
      <img src={brand.image} alt={brand.name} className="w-full max-w-lg mx-auto" />
      <p className="mt-5 text-lg text-center">Some details about the brand or its products...</p>
    </div>
  );
}
