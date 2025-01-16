"use client";

import { UsersResponse } from "@/app/api/v1/users/route";
import Button from "@/components/base/Button";
import Code from "@/components/base/Code";
import DocumentContainer from "@/components/layout/Documentation/DocumentContainer";
import InputFile from "@/components/base/Input/InputFile";
import InputText from "@/components/base/Input/InputText";
import Skeleton from "@/components/base/Skeleton";
import Type from "@/components/base/Type";
import Documentation from "@/components/layout/Documentation";
import { useHttp } from "@/hooks/http/useHttp";
import { useLoadingBar } from "@/hooks/loading-bar/useLoadingBar";
import { useLoadingPage } from "@/hooks/loading-page/useLoadingPage";
import { useSnackbar } from "@/hooks/snackbar/useSnackbar";
import { useState } from "react";

export default function Hooks() {
  const titles = [
    //
    "useHttp",
    "useLoadingBar",
    "useLoadingPage",
    "useSnackbar",
  ];
  return (
    <>
      <Documentation titles={titles}>
        <UseHttp />
        <UseLoadingBar />
        <UseLoadingPage />
        <UseSnackbar />
      </Documentation>
    </>
  );
}

function UseHttp() {
  const http = useHttp();

  const [data, setData] = useState<UsersResponse[]>([]);

  const getData = () => {
    http.get<UsersResponse[]>("/v1/users").then((response) => {
      setData(response.data);
    });
  };

  return (
    <DocumentContainer title="useHttp" monospace>
      <div>
        The <Code>useHttp</Code> custom hook is a utility for making HTTP requests with optional features like loading indicators, error notifications, and automatic redirection when unauthorized access occurs.
      </div>
      <div className="flex flex-col gap-4">
        <p> Here’s a breakdown of each part:</p>
        <p className="text-bold">1. {`HttpResponse<T>`} Interface</p>
        <p>Defines the shape of an expected HTTP response: </p>
        <p>
          <Type>data</Type> : Holds the response data of type T.
        </p>
        <p>
          <Type>message</Type> : Status message (e.g., "Success").
        </p>
        <p>
          <Type>statusCode</Type> : HTTP status code.
        </p>
        <p className="text-bold">2. Parameters</p>
        <p>
          <Type>isUseLoadingBar</Type> : Controls whether a loading bar is displayed during the HTTP request. If true, the loading bar starts when the request begins and ends once the response is received.
        </p>
        <p>
          <Type>isUseSnackbar</Type> : Determines whether an error message is shown via a snackbar when a request fails. If true, the snackbar will display an error message if the request encounters an error.
        </p>
        <p>
          <Type>isRedirectUnauthorized</Type> : Specifies whether the app should redirect to the login page if a request returns a 401 Unauthorized error. If true, the user is redirected to "/auth/sign-in" and the profile state is reset to null on a 401 error.
        </p>
        <p>
          <Type>redirectUrl</Type> : Specifies the URL to redirect to when a 401 Unauthorized error occurs.
        </p>
        <p className="text-bold">3. HTTP Methods (get, post, put, delete)</p>
        Each HTTP method is a memoized function that uses withLoading to execute the HTTP request and apply consistent error handling and loading behavior. Example Usage:
        <p>
          <Type>get</Type> : Executes a GET request by calling http.get with url and optional config.
        </p>
        <p>
          <Type>post</Type> : Executes a POST request with url, body, and optional config.
        </p>
        <p>
          <Type>put</Type> : Executes a PUT request with url, body, and optional config.
        </p>
        <p>
          <Type>delete</Type> : Executes a DELETE request with url and optional config.
        </p>
      </div>
      <p>Example Code:</p>
      <p>Http GET</p>
      <Code allowCopy block>
        {`
          import { useHttp } from "@/hooks/http/useHttp";

          export default function HttpGet() {
            const http = useHttp();

            const handleGet = async () => {
              const response = await http.get("/v1/product/list");
              console.log(response.data);
            };

            return (
              <button onClick={handleGet}>Get</button>
            );
          }
        `}
      </Code>
      <Code block allowCopy>
        {`
          const http = useHttp();
        `}
      </Code>
      <Code block allowCopy>
        {`
          const http = useHttp({ isUseLoadingBar: true, isUseSnackbar: true, isRedirectUnauthorized: true, redirectUrl: "/auth/sign-in" });
        `}
      </Code>
      <Code block allowCopy>
        {`
          const response = await http.get("/v1/product/list", { query: { page: 1, limit: 10 } });
        `}
      </Code>
      <Code block allowCopy>
        {`
          const response = await http.post("/v1/product/create", { id: 1, name: "Product 1" });
        `}
      </Code>
      <Code block allowCopy>
        {`
          const response = await http.put("/v1/product/update", { id: 1, name: "Product Update 1" });
        `}
      </Code>
      <Code block allowCopy>
        {`
          const response = await http.delete("/v1/product/delete", { id: 1 });
        `}
      </Code>
      <p>Example Case:</p>
      <div className="flex gap-4">
        <Button onClick={getData}>GET </Button>
        <Button variant="primary-outline" onClick={() => setData(() => [])}>
          Reset
        </Button>
      </div>
      {data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.id} - {item.name}
            </li>
          ))}
        </ul>
      )}
    </DocumentContainer>
  );
}

