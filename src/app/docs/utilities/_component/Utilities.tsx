"use client";

import Button from "@/components/base/Button";
import Code from "@/components/base/Code";
import DocumentContainer from "@/components/layout/Documentation/DocumentContainer";
import InputFile from "@/components/base/Input/InputFile";
import InputText from "@/components/base/Input/InputText";
import Skeleton from "@/components/base/Skeleton";
import Type from "@/components/base/Type";
import Documentation from "@/components/layout/Documentation";
import { debounce } from "@/utils/debounce";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatNumber } from "@/utils/formatNumber";
import { generateId } from "@/utils/generateId";
import { getBase64FromFile } from "@/utils/getBase64FromFile";
import { getBase64FromFileResized } from "@/utils/getBase64FromFileResized";
import { getBlobFromBase64 } from "@/utils/getBlobFromBase64";
import { http } from "@/utils/http";
import { slugify } from "@/utils/slugify";
import { throttle } from "@/utils/throttle";
import { useCallback, useEffect, useState } from "react";
import { placeholderImage } from "@/utils/placeholderImage";

export default function Utilities() {
  const titles = [
    //
    "debounce",
    "throttle",
    "formatCurrency",
    "formatNumber",
    "generateId",
    "getBase64FromFileResized",
    "getBase64FromFile",
    "getBlobFromBase64",
    "placeholderImage",
    "http",
    "slugify",
  ];
  return (
    <>
      <Documentation titles={titles}>
        <Debounce />
        <Throttle />
        <FormatCurrency />
        <FormatNumber />
        <GenerateId />
        <GetBase64FromFileResized />
        <GetBase64FromFile />
        <GetBlobFromBase64 />
        <PlaceholderImage />
        <Http />
        <Slugify />
      </Documentation>
    </>
  );
}

function PlaceholderImage() {
  return (
    <DocumentContainer title="placeholderImage" monospace>
      <div className="flex gap-4">
        <div className="size-20 overflow-hidden rounded-lg">
          <img src={placeholderImage({ width: 512, height: 512, text: "placeholderImage" })} className="h-full w-full object-cover object-center" />
        </div>
        <div className="size-20 overflow-hidden rounded-lg">
          <img src={placeholderImage({ width: 512, height: 512, text: "monospace" })} className="h-full w-full object-cover object-center" />
        </div>
        <div className="size-20 overflow-hidden rounded-lg">
          <img src={placeholderImage({ width: 512, height: 512, text: "RMRA" })} className="h-full w-full object-cover object-center" />
        </div>
      </div>
    </DocumentContainer>
  );
}

function Debounce() {
  const [text, setText] = useState("");
  const handleChange = debounce((e) => {
    setText(e.target.value);
  }, 500);

  return (
    <DocumentContainer title="debounce" monospace>
      <div>
        In React, <Code>debounce</Code> is often used with input fields to delay actions like API calls until the user stops typing. Here's how you could use it to handle a search input field, where the search query only updates after the user pauses typing for a moment.
      </div>
      <p>Example Code:</p>
      <Code allowCopy block>
        {`
            import React, { useState } from "react";
            import { debounce } from "@/utils/debounce";

            export default function SearchComponent() {
              const [query, setQuery] = useState("");

              // Debounce the search function to delay handling input
              const handleSearch = debounce((value) => {
                console.log("Searching for:", value);
                setQuery(value);

                // Imagine this is where you"d make an API call
              }, 500);

              // Update query state and call debounced search
              const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                handleSearch(e.target.value);
              };

              return (
                <div>
                  <input
                    type="text"
                    value={query}
                    onChange={onChange}
                    placeholder="Search here..."
                  />
                </div>
              );
            }
          `}
      </Code>
      <Code block allowCopy>
        {`
            const handleDebounce = debounce((value) => {
              console.log(value);
            }, 500);
          `}
      </Code>
      <p>Example Case:</p>
      <div className="flex items-center gap-4">
        <InputText className="w-fit" placeholder="Type something..." onChange={handleChange} />
        <p>Result in 500ms : {text}</p>
      </div>
    </DocumentContainer>
  );
}

