import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

/**react leaflet map component taking a landmark object list
 * and displaying mapmarkers based on their positions.
 */
export function MapScreen({ marker }) {

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  let mapMarkersJSX = <></>
  if(marker !== undefined){
    mapMarkersJSX = <Marker position={[marker.point.coordinates[1], marker.point.coordinates[0]]}>
    <Tooltip>{marker.name}</Tooltip>
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
        minZoom={2}
        maxZoom={14}
      >
        <TileLayer
          attribution={attribution}
          url={tileUrl}
        />
        {mapMarkersJSX}
      </MapContainer>
    </div>
  );
  //<Marker position={point} icon={customIcon}/>
  //put the above line below the tilelayer element
}
