import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  width: '100%',
  height: '400px',
  objectFit: 'cover',
};
const CarouselTop = () => (
  
  <Carousel autoplay>
   <div>
        <img
          src="https://jandarshan.cg.nic.in/stimages/Article/240702002101/240702002101_1.jpg"
          alt="Slide 1"
          style={contentStyle}
        />
      </div>
      <div>
        <img
          src="https://jandarshan.cg.nic.in/stimages/Article/240702002501/240702002501_1.jpg"
          alt="Slide 2"
          style={contentStyle}
        />
      </div>
      <div>
        <img
          src="https://jandarshan.cg.nic.in/stimages/Article/240702002301/240702002301_1.jpg"
          alt="Slide 3"
          style={contentStyle}
        />
      </div>
      <div>
        <img
          src="https://jandarshan.cg.nic.in/stimages/Article/240702002501/240702002501_1.jpg"
          alt="Slide 4"
          style={contentStyle}
        />
      </div>
  </Carousel>
  
);
export default CarouselTop;