import React from "react";
import Slider from "react-slick";

import TitleCard from "./TitleCard";

export default function MediaCarousel({ items, isTopTen }) {
  // 
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: true,
    autoplay: false,
    dots: false,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const carousel = items.map((item, index) => (
    <TitleCard key={item.id} item={item} index={index} isTopTen={isTopTen} />
  ));

  return <Slider {...settings}>{carousel}</Slider>;
}
