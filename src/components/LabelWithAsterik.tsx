import React from "react";
import { Label } from "./ui/label";

const LabelWithAsterik = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <Label {...props}>
      {children}
      <span className="text-red-600">*</span>{" "}
    </Label>
  );
};

export default LabelWithAsterik;
