import React from "react";
import { Slider } from "@mui/material";

const SingleSlider: React.FC<{
  label: string;
  minValue: number;
  maxValue: number;
  setValue: number;
  sliderUnit: string;
  singleSliderChange: (value: number) => void;
}> = (props) => {
  const [value, setValue] = React.useState<number>(props.setValue);
  const valuetext = (value: number) => {
    return value.toString() + " " + props.sliderUnit.toString();
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    props.singleSliderChange(value);
  };

  const marks = [
    {
      value: props.minValue,
      label: props.minValue.toString() + " " + props.sliderUnit,
    },
    /* {
      value: (props.maxValue - props.minValue) / 2,
      label:
        (props.maxValue /2 - props.minValue / 2).toString() +
        " " +
        props.sliderUnit,
    }, */
    {
      value: props.maxValue,
      label: props.maxValue.toString() + " " + props.sliderUnit,
    },
    {
      value: props.setValue,
      label: props.setValue.toString() + " " + props.sliderUnit,
    },
  ];

  return (
    <React.Fragment>
      <Slider
        getAriaLabel={() => props.label}
        value={props.setValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={props.minValue}
        max={props.maxValue}
        size="small"
        marks={marks}
      />
    </React.Fragment>
  );
};

export default SingleSlider;
