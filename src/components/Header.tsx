import React from "react";

type props = {
  label: string;
  onClick: () => void;
};

export const Button = ({ label, onClick }: props) => {
  return <button onClick={onClick}>{label}</button>;
};
