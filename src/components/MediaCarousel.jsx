import React from "react";
import Slider from "react-slick";

import { useModal } from "../state/ModalContext";
import TitlePreview from "./TitlePreview";

export default function MediaCarousel({ items }) {
  const { setModal } = useModal();

  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: true,
    autoplay: false,
    dots: false,
    centerMode: true,
    centerPadding: "4%",
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

  const carousel = items.map((item) => (
    <div
      className="title"
      key={item.id}
      onClick={() => setModal(<TitlePreview item={item} />)}
    >
      <img src={item.thumbnail} />
    </div>
  ));

  return <Slider {...settings}>{carousel}</Slider>;
}
