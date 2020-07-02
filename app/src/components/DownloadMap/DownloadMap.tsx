import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import { FeatureCollection, Feature, Geometry, GeoJsonProperties } from "geojson";
import { Download } from "../../store/download";
import { Styled } from "../../styles/styled";

const projection = geoEqualEarth()
  .scale(160)
  .translate([960 / 2, 500 / 2])

const DownloadMap: React.FC<{ downloads: Download[] }> = (props: { downloads: Download[] }) => {
  const [geographies, setGeographies] = useState([] as Feature<Geometry, GeoJsonProperties>[]);
  const [download, setDownload] = useState<Download>();

  useEffect(() => {
    fetch("/world-110m.json")
      .then(response => {
        if (response.status !== 200) {
          // tslint:disable-next-line:no-console
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          const mapFeatures = feature(worlddata, worlddata.objects.countries) as unknown as FeatureCollection;
          setGeographies(mapFeatures.features)
        });
      });
  }, [props.downloads])

  const handleMarkerClick = (i: number) => {
    setDownload(props.downloads[i]);
  }

  return (
    <div>
      <Styled.Container>
        <Styled.Label hidden={!download}>{`${download?.app_id} - ${download?.country} - (${download?.latitude},${download?.longitude}) - ${download?.downloaded_at}`}</Styled.Label>
      </Styled.Container>
      <Styled.Container>
        <svg width={960} height={500} viewBox="0 0 960 500">
          <g className="countries">
            {
              geographies.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={geoPath().projection(projection)(d) as string | undefined}
                  className="country"
                  fill={`rgba(0, 167, 204, ${1 / geographies.length * i})`}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                />
              ))
            }
          </g>
          <g className="markers">
            {
              (props.downloads).map((dl, i) => (
                <circle
                  key={`marker-${i}`}
                  cx={projection([dl.longitude, dl.latitude])![0]}
                  cy={projection([dl.longitude, dl.latitude])![1]}
                  r="3"
                  fill="#E91E63"
                  stroke="#FFFFFF"
                  className="marker"
                  onClick={() => handleMarkerClick(i)}
                />
              ))
            }
          </g>
        </svg>
      </Styled.Container>
    </div>
  )
};

export default DownloadMap;
