import { useEffect, useState } from "react";
import infoCoverImg from "../assets/information.jpg";
import InformationColumn from "../components/InformationColumn";
import fetchInformation from "../services/fetchInformation";

function Information() {
  const [information, setInformation] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchInformation();
      const unFormattedInformation = response.results.reduce(
        (accumulator: any, event: any) => {
          const { title, link, text } = event.properties;
          return [
            ...accumulator,
            [
              title.rich_text[0].plain_text,
              link.rich_text[0].plain_text,
              text.rich_text[0].plain_text,
            ],
          ];
        },
        []
      );
      setInformation(unFormattedInformation);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <section id="information" className="p-10">
      <div
        className="w-full h-40 lg:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${infoCoverImg})` }}
      />
      <div className="mt-12 grid gap-14 lg:gap-36 lg:grid-cols-3 max-w-7xl my-0 mx-auto">
        {information.length > 0 &&
          information.map((info: string[], index: number) => {
            return (
              <InformationColumn
                number={index + 1}
                title={info[0]}
                link={info[1]}
                text={info[2]}
              />
            );
          })}
      </div>
    </section>
  );
}

export default Information;
