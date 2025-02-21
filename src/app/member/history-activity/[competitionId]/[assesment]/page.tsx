"use client";
import Container from "@/components/base/Container";
import BackNavbar from "@/components/module/BackNavbar";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEvent } from "@/hooks/event/useEvent";
import { TiWarning } from "react-icons/ti";

const AssesmentResult = () => {
  const params = useParams();
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);
  const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/event/getpdf/${params.competitionId}/${params.assesment}`;

  const handleShowPdf = async () => {
    try {
      const response = await fetch(pdfUrl);
      if (response.ok) {
        setPdfExists(true);
      } else {
        setPdfExists(false);
      }
      setShowPdf(true);
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setPdfExists(false);
      setShowPdf(true);
    }
  };

  return (
    <div className="min-h-screen bg-base-gray p-3">
      <Container>
        <div className="mb-6">
          <BackNavbar href="/member/history-activity" />
        </div>

        <div className="mt-6">
          <button onClick={handleShowPdf} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Lihat LJK
          </button>

          {showPdf && (
            <div
              className="relative mt-4 h-screen w-full overflow-hidden border"
              onContextMenu={(e) => e.preventDefault()}
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
              }}
            >
              {pdfExists ? (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                  <Viewer fileUrl={pdfUrl} defaultScale={1.2} />
                  <div className="absolute left-0 top-0 h-24 w-full bg-white" />
                </Worker>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-lg font-semibold text-red-500">
                  <p className="text-8xl">
                    <TiWarning />
                  </p>
                  <p className="mt-3">LJK tidak ada</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AssesmentResult;
