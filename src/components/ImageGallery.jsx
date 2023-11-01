/* eslint-disable react/prop-types */
// import { useState} from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import Image from "../ui/Image";
import FileUpload from "../ui/FileUpload";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {sortImages} from "../rtk/features/gallery/gallerySlice";

const ImageGallery = () => {
  // const [selectedItems, setSelectedItems] = useState([]);

  const {uploadedImages: items} = useSelector((state) => state.gallery) || [];
  console.log(items);

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const strategy = rectSortingStrategy;

  // update sorting state
  const handleDragEnd = (event) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        dispatch(sortImages(arrayMove(items, oldIndex, newIndex)));
      }
    }
  };

  return (
    <div className="w-11/12 bg-white rounded-lg">
      <div className="flex items-center justify-between px-6 py-3 border-b-2">
        <h3 className="text-lg font-medium">Gallery</h3>
        <button className="text-red-500 font-medium">Delete file</button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={strategy}>
          <div className={`grid grid-cols-5 gap-5 px-6 py-3`}>
            {items?.map((item, index) => (
              <SortableImage key={item.id} item={item} index={index} />
            ))}
            <FileUpload fileState={items} maxNumber={9} />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

const SortableImage = ({item, index}) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({
      id: item.id,
    });

  return (
    <div
      className={` ${index === 0 && `col-span-2 row-span-2`}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        transition: transition ? "transform 250ms" : undefined,
      }}>
      <Image data={item} />
    </div>
  );
};

export default ImageGallery;
