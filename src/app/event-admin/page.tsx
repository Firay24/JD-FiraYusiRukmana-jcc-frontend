import { redirect } from "next/navigation";

export default function EventAdminHome() {
  redirect("/event-admin/dashboard");
  return null;
}
