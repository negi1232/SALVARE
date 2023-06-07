import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import L from 'leaflet';

const RoutingMachine = ({
            trashCanLocation,
    recyclingCenterLocation,

}) => {

    const map = useMap();

  useEffect(() => {
    if (trashCanLocation && recyclingCenterLocation) {
        const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(trashCanLocation),
          L.latLng(recyclingCenterLocation),
            ],
            show: false,
            routeWhileDragging: false,
            waypointMode: "content",
            draggableWaypoints: false,

        }).addTo(map);
        return () => {
            map.removeLayer(routingControl);
            map.removeControl(routingControl)
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
    };

export default RoutingMachine;

