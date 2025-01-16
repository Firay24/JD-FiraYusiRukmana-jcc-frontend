"use client";

import { MdArrowBack, MdImage } from "react-icons/md";

import Button from "@/components/base/Button";
import InputFile from "@/components/base/Input/InputFile";
import InputPassword from "@/components/base/Input/InputPassword";
import InputSearch from "@/components/base/Input/InputSearch";
import InputText from "@/components/base/Input/InputText";
import InputTextArea from "@/components/base/Input/InputTextArea";
import InputAutocomplete, { AutocompleteOption } from "@/components/base/Input/InputAutocomplete";
import { useEffect, useState } from "react";
import Dropdown, { DropdownOption } from "@/components/base/Dropdown";
import Skeleton from "@/components/base/Skeleton";
import Card from "@/components/base/Card";
import Dialog from "@/components/base/Dialog";
import Link from "next/link";
import DocumentContainer from "@/components/layout/Documentation/DocumentContainer";
import { slugify } from "@/utils/slugify";
import Documentation from "@/components/layout/Documentation";
import Pagination from "@/components/base/Pagination";
import clsx from "clsx";

export default function Components() {
  const titles = [
    //
    "Color",
    "Typography",
    "Button",
    "Input",
    "Dropdown",
    "Dialog",
    "Skeleton",
    "Card",
    "Pagination",
  ];
  return (
    <Documentation titles={titles}>
      <ColorContainer />
      <TypographyContainer />
      <ButtonContainer />
      <InputContainer />
      <DropdownContainer />
      <DialogContainer />
      <SkeletonContainer />
      <CardContainer />
      <PaginationContainer />
    </Documentation>
  );
}

function ColorContainer() {
  return (
    <DocumentContainer title="Color">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col">
          <p className="mb-3">Neutral</p>
          <div className="aspect-video w-24 bg-neutral-100"></div>
          <div className="aspect-video w-24 bg-neutral-200"></div>
          <div className="aspect-video w-24 bg-neutral-300"></div>
          <div className="aspect-video w-24 bg-neutral-400"></div>
          <div className="aspect-video w-24 bg-neutral-500"></div>
          <div className="aspect-video w-24 bg-neutral-600"></div>
          <div className="aspect-video w-24 bg-neutral-700"></div>
          <div className="aspect-video w-24 bg-neutral-800"></div>
          <div className="aspect-video w-24 bg-neutral-900"></div>
        </div>
        <div className="flex flex-col">
          <p className="mb-3">Primary</p>
          <div className="aspect-video w-24 bg-primary-100"></div>
          <div className="aspect-video w-24 bg-primary-200"></div>
          <div className="aspect-video w-24 bg-primary-300"></div>
          <div className="aspect-video w-24 bg-primary-400"></div>
          <div className="aspect-video w-24 bg-primary-500"></div>
          <div className="aspect-video w-24 bg-primary-600"></div>
          <div className="aspect-video w-24 bg-primary-700"></div>
        </div>
        <div className="flex flex-col">
          <p className="mb-3">Secondary</p>
          <div className="aspect-video w-24 bg-secondary-100"></div>
          <div className="aspect-video w-24 bg-secondary-200"></div>
          <div className="aspect-video w-24 bg-secondary-300"></div>
          <div className="aspect-video w-24 bg-secondary-400"></div>
          <div className="aspect-video w-24 bg-secondary-500"></div>
          <div className="aspect-video w-24 bg-secondary-600"></div>
          <div className="aspect-video w-24 bg-secondary-700"></div>
        </div>
        <div className="flex flex-col">
          <p className="mb-3">Danger</p>
          <div className="aspect-video w-24 bg-danger-100"></div>
          <div className="aspect-video w-24 bg-danger-500"></div>
          <div className="aspect-video w-24 bg-danger-600"></div>
        </div>
        <div className="flex flex-col">
          <p className="mb-3">Warning</p>
          <div className="aspect-video w-24 bg-warning-100"></div>
          <div className="aspect-video w-24 bg-warning-500"></div>
          <div className="aspect-video w-24 bg-warning-600"></div>
        </div>
        <div className="flex flex-col">
          <p className="mb-3">Success</p>
          <div className="aspect-video w-24 bg-success-100"></div>
          <div className="aspect-video w-24 bg-success-500"></div>
          <div className="aspect-video w-24 bg-success-600"></div>
        </div>
      </div>
    </DocumentContainer>
  );
}

