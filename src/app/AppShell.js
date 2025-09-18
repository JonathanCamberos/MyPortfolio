"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppShell({ children }) {
  const [radioLabel, setRadioLabel] = useState("Radio");

  return (
    <>
      <Header radioLabel={radioLabel} />
      <main className="pb-24">{children}</main> {/* mdx was hitting footer  */}
      <Footer radioLabel={radioLabel} setRadioLabel={setRadioLabel} />
    </>
  );
}