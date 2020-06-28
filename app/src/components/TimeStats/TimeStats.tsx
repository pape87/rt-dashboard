import React, { useState, useEffect } from 'react';
import { Download } from '../../store/download';

export interface Day {
  morning: number;
  afternoon: number;
  evening: number;
  night: number;
}

const TimeStats: React.FC<{ downloads: Download[] }> = (props: { downloads: Download[] }) => {
  const [timeStats, setTimeStats] = useState<Day>({
    afternoon: 0,
    evening: 0,
    morning: 0,
    night: 0
  });

  useEffect(() => {
    let d: Day = {
      afternoon: 0,
      evening: 0,
      morning: 0,
      night: 0
    };

    props.downloads.map((x) => {
      const hours = new Date(x.downloaded_at).getHours();
      if (hours > 6 && hours < 12) {
        d.morning += 1;
      } else if (hours > 12 && hours < 18) {
        d.afternoon += 1;
      } else if (hours > 18 && hours < 24) {
        d.evening += 1;
      } else {
        d.night += 1;
      }
    });

    setTimeStats(d);
  }, [props.downloads]);

  return (
    <div>
      <h2>Downloads by time</h2>
      <ul>
        {
          Object.entries(timeStats).sort((a, b) => b[1] - a[1]).map(([k, v]) => (<li key={k}>{k} - {v}</li>))
        }
      </ul>
    </div>
  );
};

export default TimeStats;