function Throttle() {
  const [number, setNumber] = useState(0);

  const handleChange = useCallback(
    throttle(() => {
      setNumber((prev) => prev + 1);
      console.log("Number incremented!");
    }, 1000),
    [],
  );

  return (
    <DocumentContainer title="throttle" monospace>
      <div>
        In React, <Code>throttle</Code> is often used to limit how frequently a function can be executed, ensuring that it is not called more than once in a specified time period. This can be particularly useful for handling events like scrolling, resizing, and button pressing, where you may not want to perform an action on every event trigger.
      </div>
      <p>Example Code:</p>
      <Code block allowCopy>
        {`
            import React, { useState, useCallback } from "react";
            import { throttle } from "@/utils/throttle";

            export default function ThrottleComponent() {
              const [number, setNumber] = useState(0);

              const handleChange = useCallback(
                throttle(() => {
                  setNumber((prev) => prev + 1);
                }, 1000),
                [],
              );

              return (
                <div>
                  <button type="button" onClick={handleChange} />
                  <p>Result (updated every 1s): {number}</p>
                </div>
              );
            }
          `}
      </Code>
      <Code block allowCopy>
        {`
            const handleChange = throttle(() => {
                console.log("Doing Something!");
            }, 1000),
          `}
      </Code>
      <p>Example Case:</p>
      <div className="flex items-center gap-4">
        <Button onClick={handleChange}>Add Number</Button>
        <p>Result (updated every 1s): {number}</p>
      </div>
    </DocumentContainer>
  );
}

function FormatCurrency() {
  const [number, setNumber] = useState(125000.55);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(() => +e.target.value);
  }, []);

  return (
    <DocumentContainer title="formatCurrency" monospace>
      <p>
        The <Code>formatCurrency</Code> function formats a number as a currency string. It takes three parameters:
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-4">
        <li>
          <Code>amount</Code> (<Type>number</Type>): the amount to format.
        </li>
        <li>
          <Code>locales</Code> (<Type>string</Type>, default <Code>"id-ID"</Code>): the locale for formatting, determining language and region (e.g., "id-ID" for Indonesian).
        </li>
        <li>
          <Code>currency</Code> (<Type>string</Type>, default <Code>"IDR"</Code>): the currency code, such as "IDR" for Indonesian Rupiah or "USD" for US Dollar.
        </li>
      </ul>
      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { formatCurrency } from "@/utils/formatCurrency";

          const formattedAmount = formatCurrency(1234567.89, "id-ID", "IDR");
          const formattedAmountUS = formatCurrency(50000, "en-US", "USD");

          console.log(formattedAmount);   // Output: "Rp 1.234.567,89"
          console.log(formattedAmountUS); // Output: "$50,000"
        `}
      </Code>
      <Code allowCopy block>
        {`
          formatCurrency(100000);
        `}
      </Code>
      <p>Example Case :</p>
      <div className="flex items-center gap-4">
        <InputText type="number" value={number} placeholder="Input Number" onChange={handleChange} />
        <p>Result IDR : {formatCurrency(number)}</p>
      </div>
      <div className="flex items-center gap-4">
        <InputText type="number" value={number} placeholder="Input Number" onChange={handleChange} />
        <p>Result USD : {formatCurrency(number, "en-US", "USD")}</p>
      </div>
      <div className="flex items-center gap-4">
        <InputText type="number" value={number} placeholder="Input Number" onChange={handleChange} />
        <p>Result EUR : {formatCurrency(number, "de-DE", "EUR")}</p>
      </div>
      <div className="flex items-center gap-4">
        <InputText type="number" value={number} placeholder="Input Number" onChange={handleChange} />
        <p>Result JPY : {formatCurrency(number, "ja-JP", "JPY")}</p>
      </div>
    </DocumentContainer>
  );
}

function FormatNumber() {
  const [number, setNumber] = useState(125000.55);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(() => +e.target.value);
  }, []);

  return (
    <DocumentContainer title="formatNumber" monospace>
      <p>
        The <Code>formatNumber</Code> function formats a number with locale-specific grouping and decimal places, making it easier to read in various regional formats. It takes two parameters:
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-4">
        <li>
          <Code>amount</Code> (<Type>number</Type>): the number to format.
        </li>
        <li>
          <Code>locales</Code> (<Type>string</Type>, default <Code>"id-ID"</Code>): the locale for formatting, which affects the grouping, decimal separators, and formatting style (e.g., "id-ID" for Indonesian).
        </li>
      </ul>
      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { formatNumber } from "@/utils/formatNumber";

          const formattedNumber = formatNumber(12345);
          const formattedNumberFloat = formatNumber(12345.6789);
          const formattedNumberUS = formatNumber(12345, "en-US");

          console.log(formattedNumber);      // Outputs: "12.345" in Indonesian format
          console.log(formattedNumberFloat); // Outputs: "12.345,68"
          console.log(formattedNumberUS);    // Outputs: "12,345" in US format
        `}
      </Code>
      <Code allowCopy block>
        {`
          formatNumber(100000);
        `}
      </Code>
      <p>Example Case :</p>
      <div className="flex items-center gap-4">
        <InputText type="number" value={number} placeholder="Input Number" onChange={handleChange} />
        <p>Result id-ID : {formatNumber(number)}</p>
      </div>
      <div className="flex items-center gap-4">
        <InputText type="number" value={number} placeholder="Input Number" onChange={handleChange} />
        <p>Result en-US : {formatNumber(number, "en-US")}</p>
      </div>
      <div className="flex items-center gap-4">
        <InputText type="number" value={number} placeholder="Input Number" onChange={handleChange} />
        <p>Result de-DE : {formatNumber(number, "de-DE")}</p>
      </div>
    </DocumentContainer>
  );
}

