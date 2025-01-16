import { Metadata } from "next";
import State from "./_component/State";

export const metadata: Metadata = {
  title: "State - XNGINE",
};

export default function page() {
  return <State />;
}
