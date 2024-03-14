import Button from "./Button";

interface InformationColumnProps {
  number: number;
  title: string;
  text: string;
}

function InformationColumn({ number, title, text }: InformationColumnProps) {
  return (
    <div className="text-center">
      <span className="text-primary text-2xl">{number}</span>
      <h3 className="uppercase font-bold mt-1 lg:mt-2 text-3xl">{title}</h3>
      <p className="mt-4 lg:mt-6">{text}</p>
      <Button className="my-8 lg:mt-14 lg:mb-0" text="Read More" link="" />
    </div>
  );
}

export default InformationColumn;
