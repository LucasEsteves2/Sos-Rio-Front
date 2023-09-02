import L from "leaflet";
import img from "../../assets/icons/sos.png";
import som from "../../assets/icons/siren.png";
import risco from "../../assets/icons/risco.png";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [14, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

export const ApoionIcon = new L.Icon({
  iconUrl: img,
  iconSize: [45],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
  
});

export const sireneIcon = new L.Icon({
  iconUrl: som,
  iconSize: [40],
  iconAnchor: [20, 38], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
  shadowUrl:
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png"
});



export const riscoIcon = new L.Icon({
  iconUrl: risco,
  iconSize: [40],
  iconAnchor: [20, 38], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
  
});
