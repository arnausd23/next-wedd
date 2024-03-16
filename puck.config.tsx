import type { Config } from "@measured/puck";
import Home from "./components/sections/Home";
import Image from "next/image";
import heroImg from "./components/assets/hero.png";
import FileUploader from "./components/components/FileUploader";

type Props = {
  HeadingBlock: { title: string };
  Paragraph: {
    text: string;
    textAlign: "left" | "center" | "right";
  };
  Image: {
    file: any;
    url: string;
    mode: "inline" | "background";
  };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    Paragraph: {
      fields: {
        text: { type: "text" },
        textAlign: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        text: "Paragraph",
        textAlign: "left",
      },
      render: ({ text, textAlign }) => (
        <div style={{ padding: 64 }}>
          <p style={{ textAlign }}>{text}</p>
        </div>
      ),
    },
    Image: {
      fields: {
        file: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <FileUploader name={name} onChange={onChange} />
          ),
        },
        url: { type: "text" },
        mode: {
          type: "radio",
          options: [
            { label: "Inline", value: "inline" },
            { label: "Background", value: "background" },
          ],
        },
      },
      defaultProps: {
        file: null,
        url: "",
        mode: "inline",
      },
      render: ({ url, mode, file }) => {
        console.log(file);
        return (
          <>
            {file && (
              <img src="./public/uploads/img-worlds-of-adventure.jpg" alt="" />
              // <Image
              //   className="w-14"
              //   src={"/public/uploads/img-worlds-of-adventure.jpg"}
              //   width={300}
              //   height={300}
              //   alt="uploaded img"
              // />
            )}
          </>
        );
      },
    },
  },
  root: {
    render: ({ children }) => {
      return (
        <div>
          {/* <Navbar /> */}
          <Home />
          {/* <JoinUs />
          <Timeline />
          <Timer />
          <Information />
          <Contact />
          <Gallery /> */}
          {children}
        </div>
      );
    },
  },
};

export default config;
