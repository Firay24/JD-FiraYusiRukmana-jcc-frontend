import { Metadata } from "next";
import SignUp from "./_component/SignUp";

export const metadata: Metadata = {
  title: "Sign Up - XNGINE",
};

export default function page() {
  return <SignUp />;
}
