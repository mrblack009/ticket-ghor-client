import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import bannerImg1 from "../../assets/images/banner1.jpg";
import bannerImg2 from "../../assets/images/banner2.jpg";
import bannerImg3 from "../../assets/images/banner3.jpg";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Container from "../Shared/Container/Container";
import Button from "../Shared/Button/Button";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: bannerImg1,
      title: "Your Trusted Partner for Safe Journeys",
      subtitle:
        "Book your tickets for Bus, Train, Launch, or Flights across the country in just a single click.",
    },
    {
      image: bannerImg2,
      title: "Save Your Time, Enjoy The Voyage",
      subtitle:
        "Experience a seamless booking process equipped with real-time countdowns and smart tracking.",
    },
    {
      image: bannerImg3,
      title: "Premium & Redefined Travel Experience",
      subtitle:
        "Get exclusive deals from top-tier vendors and embark on your next unforgettable adventure.",
    },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  return (
    <div className="relative overflow-hidden shadow-2xl bg-black group">
      <style>{`
        
        .swiper-button-prev {
          left: 40px !important; 
        }
        .swiper-button-next {
          right: 40px !important;
        }

        .swiper-button-next, .swiper-button-prev {
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          width: 25px;
          height: 25px;
        
          border-radius: 50%;
          color: #fff !important;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0;
          z-index: 20;
        }
        
        .group:hover .swiper-button-next, .group:hover .swiper-button-prev { 
          opacity: 1; 
        }
        
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: hsl(var(--p));
          border-color: transparent;
          transform: scale(1.05);
        }
        
        .swiper-button-next:after, .swiper-button-prev:after { 
          font-size: 18px !important; 
          font-weight: bold; 
        }
        
        /* Custom Pagination Dots */
        .swiper-pagination {
          z-index: 20 !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
          opacity: 1 !important;
          width: 8px;
          height: 8px;
          transition: all 0.4s ease;
        }
        .swiper-pagination-bullet-active {
          background: hsl(var(--p)) !important;
          width: 28px !important;
          border-radius: 4px;
        }
      `}</style>

      <Swiper
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-[480px] md:h-[620px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            {/* Background Image Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out scale-100 group-hover:scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Cinematic Center-focused Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/60 z-10" />

            {/* Slide Content Wrapper Centered  */}
            <div className="relative w-full h-full flex items-center justify-center z-10 text-center">
              <Container>
                <div className="max-w-3xl mx-auto px-4 md:px-8 text-white flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        key={index}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4 md:space-y-6 flex flex-col items-center"
                      >
                        {/* Cinematic Badge */}
                        <motion.div
                          variants={itemVariants}
                          className="badge badge-primary md:badge-lg font-bold tracking-wider uppercase px-4 py-3 bg-primary text-white shadow-md"
                        >
                          TicketGhor Premium
                        </motion.div>

                        {/* Centered Title */}
                        <motion.h1
                          variants={itemVariants}
                          className="text-3xl md:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-xl"
                        >
                          {slide.title}
                        </motion.h1>

                        {/* Centered Subtitle */}
                        <motion.p
                          variants={itemVariants}
                          className="text-sm md:text-lg text-slate-400 max-w-xl font-normal leading-relaxed drop-shadow-sm"
                        >
                          {slide.subtitle}
                        </motion.p>

                        {/* Centered Buttons Layout */}
                        <motion.div
                          variants={itemVariants}
                          className="flex flex-wrap gap-4 pt-2 justify-center"
                        >
                          {/* <a
                            href="#tickets-section"
                            className="btn btn-primary btn-sm md:btn-md px-6 md:px-8 font-extrabold border-none bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            Find Tickets
                          </a> */}
                          <Button text="Find Tickets" />
                          <Button
                            text="View Offers"
                            className="border boder-white bg-transparent before:bg-primary hover:text-primary"
                          />
                          {/* <button className="btn btn-outline btn-sm md:btn-md border-2 border-slate-600 text-slate-300 hover:border-white hover:bg-white hover:text-black font-bold transition-all duration-300 hover:-translate-y-0.5">
                            View Offers
                          </button> */}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
