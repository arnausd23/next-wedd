import Button from "../components/Button";
import googleDriveIcon from "../assets/google-drive.png";
import gallery1 from "../assets/gallery1.webp";
import gallery2 from "../assets/gallery2.webp";
import gallery3 from "../assets/gallery3.webp";
import gallery4 from "../assets/gallery4.webp";
import gallery5 from "../assets/gallery5.webp";
import gallery6 from "../assets/gallery6.webp";

function Gallery() {
  return (
    <section id="gallery" className="relative">
      <section className="relative grid grid-cols-2 lg:grid-cols-3">
        <img src={gallery1} alt="Gallery example" />
        <img src={gallery2} alt="Gallery example" />
        <img src={gallery3} alt="Gallery example" />
        <img src={gallery4} alt="Gallery example" />
        <img src={gallery5} alt="Gallery example" />
        <img src={gallery6} alt="Gallery example" />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-65" />
        <div className="absolute top-1/2 -translate-y-1/2 lg:left-1/2 lg:center-absolute text-center p-12">
          <h2 className="text-xl lg:text-3xl text-white">
            Don't forget to take a lot of pictures during the ceremony and share
            them all into this link!
          </h2>
          <Button
            className="mt-8 lg:mt-12 px-5 lg:px-12"
            text="Add your photos"
            link=""
          >
            <img
              className="w-8 inline mr-4"
              src={googleDriveIcon}
              alt="Google Drive icon"
            />
          </Button>
        </div>
      </section>
    </section>
  );
}

export default Gallery;