function GenerateId() {
  const [generatedId, setGeneratedId] = useState("");

  return (
    <DocumentContainer title="generateId" monospace>
      <p>
        The <Code>generateId</Code> function generates a unique ID combining the current Unix timestamp with a random string of uppercase letters.
      </p>

      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { generateId } from "@/utils/generateId";

          const id = generateId();
          console.log(id); // Outputs: "unix_timestamp + random_string"
        `}
      </Code>
      <Code allowCopy block>
        {`
          generateId();
        `}
      </Code>
      <p>Example Case :</p>
      <Button onClick={() => setGeneratedId(() => generateId())}>Generate ID</Button>

      <p>Result : {generatedId}</p>
    </DocumentContainer>
  );
}

function GetBase64FromFileResized() {
  const [contain, setContain] = useState("");
  const [cover, setCover] = useState("");
  const [fill, setFill] = useState("");
  const [inside, setInside] = useState("");
  const [outside, setOutside] = useState("");

  const [loadingContain, seLoadingtContain] = useState(false);
  const [loadingCover, seLoadingtCover] = useState(false);
  const [loadingFill, seLoadingtFill] = useState(false);
  const [loadingInside, seLoadingtInside] = useState(false);
  const [loadingOutside, seLoadingtOutside] = useState(false);

  const resizeThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    seLoadingtContain(() => true);
    seLoadingtCover(() => true);
    seLoadingtFill(() => true);
    seLoadingtInside(() => true);
    seLoadingtOutside(() => true);

    if (file.type.startsWith("image")) {
      getBase64FromFileResized(file, { width: 1280, height: 720, fit: "contain" }).then((base64) => {
        setContain(base64);
        seLoadingtContain(() => false);
      });
      getBase64FromFileResized(file, { width: 1280, height: 720, fit: "cover" }).then((base64) => {
        setCover(base64);
        seLoadingtCover(() => false);
      });
      getBase64FromFileResized(file, { width: 1280, height: 720, fit: "fill" }).then((base64) => {
        setFill(base64);
        seLoadingtFill(() => false);
      });
      getBase64FromFileResized(file, { width: 1280, height: 720, fit: "inside" }).then((base64) => {
        setInside(base64);
        seLoadingtInside(() => false);
      });
      getBase64FromFileResized(file, { width: 1280, height: 720, fit: "outside" }).then((base64) => {
        setOutside(base64);
        seLoadingtOutside(() => false);
      });
    }
  };

  const Image = ({ src, label, loading }: { src: string; label: string; loading: boolean }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(loading);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      setSize({ width: naturalWidth, height: naturalHeight });
    };

    useEffect(() => {
      setIsLoading(() => loading);
    }, [loading]);

    return (
      ((isLoading && !src) || src) && (
        <div className="flex w-full flex-col gap-2">
          <label>{label}</label>
          {!isLoading && <img src={src} alt="" onLoad={handleImageLoad} />}
          {isLoading && <Skeleton className="aspect-video w-full" />}
          <p>width: {size.width}px</p>
          <p>height: {size.height}px</p>
        </div>
      )
    );
  };

  const reset = () => {
    setContain("");
    setCover("");
    setFill("");
    setInside("");
    setOutside("");
  };

  return (
    <DocumentContainer title="getBase64FromFileResized" monospace>
      <p>
        The <Code>getBase64FromFileResized</Code> function takes an image file, converts it to a base64 format, resizes it based on specified options, and returns the resized image as a base64 string. It takes 5 fitment image, here it is:
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-4">
        <li>
          <Type>contain</Type>
        </li>
        <li>
          <Type>cover</Type>
        </li>
        <li>
          <Type>fill</Type>
        </li>
        <li>
          <Type>inside</Type>
        </li>
        <li>
          <Type>outside</Type>
        </li>
      </ul>

      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { getBase64FromFileResized } from "@/utils/getBase64FromFileResized";
          import { useState } from "react";

          export default function ResizeComponent() {
            const [base64, setBase64] = useState("");

            const resizeThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;

              if (file.type.startsWith("image")) {
                const base64 = await getBase64FromFileResized(file, { width: 1280, height: 720, fit: "cover" });
                setBase64(base64);
              }
            };

            return (
              <div>
                <input type="file" onChange={resizeThumbnail} />
                <img src={base64} />
              </div>
            );
          }
        `}
      </Code>
      <Code allowCopy block>
        {`
          await getBase64Resized(file, { width: 1280, height: 720, fit: "cover" });
        `}
      </Code>
      <p>Example Case :</p>
      <div className="flex flex-wrap items-center gap-4">
        <InputFile title="Image Only" description="Resize image to 1280x720px" onChange={resizeThumbnail} />
        <Button onClick={reset}>Reset</Button>
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <Image loading={loadingContain} src={contain} label="contain" />
        <Image loading={loadingCover} src={cover} label="cover" />
        <Image loading={loadingFill} src={fill} label="fill" />
        <Image loading={loadingInside} src={inside} label="inside" />
        <Image loading={loadingOutside} src={outside} label="outside" />
      </div>
    </DocumentContainer>
  );
}

