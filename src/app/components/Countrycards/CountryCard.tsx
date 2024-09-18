import React from "react";
interface CountryCardProps {
  name: string;
  flag: string;
  capital: string;
  region: string;
  countryCode: string;
  onClick: () => void;
}
const CountryCard: React.FC<CountryCardProps> = ({
  name,
  flag,
  capital,
  region,
  countryCode,
  onClick,
}) => {
  return (
    <div className="country-card">
      <h3 className="countryname">{name}</h3>
      <img src={flag} alt={`${name} flag`} />
      <p>Capital: {capital}</p>
      <p>Region: {region}</p>
      <p>Country Code: {countryCode}</p>
      <button onClick={onClick}>Click for Weather</button>
    </div>
  );
};
export default CountryCard;
