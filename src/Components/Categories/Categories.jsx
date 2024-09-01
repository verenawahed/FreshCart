
import useAllCategories from "../../CustomHooks/useAllCategories";
import LoadindScreen from "../Layout/LoadingScreen/LoadindScreen";
import { useState } from 'react';
export default function Categories() {
  const [isLoading, setIsLoading] = useState(false);
  const { data, isError, isLoading: dataLoading } = useAllCategories();
    if (dataLoading) {
    return (
      <LoadindScreen/>
    );
  }

  if (isError) {
    return <h2>Error fetching categories</h2>;
  }

  const handleImageClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
  };

  return (
    <div className="relative">
    
      {isLoading && (
      
          <LoadindScreen /> 
        
      )}

      <div className="container py-5 w-[90%] mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {data.data.data.map((brand) => (
            <div
              key={brand._id}
              className="brand p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="object-cover w-full h-40 rounded-t-xl cursor-pointer"
                  onClick={handleImageClick}
                />
                <h2 className="text-center text-pink-500 mt-4 font-semibold">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
