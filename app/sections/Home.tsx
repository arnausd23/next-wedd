import Image from "next/image";

import leaf from "../assets/b-leaf.png";
import { DropZone } from "@measured/puck";

function Home() {
  return (
    <section className="lg:mt-24 h-full w-auto flex flex-col lg:grid lg:grid-cols-2 home-section">
      <DropZone zone="hero-img" />
      <div className="max-lg:p-16 bg-green h-full lg:relative max-lg:-order-1 ">
        <div className="max-lg:p-5 lg:absolute lg:top-1/2 lg:left-1/2 lg:center-absolute text-center text-white border-2 border-yellow-500 lg:p-10 relative">
          <div className="border-2 border-yellow-500 rotate-6 lg:rotate-12 absolute top-0 left-0 right-0 bottom-0" />
          <h3 className="text-xl lg:text-4xl uppercase leading-relaxed">
            <DropZone zone="my-content" />
          </h3>
          <Image
            className="w-20 lg:w-28 mt-14 mb-0 mx-auto absolute -top-16 lg:-top-14 -left-12 lg:-left-6"
            src={leaf}
            alt="Decoration leaf"
          />
          <Image
            className="w-20 lg:w-28 mt-14 mb-0 mx-auto absolute -bottom-8 lg:-bottom-10 -right-6 rotate-180"
            src={leaf}
            alt="Decoration leaf"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
