import { useState } from "react";

const initialDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero
  return `${year}-${month}-${day}`;
};

const DateInput = () => {
  const [date, setDate] = useState(initialDate());

  return (
    <label htmlFor="date" className="flex-1">
      <p className="pb-3">Date</p>
      <input
        type="date"
        className={`bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 text-neutral-500 w-full custom-input-icon`}
        name="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </label>
  );
};

export default DateInput;
