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

const Editor = dynamic(() => import("./app/components/Puck/Editor/Editor"), {
  ssr: false,
});

export type Props = {
  Paragraph: {
    text: string;
  };
  ParagraphWithBackground: {
    text: string;
  };
  Image: {
    file: any;
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
  Container: {
    width: string;
    height: string;
    backgroundColor: string;
    backgroundImage: any;
    columns: Number;
  };
  Form: {
    options: any[];
    buttonText: string;
    buttonColor: string;
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
    hiddeInMobile: string;
  };
  HorizontalSpacing: {
    height: string;
    hiddeInMobile: string;
  };
};

export const config: Config<Props> = {
  components: {
    VerticalSpacing: {
      fields: {
        height: {
          label: "Altura",
          type: "text",
        },
        hiddeInMobile: {
          label: "Visible en móvil",
          type: "radio",
          options: [
            { label: "Yes", value: "initial" },
            { label: "No", value: "hidden" },
          ],
        },
      },
      defaultProps: {
        height: "10px",
        hiddeInMobile: "initial",
      },
      render: ({ height, hiddeInMobile }) => {
        return <div style={{ height, display: hiddeInMobile }} />;
      },
    },
    Paragraph: {
      fields: {
        text: {
          label: "Texto",
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
          label: "Texto",
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
    Form: {
      fields: {
        options: {
          label: "Tipo de campo",
          type: "array",
          arrayFields: {
            label: { type: "text" },
            inputType: {
              type: "radio",
              options: [
                { label: "Texto", type: "text" },
                { label: "Selector", value: "select" },
              ],
            },
          },
        },
        buttonText: {
          label: "Texto del botón",
          type: "text",
        },
        buttonColor: {
          label: "Color del botón",
          type: "text",
        },
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
    Image: {
      fields: {
        file: {
          type: "custom",
          render: ({ name, onChange, value }) => (
            <FileUploader name={name} onChange={onChange} />
          ),
        },
        width: { label: "Tamaño", type: "text" },
        height: { label: "Altura", type: "text" },
        mode: {
          label: "Tipo de imagen",
          type: "radio",
          options: [
            { label: "Normal", value: "regular" },
            { label: "Redonda", value: "rounded" },
          ],
        },
      },
      defaultProps: {
        file: null,
        mode: "inline",
        width: "auto",
        height: "auto",
      },
      render: ({ mode, file, width, height }) => {
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
            <FileUploader name={name} onChange={onChange} />
          ),
        },
        link: { label: "Link", type: "text" },
        text: { label: "Texto", type: "text" },
        hasImage: {
          label: "¿Tiene imagen?",
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
          label: "Secciones del menú",
          type: "array",
          arrayFields: {
            title: { label: "Título", type: "text" },
            link: { label: "Link", type: "text" },
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
          label: "Elementos del grid",
          type: "array",
          arrayFields: {
            image: {
              type: "custom",
              render: ({ name, onChange, value }) => (
                <FileUploader name={name} onChange={onChange} />
              ),
            },
            title: { label: "Título", type: "text" },
            description: { label: "Descripción", type: "text" },
            schedule: { label: "Duración del evento", type: "text" },
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
          label: "Fecha del evento",
          type: "custom",
          render: ({ name, onChange, value }) => {
            return (
              <>
                <label>Fecha del evento:</label>
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
          label: "Elementos de información",
          type: "array",
          arrayFields: {
            title: { label: "Título", type: "text" },
            link: { label: "Link", type: "text" },
            text: { label: "Texto", type: "text" },
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
        id: {
          label: `Id (útil como link para el Menú)`,
          type: "text",
        },
        width: { label: "Tamaño", type: "text" },
        height: { label: "Altura", type: "text" },
        backgroundColor: { label: "Color de fondo", type: "text" },
        backgroundImage: {
          label: "Imagen de fondo",
          type: "custom",
          render: ({ name, onChange, value }) => (
            <FileUploader name={name} onChange={onChange} />
          ),
        },
        backgroundImageMode: {
          label: "Modo de la imagen de fondo",
          type: "radio",
          options: [
            { label: "Tamaño completo", value: "cover" },
            { label: "Tamño original", value: "contain" },
          ],
        },
        columns: { label: "Columnas", type: "number" },
      },
      defaultProps: {
        width: "100%",
        height: "auto",
        columns: 2,
        backgroundImageMode: "contain",
        backgroundImage: null,
      },
      render: ({
        width,
        height,
        backgroundColor,
        backgroundImage,
        backgroundImageMode,
        columns,
        id,
      }) => {
        return (
          <section
            id={id}
            className="grid max-sm:!grid-cols-1"
            style={{
              width,
              height,
              backgroundColor,
              backgroundImage: backgroundImage
                ? `url(/uploads/${backgroundImage})`
                : "",
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
        width: { label: "Tamaño", type: "text" },
        height: { label: "Altura", type: "text" },
        backgroundColor: { label: "Color de fondo", type: "text" },
        horizontalContentAlignment: {
          label: "Alineación horizontal",
          type: "radio",
          options: [
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
          ],
        },
        verticalContentAlignment: {
          label: "Alineación vertical",
          type: "radio",
          options: [
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
          ],
        },
      },
      defaultProps: {
        width: "100%",
        height: "auto",
        horizontalContentAlignment: "flex-start",
        verticalContentAlignment: "flex-start",
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
              "column-widget flex flex-col overflow-hidden p-12 sm:py-12 sm:px-24" +
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
          label: "Imágenes de fondo",
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
        backgroundColor: { label: "Color de fondo", type: "text" },
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
      title: "Basicos",
      components: ["Paragraph", "Image", "Button", "VerticalSpacing", "Form"],
    },
    layout: {
      title: "Estructura",
      components: ["Menu", "Container", "Column"],
    },
    customSections: {
      title: "Secciones personalizadas",
      components: [
        "Grid",
        "Calendar",
        "Information",
        "Overlay",
        "ParagraphWithBackground",
      ],
    },
  },
  root: {
    render: ({ children }) => {
      return <div>{children}</div>;
    },
  },
};

export default config;
