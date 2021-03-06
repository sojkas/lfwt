import React, { useEffect } from "react";
import { Slider } from "@mui/material";

const RangeSlider: React.FC<{
  label: string;
  minValue: number;
  maxValue: number;
  minSetValue: number;
  maxSetValue: number;
  sliderUnit: string;
  step: number;
  rangeSliderChange: (values: number[]) => void;
}> = (props) => {
  const [value, setValue] = React.useState<number[]>([
    props.minSetValue,
    props.maxSetValue,
  ]);
  const valuetext = (value: number) => {
    return value.toString() + " " + props.sliderUnit.toString();
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    props.rangeSliderChange(value);
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
      value: value[0],
      label: value[0].toString() + " " + props.sliderUnit,
    },
    {
      value: value[1],
      label: value[1].toString() + " " + props.sliderUnit,
    },
  ];

  useEffect(() => {
    setValue([props.minSetValue, props.maxSetValue]);
  }, [props.minSetValue, props.maxSetValue]);

  return (
    <React.Fragment>
      <Slider
        key={props.label}
        getAriaLabel={() => props.label}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={props.minValue}
        max={props.maxValue}
        size="small"
        marks={marks}
        step={props.step}
      />
    </React.Fragment>
  );
};

export default RangeSlider;
