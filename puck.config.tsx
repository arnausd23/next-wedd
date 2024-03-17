import { DropZone, type Config } from "@measured/puck";
import Home from "./components/sections/Home";
import Image from "next/image";
import FileUploader from "./components/components/Puck/FileUploader";
import Editor from "./components/components/Puck/Editor";
import Navbar from "./components/components/Navbar";
import JoinUs from "./components/sections/JoinUs";
import Timeline from "./components/sections/Timeline";

type Props = {
  Paragraph: {
    text: string;
  };
  Image: {
    file: any;
    url: string;
    mode: "inline" | "background";
  };
  Menu: {
    logo: any;
    items: any;
  };
  Grid: {
    items: any;
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
    Menu: {
      fields: {
        logo: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <FileUploader name={name} onChange={onChange} />
          ),
        },
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            link: { type: "text" },
          },
        },
      },
      defaultProps: {
        logo: null,
        items: [],
      },
      render: ({ logo, items }) => {
        return <Navbar logo={"/uploads/" + logo} items={items} />;
      },
    },
    Grid: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            image: {
              type: "custom",
              render: ({ name, onChange, value }) => (
                <FileUploader name={name} onChange={onChange} />
              ),
            },
            title: { type: "text" },
            description: { type: "text" },
            schedule: { type: "text" },
          },
        },
      },
      defaultProps: {
        items: [],
      },
      render: ({ items }) => {
        return <Timeline timeline={items} />;
      },
    },
  },
  root: {
    render: ({ children }) => {
      return (
        <div>
          <DropZone zone="navbar" />
          <Home />
          <JoinUs />
          <DropZone zone="Timeline" />
          {/* <Timer /> */}
          {/* <Information /> */}
          {/* <Contact /> */}
          {/* <Gallery /> */}
          {children}
        </div>
      );
    },
  },
};

export default config;
