import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import { FeatureCollection, Feature, Geometry, GeoJsonProperties } from "geojson";
import { Download } from "../../store/download";

const projection = geoEqualEarth()
  .scale(160)
  .translate([960 / 2, 500 / 2])

const DownloadMap: React.FC<{ downloads: Download[] }> = (props: { downloads: Download[] }) => {
  const [geographies, setGeographies] = useState([] as Feature<Geometry, GeoJsonProperties>[])
  const [downloads, setDownloads] = useState(props.downloads);
  useEffect(() => {
    fetch("/world-110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          let mapFeatures = feature(worlddata, worlddata.objects.countries) as unknown as FeatureCollection;
          setGeographies(mapFeatures.features)
        });
      });    
      setDownloads(props.downloads);
  }, [props.downloads])

  const handleCountryClick = (countryIndex: number) => {
    console.log("Clicked on country: ", geographies[countryIndex])
  }

  const handleMarkerClick = (i: number) => {
    console.log("Marker: ", downloads[i])
  }

  return (
    <svg width={960} height={500} viewBox="0 0 960 500">
      <g className="countries">
        {
          geographies.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d) as string | undefined}
              className="country"
              fill={`rgba(38,50,56,0.4)`}
              stroke="#FFFFFF"
              strokeWidth={0.5}
              onClick={() => handleCountryClick(i)}
            />
          ))
        }
      </g>
      <g className="markers">
        {
          (downloads).map((download, i) => (
            <circle
              key={`marker-${i}`}
              cx={projection([download.longitude, download.latitude])![0]}
              cy={projection([download.longitude, download.latitude])![1]}
              r="4"
              fill="#E91E63"
              stroke="#FFFFFF"
              className="marker"
              onClick={() => handleMarkerClick(i)}
            />
          ))
        }
      </g>
    </svg>
  )
};

export default DownloadMap;
