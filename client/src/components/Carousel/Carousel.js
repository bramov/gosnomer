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
      const currentDate = new Date();
      currentDate.setDate(date.getDate() + i);
      const currDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
      const currMonth = currentDate.getMonth() < 10 ? '0' + currentDate.getMonth() : currentDate.getMonth();
      const stringDate = currDay + '-' + currMonth + '-' + currentDate.getFullYear();
      fourDates.push(stringDate);
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
