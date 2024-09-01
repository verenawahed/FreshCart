
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImage1 from "../../assets/images/slider-image-1.jpeg";
import SliderImage2 from "../../assets/images/slider-image-2.jpeg";
import SliderImage3 from "../../assets/images/slider-image-3.jpeg";
import SliderImage4 from "../../assets/images/slider-2.jpeg";
import SliderImage5 from "../../assets/images/grocery-banner.png";
import SliderImage6 from "../../assets/images/grocery-banner-2.jpeg";
import { useState, useEffect } from 'react';

export default function SimpleSlider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    
    const fetchImages = async () => {
      try {
       
        const fetchedImages = [
          SliderImage1,
          SliderImage2,
          SliderImage3,
          SliderImage4,
          SliderImage5,
          SliderImage6,
        ];
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <div className="relative w-full max-w-4xl p-4">
        <Slider {...settings} arrows={false}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index}>
                <img className="w-full h-80 object-cover rounded-lg" src={image} alt={`Slider ${index + 1}`} />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-80">
              <p>Loading...</p>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
}



