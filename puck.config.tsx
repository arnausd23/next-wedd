// @ts-nocheck

import dynamic from "next/dynamic";
import { DropZone, type Config } from "@measured/puck";
import Home from "./app/sections/Home";
import Image from "next/image";
import FileUploader from "./app/components/Puck/FileUploader";
import Navbar from "./app/components/Navbar";
import JoinUs from "./app/sections/JoinUs";
import Timeline from "./app/sections/Timeline";
import Gallery from "./app/sections/Gallery";
import Button from "./app/components/Button";
import Timer from "./app/sections/Timer";
import Information from "./app/sections/Information";
import Contact from "./app/sections/Contact";

const Editor = dynamic(() => import("./app/components/Puck/Editor"), {
  ssr: false,
});

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
  Field: {
    type: string;
  };
  Textarea: {
    text: string;
  };
  Select: {
    options: string[];
    text: string;
  };
  Container: {
    width: string;
    height: string;
    backgroundColor: string;
    columns: Number;
  };
  Column: {
    width: string;
    height: string;
    backgroundColor: string;
  };
  VerticalSpacing: {
    height: string;
  };
};

export const config: Config<Props> = {
  components: {
    VerticalSpacing: {
      fields: {
        height: {
          type: "text",
        },
      },
      defaultProps: {
        height: "10px",
      },
      render: ({ height }) => {
        return <div style={{ height }} />;
      },
    },
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
    Field: {
      fields: {
        type: {
          type: "select",
          options: [
            { label: "Number", value: "number" },
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
          ],
        },
        label: {
          type: "text",
        },
      },
      defaultProps: {
        type: "text",
        label: "Add your label text",
      },
      render: ({ type, label }) => {
        return (
          <fieldset className="flex flex-col mb-10">
            <label className="mb-2">{label}</label>
            <input
              className="bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
              type={type}
            />
          </fieldset>
        );
      },
    },
    Select: {
      fields: {
        options: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
        },
        label: {
          type: "text",
        },
      },
      defaultProps: {
        options: [],
        label: "Add your label text",
      },
      render: ({ options, label }) => {
        return (
          <div className="p-6">
            <label>{label}</label>
            <br />
            <select>
              {options.map((option) => (
                <option key={option.title} value={option.title}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
        );
      },
    },
    Textarea: {
      fields: {
        text: {
          type: "textarea",
        },
      },
      render: ({ text }) => {
        return (
          <textarea rows="10" cols="50">
            {text}
          </textarea>
        );
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
        width: { type: "text" },
        height: { type: "text" },
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
        width: "auto",
        height: "auto",
      },
      render: ({ url, mode, file, width, height }) => {
        return (
          <>
            {file && (
              <img
                src={"/uploads/" + file}
                alt="Uploaded image"
                style={{
                  height,
                  width,
                }}
              />
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
    Container: {
      fields: {
        width: { type: "text" },
        height: { type: "text" },
        backgroundColor: { type: "text" },
        columns: { type: "number" },
      },
      defaultProps: {
        width: "100%",
        height: "auto",
        columns: 2,
      },
      render: ({ width, height, backgroundColor, columns }) => {
        return (
          <section
            className="grid"
            style={{
              width,
              height,
              backgroundColor,
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {new Array(columns).fill(0).map((column, index) => {
              return <DropZone key={index} zone={`Column-${index}`} />;
            })}
          </section>
        );
      },
    },
    Column: {
      fields: {
        width: { type: "text" },
        height: { type: "text" },
        backgroundColor: { type: "text" },
        horizontalContentAlignment: {
          type: "radio",
          options: [
            { label: "Start", value: "inline" },
            { label: "Center", value: "background" },
            { label: "End", value: "background" },
          ],
        },
        verticalContentAlignment: {
          type: "radio",
          options: [
            { label: "Start", value: "inline" },
            { label: "Center", value: "background" },
            { label: "End", value: "background" },
          ],
        },
      },
      render: ({ width, height, backgroundColor }) => {
        return (
          <div
            className="column-widget flex flex-col"
            style={{
              width,
              height,
              backgroundColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DropZone zone="Column" />
          </div>
        );
      },
    },
  },
  categories: {
    basic: {
      components: ["Paragraph", "Image", "Button", "VerticalSpacing"],
    },
    form: {
      components: ["Field", "Textarea", "Select"],
    },
    layout: {
      components: ["Menu", "Container", "Column"],
    },
    customSections: {
      title: "Custom sections",
      components: ["Grid", "Calendar", "Information"],
    },
  },
  root: {
    render: ({ children }) => {
      return (
        <div>
          <DropZone zone="navbar" />
          <DropZone zone="Home" />
          {/* <Home /> */}
          <DropZone zone="JoinUs" />
          {/* <JoinUs /> */}
          <DropZone zone="Timeline" />
          <DropZone zone="Timer" />
          <DropZone zone="Information" />
          <Contact />
          <Gallery />
          {children}
        </div>
        // <div>
        //   <DropZone zone="navbar" />
        // <Home />
        //   <JoinUs />
        //   <DropZone zone="Timeline" />
        //   <DropZone zone="Timer" />
        //   <DropZone zone="Information" />
        //   <Contact />
        //   <Gallery />
        //   {children}
        // </div>
      );
    },
  },
};

export default config;
