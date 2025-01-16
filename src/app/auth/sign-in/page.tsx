import { Metadata } from "next";
import SignIn from "./_component/SignIn";

export const metadata: Metadata = {
  title: "Sign In - XNGINE",
};

export default function page() {
  return <SignIn />;
}
