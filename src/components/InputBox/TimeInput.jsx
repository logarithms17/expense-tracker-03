import { useState } from "react";

const initialTime = () => {
  const date = new Date();
  const pad = (num) => num.toString().padStart(2, "0"); // Pad single-digit numbers
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${hours}:${minutes}`; // Format to HH:mm
};

const TimeInput = () => {
  const [time, setTime] = useState(initialTime());

  return (
    <label htmlFor="time" className="flex-1">
      <p className="pb-3">Time</p>
      <input
        type="time"
        placeholder="00:00"
        className={`bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 text-neutral-500 w-full custom-input-icon`}
        name="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </label>
  );
};

export default TimeInput;
