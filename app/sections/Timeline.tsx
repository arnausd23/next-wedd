export interface Timeline {
  schedule: string;
  title: string;
  description: string;
  image: string;
}

function Timeline({ timeline }: { timeline: Timeline[] }) {
  return (
    <section
      id="timeline"
      className="flex flex-col lg:w-[70%] my-0 mx-auto p-12"
    >
      {timeline.map((event: Timeline, index: number) => {
        const { description, image, schedule, title } = event;

        return (
          <div
            key={"timeline" + index}
            className="flex flex-col mb-14 lg:mb-0 lg:grid lg:grid-cols-3 items-center justify-items-center"
          >
            <div
              style={{ backgroundImage: `url(${"/uploads/" + image})` }}
              className={
                "w-60 h-60 rounded-full bg-cover bg-center mb-10" +
                (index % 2 == 0 ? "" : " lg:order-3")
              }
            />
            <div
              className={
                "hidden lg:block border-l-2 border-dashed border-primary my-0 mx-auto h-full relative before:content-[''] before:bg-primary before:rounded-full before:h-3 before:w-3 before:absolute before:-left-[0.438rem]" +
                (index === timeline.length - 1
                  ? " after:content-[''] after:bg-primary after:rounded-full after:h-3 after:w-3 after:absolute after:-left-[0.438rem] after:bottom-0"
                  : "")
              }
            ></div>
            <div className={index % 2 == 0 ? "" : " lg:-order-1"}>
              <p className="text-primary italic">{schedule}</p>
              <h3 className="font-bold text-2xl my-2 lg:my-4">{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Timeline;