function TypographyContainer() {
  const [fonts, setFonts] = useState<{ name: string; size: string; line: string; weight: string }[]>([]);

  useEffect(() => {
    const root = document.documentElement;

    const styles = window.getComputedStyle(root);

    const font = [
      {
        name: "h1",
        size: styles.getPropertyValue("--font-h1-size"),
        line: styles.getPropertyValue("--font-h1-line"),
        weight: styles.getPropertyValue("--font-h1-weight"),
      },
      {
        name: "h2",
        size: styles.getPropertyValue("--font-h2-size"),
        line: styles.getPropertyValue("--font-h2-line"),
        weight: styles.getPropertyValue("--font-h2-weight"),
      },
      {
        name: "h3",
        size: styles.getPropertyValue("--font-h3-size"),
        line: styles.getPropertyValue("--font-h3-line"),
        weight: styles.getPropertyValue("--font-h3-weight"),
      },
      {
        name: "h4",
        size: styles.getPropertyValue("--font-h4-size"),
        line: styles.getPropertyValue("--font-h4-line"),
        weight: styles.getPropertyValue("--font-h4-weight"),
      },
      {
        name: "h5",
        size: styles.getPropertyValue("--font-h5-size"),
        line: styles.getPropertyValue("--font-h5-line"),
        weight: styles.getPropertyValue("--font-h5-weight"),
      },
      {
        name: "h6",
        size: styles.getPropertyValue("--font-h6-size"),
        line: styles.getPropertyValue("--font-h6-line"),
        weight: styles.getPropertyValue("--font-h6-weight"),
      },
      {
        name: "h7",
        size: styles.getPropertyValue("--font-h7-size"),
        line: styles.getPropertyValue("--font-h7-line"),
        weight: styles.getPropertyValue("--font-h7-weight"),
      },
      {
        name: "h8",
        size: styles.getPropertyValue("--font-h8-size"),
        line: styles.getPropertyValue("--font-h8-line"),
        weight: styles.getPropertyValue("--font-h8-weight"),
      },
      {
        name: "body",
        size: styles.getPropertyValue("--font-body-size"),
        line: styles.getPropertyValue("--font-body-line"),
        weight: styles.getPropertyValue("--font-body-weight"),
      },
      {
        name: "small",
        size: styles.getPropertyValue("--font-small-size"),
        line: styles.getPropertyValue("--font-small-line"),
        weight: styles.getPropertyValue("--font-small-weight"),
      },
      {
        name: "bold",
        size: styles.getPropertyValue("--font-bold-size"),
        line: styles.getPropertyValue("--font-bold-line"),
        weight: styles.getPropertyValue("--font-bold-weight"),
      },
      {
        name: "italic",
        size: styles.getPropertyValue("--font-italic-size"),
        line: styles.getPropertyValue("--font-italic-line"),
        weight: styles.getPropertyValue("--font-italic-weight"),
      },
      {
        name: "link",
        size: styles.getPropertyValue("--font-link-size"),
        line: styles.getPropertyValue("--font-link-line"),
        weight: styles.getPropertyValue("--font-link-weight"),
      },
      {
        name: "paragraph",
        size: styles.getPropertyValue("--font-paragraph-size"),
        line: styles.getPropertyValue("--font-paragraph-line"),
        weight: styles.getPropertyValue("--font-paragraph-weight"),
      },
      {
        name: "indent",
        size: styles.getPropertyValue("--font-indent-size"),
        line: styles.getPropertyValue("--font-indent-line"),
        weight: styles.getPropertyValue("--font-indent-weight"),
      },
      {
        name: "xsmall",
        size: styles.getPropertyValue("--font-xsmall-size"),
        line: styles.getPropertyValue("--font-xsmall-line"),
        weight: styles.getPropertyValue("--font-xsmall-weight"),
      },
    ];

    setFonts(font);
  }, []);

  return (
    <DocumentContainer title="Typography">
      <>
        {fonts.map((font) => (
          <div key={font.name}>
            <p
              className={clsx(
                {
                  "text-paragraph-italic": font.name === "italic",
                  "text-paragraph-link": font.name === "link",
                  "text-paragraph-indent": font.name === "indent",
                },
                `text-${font.name}`,
              )}
            >
              <span className="capitalize">{font.name}</span> - {font.size}/{font.line} - {font.weight}
            </p>
          </div>
        ))}
      </>
    </DocumentContainer>
  );
}

