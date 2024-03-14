import fetchData from "./fetchData";

const databaseId = "5548e1e8551c49eaa2fb994872dc954c";
const homeUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

const fetchHome = async () => fetchData(homeUrl);

export default fetchHome;
