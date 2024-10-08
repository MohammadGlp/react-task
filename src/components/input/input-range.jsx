import { useRef, useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { BsChevronDown } from "react-icons/bs";

const InputRange = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  priceCap,
  text,
  icon,
  boxClassName,
  className,
  system,
  onGetMaxAndMinValue,
}) => {
  const [open, setOpen] = useState(false);

  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const lineRef = useRef(null);
  const componentRef = useRef(null);

  const maxGetValueWithDelay = useDebounce(maxValue, 500);
  const minGetValueWithDelay = useDebounce(minValue, 500);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(maxValue)) {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(minValue)) {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  const handleClickOutside = (event) => {
    if (
      componentRef?.current &&
      !componentRef?.current?.contains(event?.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (
      maxGetValueWithDelay !== initialMax + 1 ||
      minGetValueWithDelay !== initialMin
    )
      onGetMaxAndMinValue(maxGetValueWithDelay, minGetValueWithDelay);
  }, [maxGetValueWithDelay, minGetValueWithDelay]);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.left = (minValue / max) * 100 + "%";
      lineRef.current.style.right = 100 - (maxValue / max) * 100 + "%";
    }
  }, [minValue, maxValue, max, step, open, lineRef.current]);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div className={`relative ${system}`} ref={componentRef}>
        <button
          type="button"
          className={`w-fit lg:text-base text-xs flex items-center gap-1.5 ${className}`}
          onClick={() => setOpen((old) => !old)}
        >
          {text}
          {!icon ? null : <BsChevronDown className="text-lg self-end" />}
        </button>

        {open && (
          <div
            className={`absolute right-0 mt-2 w-60 h-16 shadow-lg rounded-lg flex flex-col justify-center items-center z-30 bg-white ${boxClassName}`}
          >
            <div className="slider w-[90%] relative right-0 left-0 h-0.5 rounded-md bg-[#C0C0C0]">
              <div
                className="progress absolute h-full bg-black rounded-md"
                ref={lineRef}
              ></div>
            </div>
            <div className="flex flex-col relative w-[95%]" dir="ltr">
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minValue}
                onChange={handleMin}
                className="absolute w-full -top-[13px] bg-transparent cursor-pointer appearance-none pointer-events-none"
              />
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxValue}
                onChange={handleMax}
                className="absolute w-full -top-[13px] bg-transparent cursor-pointer appearance-none pointer-events-none"
              />

              <div className="mt-4 flex justify-between text-sm px-1.5">
                <span>{minValue}</span>
                <span>{maxValue}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputRange;
