// @ts-nocheck

import Button from "../components/Button";

function Contact() {
  const handleSubmit = async () => {
    const form = document.getElementById("contact");
    const inputs = form?.getElementsByTagName("input");
    const selects = form?.getElementsByTagName("select");
    const data: any = {};

    if (!inputs || !selects) return;

    for (const input of inputs) {
      data[input.id] = input.value;
    }
    for (const select of selects) {
      data[select.id] = select.value;
    }

    console.log(data);
    // await notionPostAttendance(data);
  };

  return (
    <section id="contact" className="relative py-10 px-5 lg:py-20 bg-secondary">
      <form className="relative z-10 bg-white py-14 lg:py-20 px-6 lg:px-10 lg:w-1/2 lg:my-0 lg:mx-auto rounded-lg shadow-2xl">
        <fieldset className="flex flex-col mb-10">
          <label className="mb-2">Add you full name:</label>
          <input
            id="fullName"
            className="bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
            type="text"
          />
        </fieldset>
        <fieldset className="flex flex-col mb-10">
          <label className="mb-2">Choose a menu option:</label>
          <select
            id="menu"
            defaultValue="default"
            className="cursor-pointer bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
          >
            <option disabled value="default">
              -- select an option --
            </option>
            <option value="menu1">Menu 1</option>
            <option value="menu2">Menu 2</option>
          </select>
        </fieldset>
        <fieldset className="flex flex-col mb-10">
          <label className="mb-2">Additional comments:</label>
          <input
            id="comment"
            className="bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
            type="text"
          />
        </fieldset>

        <Button
          className="text-center w-full md:w-auto"
          text="Confirm"
          onClick={handleSubmit}
        />
      </form>
    </section>
  );
}

export default Contact;
