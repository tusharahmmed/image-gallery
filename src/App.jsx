import "./App.css";
import ImageGallery from "./components/ImageGallery";

function App() {
  return (
    <div className="min-h-screen overflow-scroll py-4 xl:py-0 flex items-center justify-center md:px-2 lg:px-5 xl:px-48">
      <ImageGallery />
    </div>
  );
}

export default App;
