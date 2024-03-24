import React, { useEffect, useState } from "react";
import Button from "../Button";

function Form({ options, buttonText, buttonColor }) {
  const [formName, setFormName] = useState("");

  useEffect(() => {
    setFormName(crypto.randomUUID());
  }, []);

  const handleSubmit = async () => {
    const form = document.forms[formName];
    const formData = new FormData(form);

    let values: string[] = [];

    for (let [name, value] of formData.entries()) {
      values.push(`${name} ${value}`);
    }

    fetch(`/api/csv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <section id="contact" className="w-full relative py-10 px-5 lg:py-20">
      <form
        name={formName}
        className="relative z-10 bg-white py-14 lg:py-20 px-6 lg:px-10 lg:w-1/2 lg:my-0 lg:mx-auto rounded-lg shadow-2xl"
      >
        {options.map((option, index) => {
          if (option.inputType === "select") {
            return (
              <fieldset
                key={`fieldset-${index}`}
                className="w-full flex flex-col mb-10"
              >
                <label className="mb-2">{option.label}</label>
                <select
                  name={option.label}
                  defaultValue="default"
                  className="cursor-pointer bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
                >
                  <option disabled value="default">
                    -- Select an option --
                  </option>
                  {option["Select options"].map((op) => (
                    <option key={op.title} value={op.title}>
                      {op.title}
                    </option>
                  ))}
                </select>
              </fieldset>
            );
          } else {
            return (
              <fieldset
                key={`fieldset-${index}`}
                className="w-full flex flex-col mb-10"
              >
                <label className="mb-2">{option.label}</label>
                <input
                  name={option.label}
                  className="bg-[#f6f6f6] rounded-md p-2 focus-visible:outline-[#eaeaea]"
                  type="text"
                />
              </fieldset>
            );
          }
        })}

        <Button
          className="text-center w-full md:w-auto"
          text={buttonText}
          onClick={handleSubmit}
          style={{
            backgroundColor: buttonColor,
          }}
        />
      </form>
    </section>
  );
}

export default Form;
