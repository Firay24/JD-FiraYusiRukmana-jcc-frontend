import { Metadata } from "next";
import Components from "./_component/Components";

export const metadata: Metadata = {
  title: "Components - JCC",
};

export default function page() {
  return <Components />;
}
