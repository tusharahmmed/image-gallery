/* eslint-disable react/prop-types */
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
  arrayMove,
} from "@dnd-kit/sortable";

import Image from "../ui/Image";
import FileUpload from "../ui/FileUpload";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {removeImage, sortImages} from "../rtk/features/gallery/gallerySlice";
import {getText} from "../utils/getText";

const ImageGallery = () => {
  const {uploadedImages: items} = useSelector((state) => state.gallery) || [];

  const {selectedImages} = useSelector((state) => state.gallery) || [];

  const dispatch = useDispatch();

  // dnd kit
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

  // remove images handler
  const deleteHandler = () => {
    selectedImages.forEach((id) => {
      dispatch(removeImage(id));
    });
  };

  return (
    <div className="w-11/12 bg-white rounded-lg">
      <div className="h-[60px] flex items-center justify-between px-6 py-3 border-b-2">
        <h3 className="text-lg font-medium">
          {selectedImages?.length > 0 ? (
            <div className="flex items-center">
              <img
                width={22}
                className="bg-blue-500 mr-2"
                src={"icon/checkbox.png"}
                alt=""
              />
              {getText("File", "Files", selectedImages?.length)} Selected
            </div>
          ) : (
            "Gallery"
          )}
        </h3>
        {selectedImages?.length > 0 && (
          <button onClick={deleteHandler} className="text-red-500 font-medium">
            Delete file
          </button>
        )}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={strategy}>
          <div className={`grid grid-cols-2 lg:grid-cols-5 gap-5 px-6 py-3`}>
            {items.map((item, index) => {
              return <Image index={index} key={item.id} item={item} />;
            })}

            <FileUpload fileState={items} maxNumber={9} />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ImageGallery;
