import React, {useState, useEffect} from 'react';
import Table from './../Table/Table';
import ElasticCarousel from "react-elastic-carousel";

const Carousel = () => {
  const [dates, setDates] = useState([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    generateDates();
  }, []);
  const generateDates = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fourDates = [];
    for (let i = 0; i < 4; i++) {
      const currentDate = (day + i < 10 ? '0' + (day + i) : day + i) + '-' + (month < 10 ? '0' + month : month)+ '-' + date.getFullYear();
      fourDates.push(currentDate);
    }
    setDates(fourDates);
  }
  return (
    <ElasticCarousel
      enableSwipe={false}
      onChange={(el, i) => setActive(i)}
    >
      {dates.map((el, i) => <Table key={i} active={i === active} date={el}/>)}
    </ElasticCarousel>
  )
};

export default Carousel;
