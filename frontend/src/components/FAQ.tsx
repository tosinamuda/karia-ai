import React, { useMemo, useState } from "react";

type AccordionItemProps = {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};
function AccordionItem(p: AccordionItemProps) {
  return (
    <>
      <div className="py-8 first:pt-0 last:pb-0">
        <div className="flex gap-x-5">
          <svg
            className="flex-shrink-0 mt-1 w-6 h-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
          </svg>

          <div>
            <h3 className="md:text-lg font-semibold text-gray-800 dark:text-gray-200">
              {p.title}
            </h3>
            <p className="mt-1 text-gray-500">{p.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

const accordionItemsData = [
  {
    title: "What is Karia.ai?",
    content:
      "Karia.ai is a platform designed to assist students and young professionals in exploring career options by inputting their course of study and career interests.",
    isOpen: true,
  },
  {
    title: "How does Karia.ai work?",
    content:
      "Karia.ai uses carefully crafted prompts that incorporate your course of study and any career interests you have to interact with the LLM (Llama-2-7b model) and provide recommendations for industries, departments, and job roles you can pursue.",
    isOpen: true,
  },
  {
    title:
      "What kind of information do I need to provide to get recommendations on Karia.ai?",
    content:
      "You need to enter your current course of study and any career interests you have. The more accurate and detailed the information, the better the recommendations you'll receive.",
    isOpen: true,
  },
  {
    title: "How accurate are the recommendations provided by Karia.ai?",
    content:
      "While you will receive valuable recommendations most of the time, it's important to note that Karia.ai relies on an AI model which may occasionally generate inaccurate response.",
    isOpen: true,
  },
];

const FAQ = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const faqs = useMemo(() => accordionItemsData, []);

  return (
    <>
      <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto my-16 bg-blue-100/60 rounded-sm">
        <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            You might be wondering...
          </h2>
        </div>

        <div className="max-w-2xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((f, index) => (
            <AccordionItem
              key={f.title}
              title={f.title}
              content={f.content}
              isOpen={f.isOpen}
              onClick={() => setSelectedItem(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
