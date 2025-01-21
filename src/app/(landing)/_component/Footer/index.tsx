import Container from "@/components/base/Container";
import React from "react";

const FooterLandingPage = () => {
  return (
    <Container style={{ marginTop: "180px", marginBottom: "100px" }}>
      <div className="flex w-full flex-col gap-2 border-t border-neutral-300 px-6 xl:px-0">
        <div className="flex flex-col items-center justify-between md:flex-row md:items-end">
          <div className="flex flex-row gap-2 pt-10 md:flex-row">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="/support" className="hover:underline">
              Support
            </a>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center md:text-left">© Copyright 2024, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FooterLandingPage;
