import world50m from '../../../assets/geo-data/world-50m.json';
import cities from '../../../assets/geo-data/world-most-populous-cities.json';
import { scaleLinear } from 'd3-scale';
import React, { Component } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Markers,
  ZoomableGroup,
} from 'react-simple-maps';
import "bootstrap/dist/css/bootstrap.css";

import { getColor } from '../../../utils/colors';

const cityScale = scaleLinear()
  .domain([0, 37843000])
  .range([1, 25]);

class BubbleMap extends Component {
  state = {
    cities,
  };

  render() {
    // const primaryColor = getColor('primary');
    const secondaryColor = 'secondary'
    const lightColor = 'light'

    return (
      <ComposableMap
        projectionConfig={{ scale: 205 }}
        width={980}
        height={551}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <ZoomableGroup center={[0, 20]} disablePanning>
          <Geographies geography={world50m}>
            {(geographies, projection) =>
              geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "black",
                          stroke: "greey",
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: "blue",
                          stroke: "",
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        pressed: {
                          fill: "red",
                          stroke: "red",
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  ),
              )
            }
          </Geographies>
          <Markers>
            {this.state.cities.map((city, i) => (
              <Marker key={i} marker={city}>
                <circle
                  cx={0}
                  cy={0}
                  r={cityScale(city.population)}
                  fill={"red"}
                  stroke={"red"}
                  strokeWidth="2"
                />
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}

export default BubbleMap;
