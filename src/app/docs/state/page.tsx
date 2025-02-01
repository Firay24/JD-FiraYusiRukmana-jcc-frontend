import { Metadata } from "next";
import State from "./_component/State";

export const metadata: Metadata = {
  title: "State - JCC",
};

export default function page() {
  return <State />;
}
