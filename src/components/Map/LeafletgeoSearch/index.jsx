import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import icon from "./constants";

export function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
  
      const searchControl = new GeoSearchControl({
          
        provider,
        marker: {
            icon
        }
      });
  
      map.addControl(searchControl);
  
      return () => map.removeControl(searchControl);
    }, []);
  
    return null;
  }
  