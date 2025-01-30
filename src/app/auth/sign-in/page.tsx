import { Metadata } from "next";
import SignIn from "./_component/SignIn";

export const metadata: Metadata = {
  title: "Sign In - JCC",
};

export default function page() {
  return <SignIn />;
}
