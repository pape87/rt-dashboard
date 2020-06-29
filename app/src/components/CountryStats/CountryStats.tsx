import React, { useEffect, useState } from 'react';
import { Download } from '../../store/download';
import { StatsContainer } from '../../styles/container';
import { StatsTitle } from '../../styles/label';
import { StatsList, StatsListElement } from '../../styles/list';


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
    <StatsContainer>
      <StatsTitle>Countries by Downloads</StatsTitle>
      <StatsList id="coutry-list">
        {
          Object.entries(countryDictionary).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => (<StatsListElement data-testid="coutry-list-item" key={k}>{k} - {v}</StatsListElement>))
        }
      </StatsList>
    </StatsContainer>
  )
};

export default CountryStats;
