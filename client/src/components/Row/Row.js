import React, {useState, useCallback} from 'react';

const Row = ({record, time, date}) => {
  const [isEditable, setEditable] = useState(false);
  const [plateNumber, setPlatenumber] = useState(record?.platenumber || '');
  const [autoModel, setAutoModel] = useState(record?.automodel || '');
  const [additional, setAdditional] = useState(record?.additional || '');
  const [loading, setLoading] = useState(false);

  const clx = isEditable ? 'input' : 'input is-static';
  const btnClx = loading ? 'button is-loading' : 'button is-success';

  const changePlateNumber = useCallback((e) => {
    const { value } = e.currentTarget;
    setPlatenumber(value);
  }, [record]);
  const changeAutoModel = (e) => {
    const { value } = e.currentTarget;
    setAutoModel(value);
  };
  const changeAdditional = (e) => {
    const { value } = e.currentTarget;
    setAdditional(value);
  };
  const settingsCell = () => {
    if (isEditable) {
      return (
        <th>
          <button onClick={saveRow} className={btnClx}>
            <span className="icon is-small">
              <i className="fas fa-check"></i>
            </span>
            <span>Сохранить</span>
          </button>
        </th>
      )
    } else if (!record) {
      return (
        <th>
          <button onClick={editRow} className="button">
            <span className="icon">
              <i className="fas fa-edit"></i>
            </span>
            <span>Создать</span>
          </button>
        </th>
      )
    } else {
      return (
        <th>
          <button onClick={editRow} className="button">
            <span className="icon">
              <i className="fas fa-edit"></i>
            </span>
            <span>Изменить</span>
          </button>
        </th>
      )
    }
  }
  const editRow = () => setEditable(true);
  const saveRow = () => {
    setLoading(true);
    fetch('/records/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: record?._id, automodel: autoModel, platenumber: plateNumber, additional, time, date})
    }).then(data => data.json()).then(res => {
      setEditable(false);
      setLoading(false)
    });
  }
    return (
      <tr>
        <th>{time}</th>
        <th><input className={clx} type="text" onChange={changePlateNumber} value={plateNumber} readOnly={!isEditable}/></th>
        <th><input className={clx} type="text" onChange={changeAutoModel} value={autoModel} readOnly={!isEditable}/></th>
        <th><input className={clx} type="text" onChange={changeAdditional} value={additional} readOnly={!isEditable}/></th>
        { settingsCell() }
      </tr>
    );

};

export default Row;
