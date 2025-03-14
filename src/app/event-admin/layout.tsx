"use client";
import ContainerAdmin from "@/components/base/Container-admin/page";
import Sidebar from "@/components/module/Sidebar/page";
import { usePathname } from "next/navigation";
import React from "react";

const EventAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <ContainerAdmin>
      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div>
          <Sidebar currentPath={pathName} />
        </div>

        {/* Konten Utama */}
        <div className="col-span-3 mr-6">{children}</div>
      </div>
    </ContainerAdmin>
  );
};

export default EventAdminLayout;
