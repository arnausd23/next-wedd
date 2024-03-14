import fetchData from "./fetchData";

const databaseId = "2ddb306acb0645fc8de66ccd578c1ebd";
const informaitonUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

const fetchInformation = async () => fetchData(informaitonUrl);

export default fetchInformation;
