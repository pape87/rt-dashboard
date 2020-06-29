import React, { useState, useEffect } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface DateTimeRange {
  from: Date;
  to: Date;
}

const DateTimeRangeSelector: React.FC<{ range: React.Dispatch<React.SetStateAction<DateTimeRange>> }> = (props: { range: React.Dispatch<React.SetStateAction<DateTimeRange>> }) => {
  const [range, setRange] = useState({
    from: new Date(),
    to: new Date()
  } as DateTimeRange);

  useEffect(() => {
    props.range(range);
  });

  return (
    <form>
      <div>
        <p>From</p>
        <DatePicker
          selected={range.from}
          onChange={date => setRange((state) => { return { from: date, to: state.to } as DateTimeRange; })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <div>
        <p>To</p>
        <DatePicker
          selected={range.to}
          onChange={date => setRange((state) => { return { from: state.from, to: date } as DateTimeRange })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </form>
  )
};

export default DateTimeRangeSelector;
