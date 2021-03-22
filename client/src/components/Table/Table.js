import React, { useEffect, useState, useCallback } from 'react';
import Row from '../Row/Row';
import Loader from "../Loader/Loader";

const timeIntervals = ['08:30', '09:30', '10:30', '11:30', '12:30', '14:00', '15:00', '16:00', '17:00'];

const Table = ({date, active}) => {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {

    if (active) {
      getData();
    }
  }, [active]);

  const getData = async () => {
    await fetch(`/records/all?date=${date}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setDataLoaded(true);
      });
  }

  const findRecord = useCallback((records, time) => {
    return records.find(record => record.time === time);

  }, [data]);
  const renderData = useCallback(() => {
    return timeIntervals.map((el, i) => <Row date={date} time={el} record={findRecord(data, el)} key={i}/>)
  }, [data])
  /*
  const renderData = (data) => {
    const timeIntervals = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
    return timeIntervals.map( (el, i) => findRecord(data, el, i));
  }

   */
  return (
    <div className="column">
      <h1 className="title">{date}</h1>
          <table className="table is-fullwidth">
            <thead>
            <tr>
              <th>Время</th>
              <th>Рег. номер</th>
              <th>Модель и марка</th>
              <th>Дополнительно</th>
              <th>Настройки</th>
            </tr>
            </thead>
            <tfoot>
              { dataLoaded ? renderData() : <Loader/> }
            </tfoot>
          </table>
    </div>
  )
}

export default Table;
