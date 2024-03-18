import { DropZone, type Config } from "@measured/puck";
import Home from "./components/sections/Home";
import Image from "next/image";
import FileUploader from "./components/components/Puck/FileUploader";
import Editor from "./components/components/Puck/Editor";
import Navbar from "./components/components/Navbar";
import JoinUs from "./components/sections/JoinUs";
import Timeline from "./components/sections/Timeline";
import Gallery from "./components/sections/Gallery";
import Button from "./components/components/Button";
import googleDriveIcon from "./components/assets/google-drive.png";
import Timer from "./components/sections/Timer";

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
  Button: {
    file: any;
    link: string;
    text: string;
    hasImage: boolean;
  };
  Calendar: {
    date: string;
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
            <>
              <FileUploader name={name} onChange={onChange} />
            </>
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
              <>
                <img src={"/uploads/" + file} alt="" />
              </>
            )}
          </>
        );
      },
    },
    Button: {
      fields: {
        file: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <>
              <FileUploader name={name} onChange={onChange} />
            </>
          ),
        },
        link: { type: "text" },
        text: { type: "text" },
        hasImage: {
          type: "radio",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
      },
      defaultProps: {
        file: null,
        link: "",
        text: "",
        hasImage: false,
      },
      render: ({ link, text, file, hasImage }) => {
        return (
          <Button
            className="mt-8 lg:mt-12 px-5 lg:px-12"
            text={text}
            link={link}
          >
            {hasImage && (
              <img
                className="w-8 inline mr-4"
                src={"/uploads/" + file}
                alt="Button Image"
              />
              // <Image
              //   className="w-8 inline mr-4"
              //   src={file}
              //   alt="Google Drive icon"
              // />
            )}
          </Button>
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
                <>
                  <FileUploader name={name} onChange={onChange} />
                </>
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
    Calendar: {
      fields: {
        date: {
          type: "custom",
          render: ({ name, onChange, value }) => {
            return (
              <>
                <label>Start date:</label>
                <br />
                <input
                  type="date"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              </>
            );
          },
        },
      },
      defaultProps: {
        date: "",
      },
      render: ({ date }) => {;
        return <Timer date={date} />;
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
          <DropZone zone="Timer" />
          {/* <Information /> */}
          {/* <Contact /> */}
          <Gallery />
          {children}
        </div>
      );
    },
  },
};

export default config;
