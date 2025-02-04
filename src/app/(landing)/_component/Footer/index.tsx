import Container from "@/components/base/Container";
import Section from "@/components/layout/Section";
import React from "react";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";

const FooterLandingPage = () => {
  return (
    <Section id="contact">
      <Container style={{ marginTop: "100px", marginBottom: "20px" }}>
        <footer>
          <div id="contact" className="mx-auto w-full max-w-screen-xl px-6 lg:py-8">
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-start">
                  <div className="mb-6 md:mb-0">
                    <a href="#home" className="flex items-center">
                      <img src="/img/logo.png" className="me-3 h-14" alt="FlowBite Logo" />
                    </a>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
                  © 2025{" "}
                  <a href="https://jrchampionship.id/" className="hover:underline">
                    Junior Championship Center™
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
              <div className="mt-4 flex text-3xl sm:mt-0 sm:justify-center">
                <a href="https://www.instagram.com/jrchampionship.id/" className="text-gray-500 hover:text-gray-900">
                  <RiInstagramFill />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://wa.me/6285190079298?text=Halo%20admin%20Junio%2C%20Kak%20Gita%20ada%20yang%20perlu%20saya%20tanyakan%20lebih%20lanjut%20perihal%20Junio.%20Terima%20kasih%20kak%20Gita" className="ms-5 text-gray-500 hover:text-gray-900">
                  <RiWhatsappFill />
                  <span className="sr-only">Whatsapp</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </Section>
  );
};

export default FooterLandingPage;
