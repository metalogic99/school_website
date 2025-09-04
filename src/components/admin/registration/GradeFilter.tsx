"use client";

import React from "react";

interface Props {
  grades: string[];
  selectedGrade?: string;
}

export default function GradeFilter({ grades, selectedGrade }: Props) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="grade" className="font-medium">
        Filter by Grade:
      </label>
      <select
        id="grade"
        name="grade"
        defaultValue={selectedGrade || ""}
        className="ml-2 rounded-md border p-2"
        onChange={(e) => {
          const value = e.target.value;
          if (value) {
            window.location.search = `?grade=${value}`;
          } else {
            window.location.search = "";
          }
        }}
      >
        <option value="">All</option>
        {grades.map((g) => (
          <option key={g} value={g}>
            Grade {g}
          </option>
        ))}
      </select>
    </div>
  );
}
