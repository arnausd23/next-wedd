export const storeImage = async (file, url) => {
  const fd = new FormData();
  fd.append("file", file);

  fetch(url, {
    method: "POST",
    body: fd,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
