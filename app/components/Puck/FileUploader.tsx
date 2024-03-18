import { useState } from "react";
import { storeImage } from "./services/FileStorage";

function FileUploader({ name, onChange }) {
  const [image, setImage] = useState(null);

  return (
    <div>
      <p>Choose a file to add</p>
      <input
        type="file"
        accept="image/*"
        name={name}
        onChange={async (e: any) => {
          const url = e.target.files[0].name;
          const file = e.target.files[0];

          await storeImage(file, "/api/images");

          setImage(url);
          return onChange(url);
        }}
      />
    </div>
  );
}

export default FileUploader;
