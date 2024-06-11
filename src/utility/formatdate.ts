import React from "react";

const formatDate = (unix_time: any) => {
  // Convert Unix timestamp to milliseconds
  const date: any = new Date(unix_time * 1000);

  // Get current date
  const now: any = new Date();

  // Calculate the difference in days between the current date and the provided date
  const diffDays: any = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  let formattedDate;

  if (diffDays === 0) {
    // If the date is today
    formattedDate = "Today at " + date.toLocaleTimeString();
  } else if (diffDays === 1) {
    // If the date was yesterday
    formattedDate = "Yesterday at " + date.toLocaleTimeString();
  } else {
    // For other dates, use a regular date format
    formattedDate =
      date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  }

  return formattedDate;
};

export default formatDate;