function GetBase64FromFile() {
  const [contain, setContain] = useState("");

  const [loadingContain, seLoadingtContain] = useState(false);
  const resizeThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    seLoadingtContain(() => true);

    if (file.type.startsWith("image")) {
      getBase64FromFile(file).then((base64) => {
        setContain(base64);
        seLoadingtContain(() => false);
      });
    }
  };

  const Image = ({ src, label, loading }: { src: string; label: string; loading: boolean }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(loading);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      setSize({ width: naturalWidth, height: naturalHeight });
    };

    useEffect(() => {
      setIsLoading(() => loading);
    }, [loading]);

    return (
      ((isLoading && !src) || src) && (
        <div className="flex w-full flex-col gap-2">
          <label>{label}</label>
          {!isLoading && <img src={src} alt="" onLoad={handleImageLoad} />}
          {isLoading && <Skeleton className="aspect-video w-full" />}
          <p>width: {size.width}px</p>
          <p>height: {size.height}px</p>
        </div>
      )
    );
  };

  const reset = () => {
    setContain("");
  };

  return (
    <DocumentContainer title="getBase64FromFile" monospace>
      <p>
        The <Code>getBase64FromFile</Code> function takes an image file, converts it to a base64 format, but not resizes.
      </p>

      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { getBase64FromFile } from "@/utils/getBase64FromFile";
          import { useState } from "react";

          export default function ResizeComponent() {
            const [base64, setBase64] = useState("");

            const convertImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;

              if (file.type.startsWith("image")) {
                const base64 = await getBase64FromFile(file);
              }
            };

            return (
              <div>
                <input type="file" onChange={convertImage} />
                <img src={base64} />
              </div>
            );
          }
        `}
      </Code>
      <Code allowCopy block>
        {`
          await getBase64Resized(file);
        `}
      </Code>
      <p>Example Case :</p>
      <div className="flex flex-wrap items-center gap-4">
        <InputFile title="Image Only" description="Only .jpg,.jpeg,.png,.gif,.webp" accept=".jpg,.jpeg,.png,.gif,.webp" onChange={resizeThumbnail} />
        <Button onClick={reset}>Reset</Button>
      </div>
      <div className="grid w-full grid-cols-4 gap-4">
        <Image loading={loadingContain} src={contain} label="Image" />
      </div>
    </DocumentContainer>
  );
}

function GetBlobFromBase64() {
  const [contain, setContain] = useState("");

  const [loadingContain, seLoadingtContain] = useState(false);

  const resizeThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    seLoadingtContain(() => true);

    if (file.type.startsWith("image")) {
      getBase64FromFile(file).then((base64) => {
        setContain(base64);
        seLoadingtContain(() => false);
      });
    }
  };

  const Image = ({ src, label, loading }: { src: string; label: string; loading: boolean }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(loading);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      setSize({ width: naturalWidth, height: naturalHeight });
    };

    useEffect(() => {
      setIsLoading(() => loading);
    }, [loading]);

    return (
      ((isLoading && !src) || src) && (
        <div className="flex w-full flex-col gap-2">
          <label>{label}</label>
          {!isLoading && <img src={src} alt="" onLoad={handleImageLoad} />}
          {isLoading && <Skeleton className="aspect-video w-full" />}
          <p>width: {size.width}px</p>
          <p>height: {size.height}px</p>
        </div>
      )
    );
  };

  const uploadImage = async (base64: string) => {
    const buffer = await getBlobFromBase64(base64);
    const uploadForm = new FormData();
    uploadForm.append("files", buffer);
    // const response = await http.post<{ location: string }>(`/v1/media/article/upload/${article.id}`, uploadForm);
    // return response.data.location;
  };

  return (
    <DocumentContainer title="getBlobFromBase64" monospace>
      <p>
        The <Code>getBlobFromBase64</Code> function converts a base64-encoded string with a MIME type into a Blob object, which can be used as a file-like object in web applications. Usually, it use with the <Code>getBase64FromFile</Code> function.
      </p>

      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { getBase64FromFile } from "@/utils/getBase64FromFile";
          import { getBlobFromBase64 } from "@/utils/getBlobFromBase64";
          import { useHttp } from "@/hooks/http/useHttp";
          import { useState } from "react";

          export default function ResizeComponent({ article }: { article: { id: string } }) {
            const [base64, setBase64] = useState("");
            const http = useHttp();

            const convertImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;

              if (file.type.startsWith("image")) {
                const base64 = await getBase64FromFile(file);
                setBase64(base64);
              }
            };

            const uploadImage = async (base64: string) => {
              const buffer = await getBlobFromBase64(base64);
              const uploadForm = new FormData();
              uploadForm.append("files", buffer);
              const response = await http.post<{ location: string }>(\`/v1/media/article/upload/\${article.id}\`, uploadForm);
              return response.data.location;
            };

            return (
              <div>
                <input type="file" onChange={convertImage} />
                <img src={base64} />
                <button onClick={() => uploadImage(base64)}>Upload</button>
              </div>
            );
          }
        `}
      </Code>
      <Code allowCopy block>
        {`
          await getBlobFromBase64(file);
        `}
      </Code>
      <p>Example Case :</p>
      <div className="flex flex-wrap items-center gap-4">
        <InputFile title="Image Only" description="Only .jpg,.jpeg,.png,.gif,.webp" accept=".jpg,.jpeg,.png,.gif,.webp" onChange={resizeThumbnail} />
        <Button onClick={() => uploadImage(contain)}>Upload (i don't have idea where to upload)</Button>
      </div>
      <div className="grid w-full grid-cols-4 gap-4">
        <Image loading={loadingContain} src={contain} label="Image" />
      </div>
    </DocumentContainer>
  );
}

