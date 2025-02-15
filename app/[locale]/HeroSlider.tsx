"use client";

import { useParams } from 'next/navigation';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

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
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  
  return (
    <section className="w-full">
      <div className="h-[60vh] md:h-full">
        <ul className="h-[60vh] w-full">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
          >
            {/* {data.map((slide, index) => (
              <SwiperSlide key={index} >
                <div
                  className="h-[60vh] md:min-h-[50vh] w-full absolute left-0 top-0"
                  style={{
                    background: `url(${slide.image.url}) center center / cover scroll no-repeat`,
                  }}
                ></div>
               
                <div className="relative z-10 h-full flex items-center justify-center md:min-h-[50vh]">
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
            ))} */}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default HeroSlider;