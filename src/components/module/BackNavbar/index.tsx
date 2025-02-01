"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

interface BackNavbarProps {
  href?: string; // Opsional: Jika diberikan, akan mengarah ke halaman tertentu
}

const BackNavbar: React.FC<BackNavbarProps> = ({ href }) => {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <nav className="flex items-center px-4 pt-6">
      {href ? (
        <Link href={href} className="flex items-center space-x-2 text-blue-600 hover:underline">
          <FaArrowLeftLong className="h-5 w-5" />
          <span>Back</span>
        </Link>
      ) : (
        <button onClick={handleBack} className="flex items-center space-x-2 text-neutral-700">
          <FaArrowLeftLong className="h-5 w-5" />
          <span>kembali</span>
        </button>
      )}
    </nav>
  );
};

export default BackNavbar;
