export default function Home() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <section className="dark:bg-gray-900 bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <h1 className="text-4xl text-gray-900 md:text-5xl lg:text-6xl mb-4 font-extrabold leading-none tracking-tight dark:text-white">Coming Soon</h1>
          <p className="text-lg text-gray-500 lg:text-xl dark:text-gray-400 mb-8 font-normal sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="text-base bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-900 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center font-medium text-white focus:ring-4">
              Get started
              <svg className="ms-2 h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
            <a href="#" className="text-sm text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg border bg-white px-5 py-3 font-medium focus:z-10 focus:outline-none focus:ring-4 sm:ms-4 dark:hover:text-white">
              Learn more
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
