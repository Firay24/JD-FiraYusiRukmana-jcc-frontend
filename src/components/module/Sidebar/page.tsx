import Container from "@/components/base/Container";
import React from "react";

const menuSidebar = [
  {
    label: "Dashboard",
    path: "/event-admin/dashboard",
  },
  {
    label: "Peserta",
    path: "/event-admin/participants",
  },
  {
    label: "Sekolah",
    path: "/event-admin/schools",
  },
];
const Sidebar = ({ currentPath }: { currentPath: string }) => {
  return (
    <Container>
      <div className="fixed">
        {menuSidebar.map((item, index) => (
          <div key={index} className="mb-2">
            <a href={item.path} className={`text-md block rounded-lg px-4 py-2 ${currentPath.toLowerCase() === item.path.toLowerCase() ? "font-semibold text-blue-600" : "text-neutral-500"} hover:bg-neutral-100 hover:text-neutral-800`}>
              {item.label}
            </a>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Sidebar;
