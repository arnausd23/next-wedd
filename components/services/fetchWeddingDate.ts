import fetchData from "./fetchData";

const databaseId = "fc0f61d48605445b90e97e66802be726";
const weddingDateUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

const fetchWeddingDate = async () => fetchData(weddingDateUrl);

export default fetchWeddingDate;