function ButtonContainer() {
  return (
    <DocumentContainer title="Button">
      <div className="flex w-full flex-wrap items-center gap-4">
        <Button variant="primary-dark">primary-dark</Button>
        <Button variant="primary">primary</Button>
        <Button variant="primary-light">primary-light</Button>
        <Button variant="primary-outline">primary-outline</Button>
      </div>
      <div className="flex w-full flex-wrap items-center gap-4">
        <Button variant="secondary-dark">secondary-dark</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="secondary-light">secondary-light</Button>
        <Button variant="secondary-outline">secondary-outline</Button>
      </div>
      <div className="flex w-full flex-wrap items-center gap-4">
        <Button variant="light">light</Button>
        <Button variant="light-outline">light-outline</Button>
      </div>
      <div className="flex w-full flex-wrap items-center gap-4">
        <Button variant="danger">danger</Button>
        <Button variant="danger-outline">danger-outline</Button>
      </div>
      <div className="flex w-full flex-wrap items-center gap-4">
        <Button variant="warning">warning</Button>
        <Button variant="warning-outline">warning-outline</Button>
      </div>
      <div className="flex w-full flex-wrap items-center gap-4">
        <Button variant="success">success</Button>
        <Button variant="success-outline">success-outline</Button>
      </div>
    </DocumentContainer>
  );
}

function InputContainer() {
  const [autocomplete, setAutocomplete] = useState<AutocompleteOption | null>(null);
  const [text, setText] = useState<string>("");
  const options: AutocompleteOption[] = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
    { id: "3", name: "Option 3" },
  ];
  const options2: AutocompleteOption[] = [
    { id: "4", name: "Option 4" },
    { id: "5", name: "Option 5" },
    { id: "6", name: "Option 6" },
  ];
  const [insideObject, setInsideObject] = useState<{ text?: string; autocomplete?: AutocompleteOption } | null>({
    autocomplete: { id: "", name: "" },
    text: "",
  });

  useEffect(() => {
    //  Example if fetching API
    setTimeout(() => {
      setAutocomplete(() => ({ id: "1", name: "Option 1" }));
      setText("Initial Value");
    }, 1000);
    setTimeout(() => {
      setInsideObject({
        text: "Initial Value Object",
        autocomplete: { id: "4", name: "Option 4" },
      });
    }, 2000);
  }, []);

  return (
    <DocumentContainer title="Input">
      <InputText label="Text" placeholder="e.g. Input Text Here..." value={text} required onChange={(e) => setText(() => e.target.value)} />
      <InputPassword label="Password" placeholder="e.g. Input Password Here..." required onChange={(e) => console.log(e.target.value)} />
      <InputSearch label="Search" placeholder="e.g. Input Search Here..." onChange={(e) => console.log(e.target.value)} />
      <InputTextArea label="Text Area" placeholder="e.g. Input Text Area Here..." required onChange={(e) => console.log(e.target.value)} />
      <InputFile label="One File" title="One File" description="Here is description" required onChange={(e) => console.log(e.target.files)} />
      <InputFile label="Multiple File" title="Multiple File" description="Here is description" multiple required onChange={(e) => console.log(e.target.files)} />
      <InputFile label="Image Only" title="Image Only" description="File support .jpg .jpeg .png .gif" accept=".jpg,.jpeg,.png,.gif" required onChange={(e) => console.log(e.target.files)} />
      <InputFile label="Change Icon" title="Change Icon" description="Here is description" icon={MdImage} required onChange={(e) => console.log(e.target.files)} />
      <div className="flex items-end gap-4">
        <InputAutocomplete label="Auto Complete" value={autocomplete} options={options} placeholder="e.g. Input Auto Complete Here..." required onChange={(event) => setAutocomplete(event)} />
        <div className="h-full rounded-lg border border-neutral-200 bg-neutral-100 p-3 font-monospace">
          Autocomplete: {autocomplete?.id} - {autocomplete?.name}
        </div>
      </div>
      <div className="flex items-end gap-4">
        <InputAutocomplete label="Change Icon" value={autocomplete} options={options} placeholder="e.g. Input Auto Complete Here..." icon={MdImage} required onChange={(event) => setAutocomplete(event)} />
        <div className="h-full rounded-lg border border-neutral-200 bg-neutral-100 p-3 font-monospace">
          Autocomplete: {autocomplete?.id} - {autocomplete?.name}
        </div>
      </div>

      {/* Example */}
      <h2 className="my-4 font-normal">Example inside object</h2>
      <div className="flex items-end gap-4">
        <InputText label="Inside Object" placeholder="e.g. Input Text Here..." value={insideObject?.text} required onChange={(e) => setInsideObject((prev) => ({ ...prev, text: e.target.value }))} />
        <InputAutocomplete label="Inside Object" value={insideObject?.autocomplete} options={options2} placeholder="e.g. Input Auto Complete Here..." required onChange={(event) => setInsideObject((prev) => ({ ...prev, autocomplete: event }))} />
        <div className="h-full rounded-lg border border-neutral-200 bg-neutral-100 p-3 font-monospace">
          <p>Text: {insideObject?.text}</p>
          <p>
            Autocomplete: {insideObject?.autocomplete?.id} - {insideObject?.autocomplete?.name}
          </p>
        </div>
      </div>
    </DocumentContainer>
  );
}

