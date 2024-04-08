import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import "./Map.css";
/**react leaflet map component taking a landmark object list
 * and displaying mapmarkers based on their positions.
 */
export function MapScreen({ marker }) {


  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  let mapMarkersJSX = <></>
  if(marker !== null && marker !== undefined){
    mapMarkersJSX = <Marker position={[marker.coordinates[0], marker.coordinates[1]]}>
    <Tooltip>{marker.name.replace(/,/g, '\n')}</Tooltip>
    </Marker>;
  }


  return (
    <div className="map-container">
      <MapContainer
        className="map-leaflet"

        center={[45.5, -73.6]}
        zoom={10}
        zoomControl={true}
        updateWhenZooming={false}
        updateWhenIdle={true}
        preferCanvas={true}
        minZoom={8}
        maxZoom={18}
      >
        <TileLayer
          attribution={attribution}
          url={tileUrl}
        />
        {mapMarkersJSX}
        {marker != null && <MapPanner coordinates={[marker.coordinates[0], marker.coordinates[1]]}/>}
      </MapContainer>
    </div>
  );
  //<Marker position={point} icon={customIcon}/>
  //put the above line below the tilelayer element
}


function MapPanner({coordinates}){
  const map = useMap();
  useEffect(()=>{
    map.panTo(coordinates);
    map.setZoom(13);
  },[coordinates, map])
}