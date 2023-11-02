import {useSortable} from "@dnd-kit/sortable";
import {useDispatch} from "react-redux";
import {toggleSelectImage} from "../rtk/features/gallery/gallerySlice";
import {useSelector} from "react-redux";

/* eslint-disable react/prop-types */
const Image = ({item, index}) => {
  const {selectedImages} = useSelector((state) => state.gallery) || [];

  // action dispatcher
  const dispatch = useDispatch();

  const selectHandler = () => {
    dispatch(toggleSelectImage(item?.id));
  };

  // dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    newIndex,
    overIndex,
    active,
  } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        transition: transition ? "transform 250ms" : undefined,
      }}
      className={`relative group border-2 rounded-lg h-full
       ${index === 0 && !isDragging && `col-span-2 row-span-2`} 
       ${isDragging && index == 0 && `col-span-1 row-span-1`}
       ${
         overIndex === 0 && newIndex == 0 && active?.id !== item?.id
           ? "col-span-2 row-span-2"
           : "col-span-1 row-span-1"
       }
       ${overIndex !== 0 ? "col-span-1 row-span-1" : "col-span-1 row-span-1"}`}>
      <div
        {...attributes}
        {...listeners}
        className="group-hover:bg-[#82828295] h-full">
        <img className="h-full" src={item?.src} alt="" />
        <span
          className={`${
            selectedImages.includes(item.id) ? "bg-[#f8f9f994] opacity-90" : ""
          } opacity-0 absolute top-0 left-0 right-0 bottom-0 group-hover:bg-[#82828295] group-hover:opacity-90 duration-300`}></span>
      </div>

      {/* action bar */}
      <div className="absolute top-0 left-0 p-4">
        <input
          onChange={selectHandler}
          checked={selectedImages.includes(item.id)}
          type="checkbox"
          className={`${
            selectedImages.includes(item.id) ? "bg-[#f8f9f994] opacity-90" : ""
          } w-6 h-6 opacity-0 group-hover:opacity-90 duration-300 `}
        />
      </div>
    </div>
  );
};

export default Image;
