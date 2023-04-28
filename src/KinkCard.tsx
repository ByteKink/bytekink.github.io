import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, ToggleButton } from "react-bootstrap";

// Each card has 3 states 0, 1, 2
// 0 is no
// 1 is I haven't selected/maybe
// 2 is yes
//
// ex 222121022 (base 3)
const radios = [
  { name: "Yes", value: "2" },
  { name: "No", value: "0" },
];

const getVariant = (index: number): string => {
  switch (index) {
    case 1:
      return "outline-danger";
    case 0:
    default:
      return "outline-success";
  }
};

const getBorderVariant = (state: string): string => {
  switch (state) {
    case "0":
      return "danger";
    case "2":
      return "success";
    case "1":
    default:
      return "secondary";
  }
};

const KinkCard = ({
  kink,
  value,
  onChange,
}: {
  kink: { displayString: string };
  value: string;
  onChange: (value: string) => void;
}) => {
  const [radioValue, setRadioValue] = useState<string>(value);
  // This handles the custom url loading when state change
  useEffect(() => {
    setRadioValue(value);
  }, [value]);

  return (
    <Card
      style={{ width: "150px" }}
      className="ms-3 mt-3 border-3"
      bg="dark"
      text="white"
      border={getBorderVariant(radioValue)}
    >
      <Card.Body>
        <Card.Title className="text-center fs-6" style={{ height: "40px" }}>
          {kink.displayString}
        </Card.Title>
        <ButtonGroup className="w-100">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={`${idx}-${kink.displayString}`}
              id={`radio-${idx}-${kink.displayString}`}
              type="radio"
              size="sm"
              variant={getVariant(idx)}
              name={`radio-${kink.displayString}`}
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setRadioValue(value);
                onChange(value);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <div
          style={{ height: "25px" }}
          className="mt-2 d-flex justify-content-center"
        >
          {radioValue !== "1" && (
            <Button
              onClick={() => {
                setRadioValue("1");
                onChange("1");
              }}
              size="sm"
              variant="link"
              className="text-white"
            >
              Reset
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default KinkCard;
