import Container from "@/components/base/Container";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TiWarning } from "react-icons/ti";

const menuSidebar = [
  {
    label: "Dashboard",
    path: "/event-admin/dashboard",
  },
  {
    label: "Ranking",
    path: "/event-admin/ranking",
  },
  {
    label: "Pengumuman",
    path: "/event-admin/pengumuman",
  },
  {
    label: "Peserta",
    path: "/event-admin/participants",
  },
  {
    label: "Kelas",
    path: "/event-admin/classes",
  },
  {
    label: "Sekolah",
    path: "/event-admin/schools",
  },
];
const Sidebar = ({ currentPath }: { currentPath: string }) => {
  const { logout } = useLogin();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Container>
      <div className="fixed">
        <div>
          {menuSidebar.map((item, index) => (
            <div key={index} className="mb-2">
              <a href={item.path} className={`text-md block rounded-lg px-4 py-2 ${currentPath.toLowerCase().startsWith(item.path.toLowerCase()) ? "font-semibold text-blue-600" : "text-neutral-500"} hover:bg-neutral-100 hover:text-neutral-800`}>
                {item.label}
              </a>
            </div>
          ))}
        </div>
        <div onClick={() => setIsModalOpen(true)} className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-red-400 hover:bg-neutral-100 hover:text-neutral-800">
          <FaPowerOff />
          <p>Keluar</p>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                <h3 className="text-xl font-semibold text-gray-900">Apa Anda yakin?</h3>
                <button onClick={() => setIsModalOpen(false)} className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                  <IoClose size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 space-y-4 p-4 text-center md:p-5">
                <div className="flex justify-center text-8xl text-red-500">
                  <TiWarning />
                </div>

                <p>Anda akan logout dari akun Anda. Lanjutkan?</p>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-b border-t border-gray-200 p-4 md:p-5">
                <button onClick={() => setIsModalOpen(false)} className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700">
                  Batal
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsModalOpen(false);
                    localStorage.setItem("isLogged", "false");
                    router.push("/auth/sign-in");
                  }}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800"
                >
                  Yakin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Sidebar;
