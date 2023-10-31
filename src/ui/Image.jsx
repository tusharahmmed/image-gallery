import {useState} from "react";

/* eslint-disable react/prop-types */
const Image = ({src, index}) => {
  const [selected, setSelected] = useState(false);
  console.log(selected);

  return (
    <div
      className={`relative group border-2 rounded-lg ${
        index === 0 && `col-span-2 row-span-2`
      }`}>
      <img className="" src={src} alt="" />
      <div
        className={`${
          selected ? "bg-[#f8f9f994] opacity-90" : ""
        } opacity-0 absolute top-0 left-0 right-0 bottom-0 group-hover:bg-[#82828295] group-hover:opacity-90 duration-300`}>
        <div className="p-4">
          <input
            onClick={() => setSelected(!selected)}
            type="checkbox"
            className={`${
              selected ? "bg-[#f8f9f994] opacity-90" : ""
            } w-6 h-6 opacity-0 group-hover:opacity-90 duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default Image;
