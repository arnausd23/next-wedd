import { DropZone, type Config } from "@measured/puck";
import Home from "./app/sections/Home";
import Image from "next/image";
import FileUploader from "./app/components/Puck/FileUploader";
import Editor from "./app/components/Puck/Editor";
import Navbar from "./app/components/Navbar";
import JoinUs from "./app/sections/JoinUs";
import Timeline from "./app/sections/Timeline";
import Gallery from "./app/sections/Gallery";
import Button from "./app/components/Button";
import googleDriveIcon from "./app/assets/google-drive.png";
import Timer from "./app/sections/Timer";
import Information from "./app/sections/Information";

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
  Information: {
    information: any[];
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
      render: ({ date }) => {
        return <Timer date={date} />;
      },
    },
    Information: {
      fields: {
        information: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            link: { type: "text" },
            text: { type: "text" },
          },
        },
      },
      defaultProps: {
        information: [],
      },
      render: ({ information }) => {
        return <Information information={information} />;
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
          <DropZone zone="Information" />
          {/* <Contact /> */}
          <Gallery />
          {children}
        </div>
      );
    },
  },
};

export default config;