function Http() {
  const [data, setData] = useState<{ id: string; title: string } | null>(null);
  const fetchData = async () => {
    const response = await http.get<{ id: string; title: string }>("https://jsonplaceholder.typicode.com/posts/1");
    setData(response);
  };
  return (
    <DocumentContainer title="http" monospace>
      <p>
        The <Code>http</Code> function is a custom hook that provides a convenient way to make HTTP requests in a React application. It uses the <Code>fetch</Code> API to send HTTP requests and returns the response data in a promise.
      </p>

      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { http } from "@/utils/http";
          import { useState } from "react";

          export default function HttpComponent() {
            const [data, setData] = useState<{ id: string; title: string } | null>(null);

            const fetchData = async () => {
              const response = await http.get<{ id: string; title: string }>("https://example.com/api/data", { query: { id: "123" } });
              setData(response);
            };

            return (
              <div className="h-full w-full">
                <button onClick={fetchData}>Fetch Data</button>
                {data?.id && (
                  <div>
                    <p>ID: {data.id}</p>
                    <p>Title: {data.title}</p>
                  </div>
                )}
              </div>
            );
          }
        `}
      </Code>
      <Code allowCopy block>
        {`
          await http.get("https://example.com/api/data", { query: { id: "123" } });
        `}
      </Code>
      <p>Example Case :</p>
      <div className="flex h-full w-full flex-col items-start gap-4">
        <Button onClick={fetchData}>Fetch Data</Button>
        {data?.id && (
          <div>
            <p>ID: {data.id}</p>
            <p>Title: {data.title}</p>
          </div>
        )}
      </div>
    </DocumentContainer>
  );
}

function Slugify() {
  const [param, setParam] = useState("Hello World");
  return (
    <DocumentContainer title="slugify" monospace>
      <p>
        The <Code>slugify</Code> function converts a string into a slug, which is a URL-friendly version of the string. It replaces spaces with hyphens and removes special characters, making it suitable for use in URLs.
      </p>
      <p>Example Code :</p>
      <Code allowCopy block>
        {`
          import { slugify } from "@/utils/slugify";

          const param = "Hello World";
          const slug = slugify(param);
          console.log(slug); // hello-world
        `}
      </Code>
      <Code allowCopy block>
        {`
          slugify(param);
        `}
      </Code>
      <p>Example Case :</p>
      <InputText title="Param" value={param} onChange={(e) => setParam(() => e.target.value)} />
      Result : {slugify(param)}
    </DocumentContainer>
  );
}
