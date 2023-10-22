import InlineLoader from "@/components/InlineLoader";
import { ValidationSchema } from "@/redux/services/types";
import { ErrorMessage } from "@hookform/error-message";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type CareerAdvisorFormProps = {
  handleSubmit: UseFormHandleSubmit<ValidationSchema, undefined>;
  errors: FieldErrors<ValidationSchema>;
  register: UseFormRegister<ValidationSchema>;
  onSubmit: SubmitHandler<ValidationSchema>;
  industryLoading: boolean;
  industryFetching: boolean;
};

const CareerAdvisorForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  industryLoading,
  industryFetching,
}: CareerAdvisorFormProps) => {
  console.log("Loading", industryLoading);
  console.log("Fetching", industryFetching);
  const isLoading = industryLoading || industryFetching;
  return (
    <form className="mt-5 lg:mt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
        <div>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-1 text-gray-600"
            >
              Course of Study<small>*</small>
              {"  "}
            </label>
            <input
              className="py-3 px-4 block w-full xl:min-w-[18rem] border-gray-200 shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter your course of study"
              defaultValue="Accounting"
              {...register("course_of_study")}
            />
            <p className="text-sm font-body mt-1 font-extralight text-red-500/90">
              <ErrorMessage errors={errors} name="course_of_study" />
            </p>
          </div>
          <div className="mb-8">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-1 text-gray-600"
            >
              Other Career Interest
            </label>
            <input
              className="py-3 px-4 block w-full xl:min-w-[18rem] border-gray-200 shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Enter Your Career Interest"
              defaultValue="None"
              {...register("career_interest")}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 w-full sm:inline-flex">
        <button
          type="submit"
          className="inline-flex justify-center items-center gap-x-3 text-center disabled:bg-white  enabled:bg-blue-600 enabled:hover:bg-blue-700 enabled:border  disabled:border-2 disabled:border-blue-600 enabled:border-transparent text-sm lg:text-base enabled:text-white disabled:text-blue-600 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
          disabled={isLoading}
        >
          {isLoading ? "Advising..." : "Advise Me"}
          {!isLoading && (
            <svg
              className="w-2.5 h-2.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}

          {isLoading && (
            <span className="delay-300">
              <InlineLoader />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CareerAdvisorForm;
