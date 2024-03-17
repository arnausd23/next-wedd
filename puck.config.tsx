import type { Config } from "@measured/puck";
import Home from "./components/sections/Home";
import Image from "next/image";
import heroImg from "./components/assets/hero.png";
import FileUploader from "./components/components/FileUploader";
import Editor from "./components/components/Editor";

type Props = {
  Paragraph: {
    text: string;
  };
  Image: {
    file: any;
    url: string;
    mode: "inline" | "background";
  };
};

export const config: Config<Props> = {
  components: {
    Paragraph: {
      fields: {
        text: {
          type: "custom",
          render: ({ name, onChange, value }) => {
            return (
              <Editor placeholder={"Lorem"} onChange={onChange} value={value} />
            );
          },
        },
      },
      defaultProps: {
        text: "Paragraph",
      },
      render: ({ text }) => {
        return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
      },
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
        return (
          <>
            {file && (
              <img src={"/uploads/" + file} alt="" />
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
