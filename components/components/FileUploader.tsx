import Image from "next/image";
import React, { useState } from "react";

function FileUploader({ name, onChange }) {
  const [image, setImage] = useState(null);

  const storeImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    fetch("/api/images", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <p>Choose a file to add</p>
      <input
        type="file"
        accept="image/*"
        name={name}
        onChange={async (e) => {
          const url = e.target.files[0].name;
          const file = e.target.files[0];

          await storeImage(file);

          setImage(url);
          return onChange(url);
        }}
      />
      {image && (
        <Image
          className="w-14"
          src={image}
          width={80}
          height={80}
          alt="uploaded img"
        />
      )}
    </div>
  );
}

export default FileUploader;
