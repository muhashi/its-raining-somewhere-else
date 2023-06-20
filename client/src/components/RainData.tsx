import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

type CityData = {
  lat: string,
  lng: string,
  name: string,
  country: string,
  rainMm: number,
}

// thanks aaron https://codepen.io/arickle/pen/XKjMZY
export default function RainData() {
  const [rainData, setRainData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(import.meta.env.PROD ? import.meta.env.VITE_PROD_API_URL : import.meta.env.VITE_DEV_API_URL)
      .then(res => res.json())
      .then(data => {
        setRainData(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {rainData && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '1em',
        }}>
          <p>currently raining in</p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '1em',
          }}>
            <ReactCountryFlag
              countryCode={rainData.country}
              svg
              style={{width: '2em', height: '2em'}}
              alt={`${rainData.country} flag`}
            />
            <h2>{rainData.name}</h2><h3>{rainData.rainMm}mm</h3>
          </div>
        </div>
      )}
    </>
  );
}