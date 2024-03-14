import fetchData from "./fetchData";

const databaseId = "a11f2e9245d44dbfb105002345be8b81";
const timelineUrl = `https://api.notion.com/v1/databases/${databaseId}/query`;

const fetchTimeline = async () => fetchData(timelineUrl);

export default fetchTimeline;
