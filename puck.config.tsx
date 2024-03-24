// @ts-nocheck

import { DropZone, type Config } from "@measured/puck";
import dynamic from "next/dynamic";
import Button from "./app/components/Button";
import Navbar from "./app/components/Navbar";
import FileUploader from "./app/components/Puck/FileUploader";
import Form from "./app/components/Puck/Form";
import Information from "./app/sections/Information";
import Timeline from "./app/sections/Timeline";
import Timer from "./app/sections/Timer";
import HomeText from "./app/components/Puck/HomeText";

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
    backgroundImage: any;
    columns: Number;
  };
  Column: {
    width: string;
    height: string;
    backgroundColor: string;
    horitzontalContentAlignment: string;
    verticalContentAlignment: string;
  };
  Overlay: {
    images: string;
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
    ParagraphWithBackground: {
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
        return <HomeText text={text} />;
      },
    },
    Field: {
      fields: {
        label: {
          type: "text",
        },
        type: {
          type: "select",
          options: [
            { label: "Number", value: "number" },
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
          ],
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
        label: {
          type: "text",
        },
        options: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
          },
        },
      },
      defaultProps: {
        options: [],
        label: "Add your label text",
      },
      render: ({ options, label }) => {
        return (
          <fieldset className="flex flex-col mb-10">
            <label className="mb-2">{label}</label>
            <select
              defaultValue="default"
              className="cursor-pointer bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
            >
              <option disabled value="default">
                -- select an option --
              </option>
              {options.map((option) => (
                <option key={option.title} value={option.title}>
                  {option.title}
                </option>
              ))}
            </select>
          </fieldset>
        );
      },
    },
    Form: {
      fields: {
        options: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            inputType: {
              type: "radio",
              options: [
                { label: "Text", type: "text" },
                { label: "Select", value: "select" },
              ],
            },
          },
        },
        buttonText: { type: "text" },
        buttonColor: { type: "text" },
      },
      defaultProps: {
        options: [],
      },
      render: ({ options, buttonText, buttonColor }) => {
        return (
          <Form
            options={options}
            buttonText={buttonText}
            buttonColor={buttonColor}
          />
        );
      },
    },
    Textarea: {
      fields: {
        label: {
          type: "text",
        },
        text: {
          type: "textarea",
        },
      },
      render: ({ label, text }) => {
        return (
          <fieldset className="flex flex-col mb-10">
            <label className="mb-2">{label}</label>
            <textarea
              className="bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
              rows="3"
              cols="40"
              value={text}
            ></textarea>
          </fieldset>
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
            { label: "Regular", value: "regular" },
            { label: "Rounded", value: "rounded" },
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
            {file && mode !== "rounded" && (
              <img
                src={"/uploads/" + file}
                alt="Uploaded image"
                style={{
                  height,
                  width,
                }}
              />
            )}
            {file && mode === "rounded" && (
              <div
                className="rounded-full bg-cover bg-center"
                style={{
                  height,
                  width,
                  backgroundImage: `url(/uploads/${file})`,
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
        backgroundImage: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <FileUploader name={name} onChange={onChange} />
          ),
        },
        backgroundImageMode: {
          type: "radio",
          options: [
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "contain" },
          ],
        },
        columns: { type: "number" },
      },
      defaultProps: {
        width: "100%",
        height: "auto",
        columns: 2,
        backgroundImageMode: "contain",
      },
      render: ({
        width,
        height,
        backgroundColor,
        backgroundImage,
        backgroundImageMode,
        columns,
      }) => {
        return (
          <section
            className="grid"
            style={{
              width,
              height,
              backgroundColor,
              backgroundImage: `url(/uploads/${backgroundImage})`,
              backgroundSize: backgroundImageMode,
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
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
        },
        verticalContentAlignment: {
          type: "radio",
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
        },
      },
      defaultProps: {
        width: "100%",
        height: "auto",
        horizontalContentAlignment: "start",
        verticalContentAlignment: "start",
      },
      render: ({
        width,
        height,
        backgroundColor,
        horizontalContentAlignment,
        verticalContentAlignment,
      }) => {
        return (
          <div
            className={
              "column-widget flex flex-col overflow-hidden py-12 px-24" +
              ` items-${horizontalContentAlignment}`
            }
            style={{
              width,
              height,
              backgroundColor,
              alignItems: horizontalContentAlignment,
              justifyContent: verticalContentAlignment,
            }}
          >
            <DropZone zone="Column" />
          </div>
        );
      },
    },
    Overlay: {
      fields: {
        images: {
          type: "array",
          arrayFields: {
            image: {
              type: "custom",
              render: ({ name, onChange, value }) => (
                <FileUploader name={name} onChange={onChange} />
              ),
            },
          },
        },
        backgroundColor: { type: "text" },
      },
      defaultProps: {
        images: [],
      },
      render: ({ images, backgroundColor }) => {
        return (
          <section className="overlay relative">
            <section className="relative grid grid-cols-2 lg:grid-cols-3">
              {images.map(({ image, index }) => (
                <img
                  key={image + index}
                  src={"/uploads/" + image}
                  alt="Gallery overlay background image"
                />
              ))}
              <div
                className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-65"
                style={{ backgroundColor: backgroundColor }}
              />
              <div
                className={`overlay-content absolute top-1/2 -translate-y-1/2 lg:left-1/2 lg:center-absolute text-center p-12 ${
                  images.length > 0 ? "hasImages" : ""
                }`}
              >
                <h2 className="text-xl lg:text-3xl text-white">
                  <DropZone zone="gallery-content" />
                </h2>
                <DropZone zone="gallery-button" />
              </div>
            </section>
          </section>
        );
      },
    },
  },
  categories: {
    basic: {
      components: ["Paragraph", "Image", "Button", "VerticalSpacing"],
    },
    layout: {
      components: ["Menu", "Container", "Column"],
    },
    form: {
      components: ["Field", "Textarea", "Select"],
    },
    customSections: {
      title: "Custom sections",
      components: ["Grid", "Calendar", "Information"],
    },
  },
  root: {
    render: ({ children }) => {
      return <div>{children}</div>;
    },
  },
};

export default config;
