import NewlineText from "@/components/Newline";
import { useState } from "react";

type AccordionProps = {
  industry: string;
  industryExplanation?: string;
  industryExplanationFetching: boolean;
  industryExplanationLoading: boolean;
  isIndustryLoading: boolean;
};

export function Accordion(p: AccordionProps) {
  const {
    isIndustryLoading,
    industry,
    industryExplanation: data,
    industryExplanationFetching,
    industryExplanationLoading,
  } = p;
  const [isOpen, setIsOpen] = useState(true);

  const isLoading =
    isIndustryLoading ||
    industryExplanationFetching ||
    industryExplanationLoading;
  return (
    <div
      id="accordion-color"
      data-accordion="collapse"
      data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
    >
      <h2 id="accordion-color-heading-1">
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-800  ${
            isOpen
              ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
          data-accordion-target="#accordion-color-body-1"
          aria-expanded="true"
          aria-controls="accordion-color-body-1"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <span>
            Why I recommended <b>{industry}</b> industry for you?
          </span>

          <svg
            data-accordion-icon=""
            className={`w-3 h-3 ${isOpen ? "rotate-180" : ""} shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id="accordion-color-body-1"
        className={`bg-white ${isOpen ? "" : "hidden"}`}
        aria-labelledby="accordion-color-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {isLoading && <p>Loading...</p>}
          <div className=" mb-2 text-gray-500 dark:text-gray-400">
            {!isLoading && data && (
              <article className="prose max-w-none">
                <NewlineText text={data} />
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
