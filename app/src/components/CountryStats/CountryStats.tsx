import React, { useEffect, useState } from 'react';
import { Download } from '../../store/download';


const CountryStats: React.FC<{ downloads: Download[] }> = (props: { downloads: Download[] }) => {
  const [countryDictionary, setCountryDictionary] = useState<{ [key: string]: number }>({});
  useEffect(() => {
    let d: { [key: string]: number } = {};
    props.downloads.map((x) => {
      if (x.country) {
        d[x.country] = d[x.country] >= 1 ? d[x.country] + 1 : 1;
      }
    });

    setCountryDictionary(d);
  }, [props.downloads]);

  return (
    <div>
      <h2>Top 5 countries by downloads</h2>
      <ul>
        {
          Object.entries(countryDictionary).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => (<li key={k}>{k} - {v}</li>))
        }
      </ul>
    </div>
  )
};

export default CountryStats;
