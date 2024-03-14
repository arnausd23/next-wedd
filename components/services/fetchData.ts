export const fetchData = async (url: string, body: any = {}) => {
  const notionAPIKey = import.meta.env.VITE_NOTION_API_KEY || "";
  const proxyUrl = "https://corsproxy.io";

  const headers = {
    Authorization: `Bearer ${notionAPIKey}`,
    "Notion-Version": "2021-08-16",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${proxyUrl}?${url}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export default fetchData;
