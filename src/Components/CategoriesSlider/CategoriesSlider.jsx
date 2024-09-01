  import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FallingLines } from "react-loader-spinner";
import useAllCategories from "../../CustomHooks/useAllCategories";
export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,  
    slidesToScroll: 5,  
    arrows: false,
    autoplay: true,      
          autoplaySpeed: 2000 ,
    responsive: [
      {
        breakpoint: 1024,  
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
          autoplay: true,      
          autoplaySpeed: 2000 ,
        },
      },
      {
        breakpoint: 768,  
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          autoplay: true,      
          autoplaySpeed: 2000 ,
        },
      },
      {
        breakpoint: 480,  
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          autoplay: true,      
          autoplaySpeed: 2000 ,
        },
      },
    ],
  };

  const { data, isError, isLoading } = useAllCategories();

  if (isLoading) {
    return (
      <FallingLines
        color="#f00"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    );
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  return (
    <>
      <Slider {...settings}>
        {data.data.data.map((category) => (
          <div key={category._id} className="p-2">
            <img
              className="w-full h-36 object-cover rounded-lg pt-5"
              src={category.image}
              alt={category.name}
            />
            <h6 className="text-center text-sm mt-2">{category.name}</h6>
          </div>
        ))}
      </Slider>
    </>
  );
}
