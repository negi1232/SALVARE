import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import RoutingMachine from "./RoutingMachine";

export default function BestRoute({
                            initialLocation,
                            trashCanLocation,
                            recyclingCenterLocation,
                            manIcon,
                            factoryIcon }) {
    return (
          <MapContainer
            center={initialLocation}
            zoom={15}
            style={{ height: '50vh', width: '100%' }}
            dragging={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Map data &copy; OpenStreetMap contributors"
            />

            {/* trash can location from smart contract */}
            <Marker
                key={1}
                position={
                trashCanLocation}
                icon={manIcon}
            />

            {/* Recycling center location from dummy data*/}
            <Marker
                key={2}
                position={
                recyclingCenterLocation}
                icon={factoryIcon}
            />

            <RoutingMachine
                trashCanLocation={trashCanLocation}
                recyclingCenterLocation={recyclingCenterLocation} />

          </MapContainer>
  );
}
