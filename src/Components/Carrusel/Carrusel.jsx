import React, { useState } from 'react';
import { icons } from 'react-icons';
import ItemsCarousel from 'react-items-carousel';
import s from './carrusel.module.css'
import {FcNext, FcPrevious} from "react-icons/fc"

export default function Carrusel () {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 60;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        gutter={20}
        leftChevron={<button className={s.butcar}><FcPrevious/></button>}
        rightChevron={<button className={s.butcar}><FcNext/></button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div className={s.cardcarrusel}></div>
        <div  className={s.cardcarruse2} ></div>
        <div  className={s.cardcarruse3}></div>
        <div  className={s.cardcarruse4}></div>
      </ItemsCarousel>
    </div>
  );
};