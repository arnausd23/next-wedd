import InformationColumn from "../components/InformationColumn";

function Information({ information }) {
  return (
    <section id="information">
      <div
        className="w-full h-40 lg:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('/uploads/information.jpg')` }}
      />
      <div className="my-12 p-10 grid gap-14 lg:gap-36 lg:grid-cols-3 max-w-7xl mx-auto">
        {information.length > 0 &&
          information.map((info: any, index: number) => {
            return (
              <InformationColumn
                key={info.title}
                number={index + 1}
                title={info.title}
                link={info.link}
                text={info.text}
              />
            );
          })}
      </div>
    </section>
  );
}

export default Information;
