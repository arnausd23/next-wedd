import { Props } from "../../../../puck.config";

export const ComponentRename = (name: keyof Props): string => {
  switch (name) {
    case "Paragraph":
      return "Texto";
    case "ParagraphWithBackground":
      return "Texto con fondo";
    case "Image":
      return "Imagen";
    case "Menu":
      return "Menú";
    case "Grid":
      return "Cuadrícula";
    case "Button":
      return "Botón";
    case "Calendar":
      return "Calendario";
    case "Information":
      return "Información";
    case "Form":
      return "Formulario";
    case "Container":
      return "Contenedor";
    case "Column":
      return "Columna";
    case "Overlay":
      return "Overlay";
    case "VerticalSpacing":
      return "Espaciado Vertical";
    case "HorizontalSpacing":
      return "Espaciado Horizontal";
    default:
      return name;
  }
};
