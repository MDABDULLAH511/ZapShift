import React, { useRef } from "react";
import SharedSectionHeader from "../../Components/SharedSectionHeader/SharedSectionHeader";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const servicesCenters = useLoaderData();
  const mapRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = servicesCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coOrdinate = [district.latitude, district.longitude];
      mapRef.current.flyTo(coOrdinate, 12);
    } else {
      alert("Don't have any service center");
    }
  };

  return (
    <div className="p-20 bg-white rounded-4xl my-8">
      <div>
        <SharedSectionHeader
          align="left"
          title="We are available in 64 districts"
          titleClass="text-secondary"
        />

        {/* Search Form */}
        <div>
          <form onSubmit={handleSearch}>
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                name="location"
                className="grow"
                placeholder="Search"
              />
            </label>
          </form>
        </div>

        {/* Map Title */}
        <div>
          <h3 className="text-secondary text-[30px] font-bold my-10">
            We deliver almost all over Bangladesh
          </h3>

          <div>
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              className="h-[600px]"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Make Point */}
              {servicesCenters.map((center, ind) => (
                <Marker
                  key={ind}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <strong> {center.district} </strong> <br /> Area:{" "}
                    {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>   
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