function UseLoadingBar() {
  const loadingBar = useLoadingBar();

  const getData = async () => {
    loadingBar.start(); // Start loading bar
    try {
      // Simulate an async action, like a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      loadingBar.end(); // End loading bar after action completes
    }
  };

  const stopLoadingBar = () => {
    loadingBar.end();
  };

  return (
    <DocumentContainer title="useLoadingBar" monospace>
      <div>
        The <Code>useLoadingBar</Code> is designed to make it easy to show a loading bar at the top of the app during actions like loading data or submitting forms. Here's how it works and how to use it.
      </div>
      <div className="flex flex-col gap-4">
        <ul>
          <li>
            <Type>start</Type> : Begins or resumes the loading bar, creating the visual effect of progress.
          </li>
          <li>
            <Type>end</Type> : Completes the loading bar, hiding it from the screen.
          </li>
        </ul>
      </div>
      <p>Example Code:</p>
      <p>Http GET</p>
      <Code allowCopy block>
        {`
          import { useLoadingBar } from "@/hooks/loading-bar/useLoadingBar";

          export default function ExampleComponent() {
            const loadingBar = useLoadingBar();

            const fetchData = async () => {
              loadingBar.start();  // Start loading bar
              try {
                // Simulate an async action, like a network request
                await new Promise((resolve) => setTimeout(resolve, 2000));
              } finally {
                loadingBar.end();  // End loading bar after action completes
              }
            };

            return <button onClick={fetchData}>Fetch Data</button>;
          }
        `}
      </Code>
      <Code block allowCopy>
        {`
          const loadingBar = useLoadingBar();
        `}
      </Code>
      <p>Example Case:</p>
      <div className="flex gap-4">
        <Button onClick={getData}>Example Loading Bar</Button>
        <Button onClick={stopLoadingBar}>Ends it here</Button>
      </div>
    </DocumentContainer>
  );
}

function UseLoadingPage() {
  const loadingPage = useLoadingPage();

  const loading1 = async () => {
    loadingPage.start(); // Start loading bar
    try {
      // Simulate an async action, like a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      loadingPage.end(); // End loading bar after action completes
    }
  };

  const loading2 = async () => {
    loadingPage.start("Custom Message, 2 second wait"); // Start loading bar
    try {
      // Simulate an async action, like a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      loadingPage.end(); // End loading bar after action completes
    }
  };

  const loading3 = async () => {
    loadingPage.start(
      <div className="rounded-lg bg-primary-700 p-4 text-white">
        Loading Here <br />
        <span onClick={() => loadingPage.end()} className="cursor-pointer text-secondary-200">
          End here
        </span>
      </div>,
    ); // Start loading bar
    try {
      // Simulate an async action, like a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      loadingPage.end(); // End loading bar after action completes
    }
  };

  return (
    <DocumentContainer title="useLoadingPage" monospace>
      <div>
        The <Code>loadingPage</Code> provides a customizable full-page loading overlay that you can trigger from any component within your app. It uses React Context to expose two main actions: start and end, which show and hide the loading overlay respectively.
      </div>
      <div className="flex flex-col gap-4">
        <ul>
          <li>
            <Type>start(customChildren?: React.ReactNode)</Type> : Displays the loading overlay and optionally shows customChildren as the content.
          </li>
          <li>
            <Type>end</Type> : Hides the loading overlay and resets any custom content back to the default "Loading..." message.
          </li>
        </ul>
      </div>
      <p>Example Code:</p>
      <p>Http GET</p>
      <Code allowCopy block>
        {`
          import { useLoadingPage } from "@/hooks/loading-page/useLoadingPage";

          export default function ExampleComponent() {
            const loadingPage = useLoadingPage();

            const fetchData = async () => {
              loadingPage.start();  // Start loading bar
              try {
                // Simulate an async action, like a network request
                await new Promise((resolve) => setTimeout(resolve, 2000));
              } finally {
                loadingPage.end();  // End loading bar after action completes
              }
            };

            return <button onClick={fetchData}>Fetch Data</button>;
          }
        `}
      </Code>
      <Code block allowCopy>
        {`
          const loadingPage = useLoadingPage();
        `}
      </Code>
      <p>Example Case:</p>
      <div className="flex gap-4">
        <Button onClick={loading1}>Loading Page</Button>
        <Button onClick={loading2}>Custom Message</Button>
        <Button onClick={loading3}>Custom with HTML</Button>
      </div>
    </DocumentContainer>
  );
}

function UseSnackbar() {
  const snackbar = useSnackbar();

  const success = async () => {
    snackbar.start("Message Success", "success"); // Start loading bar
  };

  const danger = async () => {
    snackbar.start("Message Error", "error"); // Start loading bar
  };

  return (
    <DocumentContainer title="useSnackbar" monospace>
      <div>
        The <Code>useSnackbar</Code> sets up a custom Snackbar notification system for React applications using the notistack library, which enables stackable snackbars (toasts) with customizable styles and durations.
      </div>
      <div className="flex flex-col gap-4">
        <ul>
          <li>
            <Type>start</Type> : Show a new snackbar with a given message, type, and duration.
          </li>
        </ul>
      </div>
      <p>Example Code:</p>
      <p>Http GET</p>
      <Code allowCopy block>
        {`
          import { useSnackbar } from "@/hooks/snackbar/useSnackbar";

          export default function ExampleComponent() {
            const snackbar = useSnackbar();

            const snakcbarStart = async () => {
              snackbar.start("Message here...", "success");
            };

            return <button onClick={snakcbarStart}>Fetch Data</button>;
          }
        `}
      </Code>
      <Code block allowCopy>
        {`
          const snackbar = useSnackbar();
        `}
      </Code>
      <p>Example Case:</p>
      <div className="flex gap-4">
        <Button variant="success" onClick={success}>
          Success Snackbar
        </Button>
        <Button variant="danger" onClick={danger}>
          Error Snackbar
        </Button>
      </div>
    </DocumentContainer>
  );
}
