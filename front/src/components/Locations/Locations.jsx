import React from "react";
import {
  LeftItemWrapper,
  LeftItemHeader,
  LocationsWrapper,
  Location,
  LocationHeader,
  LocationImage,
  LocationDescription,
  LocationDetails,
} from "./Locations.styled";
import Button from "@mui/material/Button";
import LocationImg from "./images/location.png";

const Locations = () => {
  let locations = [
    {
      name: "Ogródek Profesora Oaka",
      description: "Spokojne i zaciszne miejsce za domem Profesora Oaka. Możesz tutaj nauczyć się podstawowych rzeczy.",
    },
    {
      name: "Ogródek Profesora Oaka2",
      description: "Spokojne i zaciszne miejsce za domem Profesora Oaka. Możesz tutaj nauczyć się podstawowych rzeczy.",
    },
  ];
  return (
    <LeftItemWrapper>
      <LeftItemHeader>Lokacje</LeftItemHeader>
      <LocationsWrapper>
        {locations.map((location, id) => {
          return (
            <Location key={id}>
              <LocationHeader>{location.name}</LocationHeader>
              <LocationDetails>
                <LocationImage src={LocationImg} />
                <LocationDescription>
                  <p>{location.description}</p>
                  <Button variant="contained" size="large" color="primary">
                    Podróżuj
                  </Button>
                </LocationDescription>
              </LocationDetails>
            </Location>
          );
        })}
      </LocationsWrapper>
    </LeftItemWrapper>
  );
};

export default Locations;
