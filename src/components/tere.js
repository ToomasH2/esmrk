import React from "react";
import { useEffect } from "react";
export default function Tere() {
  useEffect(() => {
    document.title = "My Page Title";
  });
  return (
    <div>
      <h1>tere</h1>
    </div>
  );
}
