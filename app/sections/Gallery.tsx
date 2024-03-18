import Button from "../components/Button";
import gallery1 from "../assets/gallery1.webp";
import gallery2 from "../assets/gallery2.webp";
import gallery3 from "../assets/gallery3.webp";
import gallery4 from "../assets/gallery4.webp";
import gallery5 from "../assets/gallery5.webp";
import gallery6 from "../assets/gallery6.webp";
import Image from "next/image";
import { DropZone } from "@measured/puck";

function Gallery() {
  return (
    <section id="gallery" className="relative">
      <section className="relative grid grid-cols-2 lg:grid-cols-3">
        <Image src={gallery1} alt="Gallery example Image" />
        <Image src={gallery2} alt="Gallery example Image" />
        <Image src={gallery3} alt="Gallery example Image" />
        <Image src={gallery4} alt="Gallery example Image" />
        <Image src={gallery5} alt="Gallery example Image" />
        <Image src={gallery6} alt="Gallery example Image" />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-65" />
        <div className="absolute top-1/2 -translate-y-1/2 lg:left-1/2 lg:center-absolute text-center p-12">
          <h2 className="text-xl lg:text-3xl text-white">
            <DropZone zone="gallery-content" />
          </h2>
          <DropZone zone="gallery-button" />
        </div>
      </section>
    </section>
  );
}

export default Gallery;
