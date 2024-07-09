"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  title: string;
  description: string;
  image: {
    title?: string
    description?: string
    contentType?: string
    fileName?: string
    size?: string
    url: string
    width?: number
    height?: number
  };
}

interface HeroSliderProps {
  data: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ data }) => {
  return (
    <section className="w-full">
      <div className="h-screen">
        <ul className="h-full w-full">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
          >
            {data.map((slide, index) => (
              <SwiperSlide key={index} >
                <div
                  className="h-full w-full absolute left-0 top-0"
                  style={{
                    background: `url(${slide.image.url}) center center / cover scroll no-repeat`,
                  }}
                ></div>
               
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                      {slide.title}
                    </p>
                    <div className="text-white mt-4 sm:mt-2 md:mt-3 py-5 px-5 bg-black/40">
                      {slide.description}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default HeroSlider;