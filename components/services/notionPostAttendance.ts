import fetchData from "./fetchData";

const databaseId = "54687ffc33fb498ab3c8f10c264e5873";
const weddingDateUrl = `https://api.notion.com/v1/pages`;

export interface NotionPostAttendanceProps {
  fullName: string;
  menu: string;
  comment: string;
}

const notionPostAttendance = async ({
  fullName,
  menu,
  comment,
}: NotionPostAttendanceProps) => {
  const body = {
    parent: { database_id: databaseId },
    properties: {
      fullName: {
        title: [
          {
            text: {
              content: fullName,
            },
          },
        ],
      },
      menu: {
        select: {
          name: menu,
        },
      },
      comment: {
        rich_text: [
          {
            text: {
              content: comment,
            },
          },
        ],
      },
    },
  };

  await fetchData(weddingDateUrl, body);
};

export default notionPostAttendance;
