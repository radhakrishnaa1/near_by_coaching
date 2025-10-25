import React from 'react';
import { Carousel } from 'antd';
import atdoor from "../../atdoor.png"
import online from "../../online.png"
import offline from "../../offline.png"
import offline2 from "../../offline2.png"


const contentStyle = {
  width: '100%',
  height: '450px',
  objectFit: 'cover',
};
const CarouselTop = () => (
  
  <Carousel autoplay>
   <div>
        <img
          src={offline}
          alt="Slide 1"
          style={contentStyle}
        />
      </div>
      <div>
        <img
          src={online}
          alt="Slide 2"
          style={contentStyle}
        />
      </div>
      <div>
        <img
          src={atdoor}
          alt="Slide 3"
          style={contentStyle}
        />
      </div>
       <div>
        <img
          src={offline2}
          alt="Slide 3"
          style={contentStyle}
        />
      </div>
  </Carousel>
  
);
export default CarouselTop;