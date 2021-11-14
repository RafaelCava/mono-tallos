import * as React from 'react';

import img1 from '../../assets/carousel1.jpg';
import img2 from '../../assets/carousel2.jpg';
import img3 from '../../assets/carousel3.jpg';

const images = [img1, img2, img3];

const Carrosel: React.FC = (props) => {
  let i = 0;

  setInterval(() => ++i, 5000);

  if (i >= images.length) {
    i = 0;
  }

  return (
    <div>
      <img src={images[i]} alt="carrousel" />
    </div>
  );
};

export default Carrosel;
