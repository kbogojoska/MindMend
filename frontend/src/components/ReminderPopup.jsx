import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/Reminder.css";

function ReminderPopup({ onSetReminder, onClose }) {
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const handleDateChange = (e) => {
    setReminderDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setReminderTime(e.target.value);
  };

  const handleSave = () => {
    const formattedDateTime = formatDateTime(reminderDate, reminderTime);
    onSetReminder(formattedDateTime);
    toast.success(`Reminder set for ${formattedDateTime}`);
    onClose();
  };

  // Function to format date and time as mm-dd-yyyy hh:mm
  const formatDateTime = (date, time) => {
    return `${date} ${time}`;
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Set Reminder</h2>
        <label htmlFor="reminderDate">Reminder Date:</label>
        <input
          type="date"
          id="reminderDate"
          value={reminderDate}
          onChange={handleDateChange}
        />
        <label htmlFor="reminderTime">Reminder Time:</label>
        <input
          type="time"
          id="reminderTime"
          value={reminderTime}
          onChange={handleTimeChange}
        />
        <div className="popup-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ReminderPopup;
