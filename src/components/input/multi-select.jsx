"use client";

import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const MultipleInput = ({
  data,
  text,
  boxClassName,
  system,
  icon,
  className,
  generate,
  onGetValue,
  onRemoveValue,
}) => {
  const [open, setOpen] = useState(false);
  const [alterData, setAlterData] = useState(data);
  const [ids, setIds] = useState([]);
  const componentRef = useRef(null);
  const boxRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      componentRef?.current &&
      !componentRef?.current?.contains(event?.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      setAlterData(data);
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelectItem = (event, item, idx) => {
    event.preventDefault();
    const key = `${text}-${idx + 1}`;

    if (ids[0]) {
      onRemoveValue();
      setIds([]);
    } else {
      onGetValue(idx + 1, item);
      setIds([key]);
    }
  };

  return (
    <div ref={componentRef} className={`relative ${system}`}>
      <button
        type="button"
        className={`w-fit lg:text-base text-xs flex items-center gap-1 ${className}`}
        onClick={() => setOpen((old) => !old)}
      >
        {text}
        {!icon ? null : <BsChevronDown className="text-lg self-end" />}
      </button>

      {open ? (
        <div
          className={`flex flex-col md:z-30 gap-2 absolute mt-2 right-0 w-80 ${alterData.length <= 3 ? "h-fit" : "h-40"} border border-white-gray-3 rounded bg-white ${boxClassName}`}
        >
          <div
            className={`${alterData.length <= 3 ? "h-fit mb-1" : "h-40 overflow-y-auto no-scrollbar"} bg-transparent`}
          >
            {alterData.length < 1 ? (
              <p className="text-sm text-center">Nothing Exists.</p>
            ) : (
              alterData.map((item, idx) => {
                const key = generate(idx + 1, text);

                return (
                  <div
                    className={`flex items-center gap-2 justify-between pointer-events-auto h-10 px-2 w-full md:hover:bg-green-500/10 cursor-pointer group`}
                    key={key}
                    onClick={(event) => handleSelectItem(event, item.slug, idx)}
                  >
                    <div className="relative h-5">
                      <input
                        id={idx + 1}
                        type="checkbox"
                        className={`appearance-none size-5 rounded-md border-2 group-hover:border-green-500 group-hover:cursor-pointer ${ids.includes(key) ? "bg-green-500" : "bg-transparent"}`}
                        defaultChecked={ids.includes(key)}
                        multiple={true}
                        ref={boxRef}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className={`absolute top-2.5 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3.5 ${ids.includes(key) ? "fill-white" : "hidden"}`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                      </svg>
                    </div>

                    <label
                      className={`w-full md:text-sm text-xs text-[#564C68] flex items-center justify-between group-hover:cursor-pointer`}
                      htmlFor={idx + 1}
                    >
                      {item.name}
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MultipleInput;
