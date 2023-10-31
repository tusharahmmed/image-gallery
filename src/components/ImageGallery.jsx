import Image from "../ui/Image";

const ImageGallery = () => {
  const images = [
    "images/image-11.jpeg",
    "images/image-1.webp",
    "images/image-2.webp",
    "images/image-3.webp",
    "images/image-4.webp",
    "images/image-5.webp",
    "images/image-6.webp",
    "images/image-7.webp",
    "images/image-8.webp",
  ];

  return (
    <div className="w-11/12 bg-white rounded-lg">
      <div className="flex items-center justify-between px-6 py-3 border-b-2 ">
        <h3 className="text-lg font-medium">Gallery</h3>
        <button className="text-red-500 font-medium">Delete file</button>
      </div>
      <div className="grid grid-cols-5 gap-5 px-6 py-3">
        {images?.map((image, i) => (
          <Image key={i} src={image} index={i} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
