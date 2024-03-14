import type { Config } from "@measured/puck";
import Home from "./components/sections/Home";
import Image from "next/image";
import heroImg from "./components/assets/hero.png";

type Props = {
  HeadingBlock: { title: string };
  Paragraph: {
    text: string;
    textAlign: "left" | "center" | "right";
  };
  Image: {
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
        url: "",
        mode: "inline",
      },
      render: ({ url, mode }) => (
        <Image
          className="align-top h-full"
          src={heroImg}
          alt="wedding couple image"
        />
      ),
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