function DropdownContainer() {
  const dropdownOptions: DropdownOption[] = [
    {
      text: "Option 7",
    },
    {
      text: "Option 8",
    },
    {
      text: "Option 9",
    },
  ];

  return (
    <DocumentContainer title="Dropdown">
      <Dropdown options={dropdownOptions}>
        <Button>Label Here</Button>
      </Dropdown>
      <Dropdown options={dropdownOptions} isFullWidth>
        <Button variant="primary-dark">Full Width for Options</Button>
      </Dropdown>
      <Dropdown
        options={[
          {
            text: "Doing Nothing",
          },
          {
            text: "onClick Options",
            onClick: () => alert("OnClick Options"),
          },
          {
            text: "href Options",
            href: "/docs/components",
          },
          {
            text: "Both onClick and Href",
            href: "/docs/components",
            onClick: () => alert("Both onClick and Href"),
          },
        ]}
      >
        <Button variant="primary-outline">With Function</Button>
      </Dropdown>

      <Dropdown options={dropdownOptions}>
        <div className="cursor-pointer rounded-lg border border-neutral-200 bg-neutral-100 p-3">Inside another element</div>
      </Dropdown>
    </DocumentContainer>
  );
}

function DialogContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <DocumentContainer title="Dialog">
      <Button variant="secondary" onClick={() => setIsOpen((prev) => !prev)}>
        Open Dialog
      </Button>
      <Dialog isOpen={isOpen} onClose={(value) => setIsOpen(() => value)}>
        Child here...
      </Dialog>

      <Button variant="secondary-dark" onClick={() => setIsOpen2((prev) => !prev)}>
        Custom Width
      </Button>
      <Dialog width="1080px" isOpen={isOpen2} onClose={(value) => setIsOpen2(() => value)}>
        Child here...
      </Dialog>

      <Button variant="secondary-light" onClick={() => setIsOpen3((prev) => !prev)}>
        Change Padding
      </Button>
      <Dialog className="p-3" isOpen={isOpen3} onClose={(value) => setIsOpen3(() => value)}>
        Child here...
      </Dialog>

      <Button variant="secondary-outline" onClick={() => setIsOpen5((prev) => !prev)}>
        Without Transition
      </Button>
      <Dialog transition={false} isOpen={isOpen5} onClose={(value) => setIsOpen5(() => value)}>
        Child here...
      </Dialog>

      <Button variant="light" onClick={() => setIsOpen4((prev) => !prev)}>
        Custom Dialog
      </Button>
      <Dialog width="400px" className="w-full rounded-2xl bg-success-100 p-8" isOpen={isOpen4} onClose={(value) => setIsOpen4(() => value)}>
        Child here...
      </Dialog>
    </DocumentContainer>
  );
}

function SkeletonContainer() {
  return (
    <DocumentContainer title="Skeleton">
      <label htmlFor="" className="mb-1 block">
        Can be shape anything
      </label>
      <div className="flex w-64 flex-col gap-4">
        <div className="flex w-full gap-3">
          <div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <Skeleton className="h-2 w-full rounded-lg" />
        <Skeleton className="h-2 w-full rounded-lg" />
        <Skeleton className="h-2 w-full rounded-lg" />
      </div>
    </DocumentContainer>
  );
}

function CardContainer() {
  return (
    <DocumentContainer title="Card">
      <Card>Shadow Card</Card>
      <Card type="border">Bordered Card</Card>
      <Card type="none">Without Shadow and Border</Card>
      <Card className="p-6">Custom padding</Card>
    </DocumentContainer>
  );
}

function PaginationContainer() {
  const [page, setPage] = useState(1);
  const totalItems = 1000;
  const pageSize = 5;

  return (
    <DocumentContainer title="Pagination">
      Current Page : {page}
      <br />
      Page Size : {pageSize}
      <br />
      Total Items : {totalItems}
      <Pagination showFirstLastButton totalItems={totalItems} onPageChange={(currentPage) => setPage(() => +currentPage)} pageSize={pageSize} page={page} />
    </DocumentContainer>
  );
}
