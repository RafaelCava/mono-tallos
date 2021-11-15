import React, { useEffect, useState } from 'react';
import './styles.css';

import img1 from '../../assets/carousel1.jpg';
import img2 from '../../assets/carousel2.jpg';
import img3 from '../../assets/carousel3.jpg';

const images = [img1, img2, img3];

const Carrosel: React.FC = (props) => {
  let [index, setIndex] = useState(0);

  useEffect(() => {
    setInterval(() => setIndex(++index), 5000);
  }, []);

  if (index > images.length - 1) {
    setIndex(0);
  }

  return (
    <div className="carrosel">
      <img src={images[index]} alt="carrousel" />
    </div>
  );
};

export default Carrosel;
