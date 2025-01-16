import clsx from "clsx";
import Button from "@/components/base/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface PaginationProps {
  page: string | number; // Current page (1-based index)
  pageSize: string | number; // Number of items per page
  totalItems: string | number; // Total number of items
  onPageChange: (page: string | number) => void; // Callback for page change
  className?: string;
  showFirstLastButton?: boolean;
}

export default function Pagination({ totalItems, page, showFirstLastButton, pageSize = 10, onPageChange, className }: PaginationProps) {
  const totalPages = Math.ceil(Number(totalItems) / Number(pageSize));

  return totalItems > pageSize ? (
    <div className={clsx(className, "flex items-center gap-3")}>
      {/* First Button */}
      {showFirstLastButton && (
        <Button className="size-8 p-0" onClick={() => onPageChange(1)} disabled={Number(page) === 1}>
          <MdKeyboardDoubleArrowLeft />
        </Button>
      )}

      {/* Previous Button */}
      <Button className="size-8 p-0" onClick={() => onPageChange(Number(page) - 1)} disabled={Number(page) === 1}>
        <MdKeyboardArrowLeft />
      </Button>

      {/* Page Numbers */}
      <Button className="h-8 min-w-8 p-0 px-2">{page}</Button>

      {/* Next Button */}
      <Button className="size-8 p-0" onClick={() => onPageChange(Number(page) + 1)} disabled={Number(page) === totalPages}>
        <MdKeyboardArrowRight />
      </Button>

      {/* Last Button */}
      {showFirstLastButton && (
        <Button className="size-8 p-0" onClick={() => onPageChange(totalPages)} disabled={Number(page) === totalPages}>
          <MdKeyboardDoubleArrowRight />
        </Button>
      )}
    </div>
  ) : (
    <></>
  );
}

// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import Button from "@/components/base/Button";
// import clsx from "clsx";

// interface PaginationProps {
//   length: number; // Total number of items
//   page: number; // Current page (1-based index)
//   onPageChange: (page: number) => void; // Callback for page change
//   pageSize?: number; // Number of items per page
// }

// export default function Pagination({ length, page, pageSize = 10, onPageChange }: PaginationProps) {
//   const totalPages = Math.ceil(length / pageSize);
//   const size = "min-w-9 h-9 py-0 px-2";

//   const renderPageNumbers = () => {
//     const pages = [];

//     // First three pages always visible
//     if (page <= 3) {
//       for (let i = 1; i <= Math.min(3, totalPages); i++) {
//         pages.push(
//           <Button key={i} className={clsx(size)} variant={page === i ? "secondary" : "primary"} onClick={() => onPageChange(i)}>
//             {i}
//           </Button>,
//         );
//       }
//       if (totalPages > 3) {
//         pages.push(
//           <Button key="end-ellipsis" className={clsx(size)} disabled>
//             ...
//           </Button>,
//         );
//         pages.push(
//           <Button key={totalPages} className={clsx(size)} variant={page === totalPages ? "secondary" : "primary"} onClick={() => onPageChange(totalPages)}>
//             {totalPages}
//           </Button>,
//         );
//       }
//     }

//     // Last three pages always visible
//     else if (page >= totalPages - 2) {
//       pages.push(
//         <Button key={1} className={clsx(size)} variant={page === 1 ? "secondary" : "primary"} onClick={() => onPageChange(1)}>
//           1
//         </Button>,
//       );
//       if (totalPages > 3) {
//         pages.push(
//           <Button key="start-ellipsis" className={clsx(size)} disabled>
//             ...
//           </Button>,
//         );
//       }
//       for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
//         pages.push(
//           <Button key={i} className={clsx(size)} variant={page === i ? "secondary" : "primary"} onClick={() => onPageChange(i)}>
//             {i}
//           </Button>,
//         );
//       }
//     }

//     // Middle pages
//     else {
//       pages.push(
//         <Button key={1} className={clsx(size)} variant={page === 1 ? "secondary" : "primary"} onClick={() => onPageChange(1)}>
//           1
//         </Button>,
//       );
//       pages.push(
//         <Button key="start-ellipsis" className={clsx(size)} disabled>
//           ...
//         </Button>,
//       );

//       for (let i = page - 1; i <= page + 1; i++) {
//         pages.push(
//           <Button key={i} className={clsx(size)} variant={page === i ? "secondary" : "primary"} onClick={() => onPageChange(i)}>
//             {i}
//           </Button>,
//         );
//       }

//       pages.push(
//         <Button key="end-ellipsis" className={clsx(size)} disabled>
//           ...
//         </Button>,
//       );
//       pages.push(
//         <Button key={totalPages} className={clsx(size)} variant={page === totalPages ? "secondary" : "primary"} onClick={() => onPageChange(totalPages)}>
//           {totalPages}
//         </Button>,
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="flex items-center gap-3">
//       {/* Previous Button */}
//       <Button className={clsx(size, "disabled:opacity-50")} onClick={() => onPageChange(page - 1)} disabled={page === 1}>
//         <MdKeyboardArrowLeft />
//       </Button>

//       {/* Page Numbers */}
//       {renderPageNumbers()}

//       {/* Next Button */}
//       <Button className={clsx(size, "disabled:opacity-50")} onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
//         <MdKeyboardArrowRight />
//       </Button>
//     </div>
//   );
// }
