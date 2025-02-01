import { Metadata } from "next";
import Utilities from "./_component/Utilities";

export const metadata: Metadata = {
  title: "Utilities - JCC",
};

export default function page() {
  return <Utilities />;
}
