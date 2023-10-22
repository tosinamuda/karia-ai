import { CareerBase } from "@/redux/services/types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ButtonSkeleton, ErrorAlert } from ".";
import { Department } from "./Department";

type CareerAdvisorOuptutProps = Partial<CareerBase> & {
  industryError?: FetchBaseQueryError | SerializedError;
  departmentsError?: FetchBaseQueryError | SerializedError;
  jobTitlesError?: FetchBaseQueryError | SerializedError;
  industryLoading: boolean;
  industryFetching: boolean;
  departmentsLoading: boolean;
  departmentsFetching: boolean;
  isSuccess: boolean;
  industries?: string[];
  departments?: string[];
  selectedIndustry: number;
  selectedDepartment: number;
  handleIndustryChange: (newIndustryIndex: number) => void;
  handleDepartmentChange: (newDepartmentIndex: number) => void;
  jobTitles?: string[];
  jobTitlesFetching: boolean;
  jobTitlesLoading: boolean;
};

const CareerAdvisorOutput = ({
  industryError,
  industryLoading,
  industryFetching,
  departmentsLoading,
  departmentsFetching,
  industries,
  selectedIndustry,
  departments,
  selectedDepartment,
  handleIndustryChange,
  jobTitles,
  jobTitlesFetching,
  jobTitlesLoading,
  handleDepartmentChange,
  departmentsError,
  jobTitlesError,
}: CareerAdvisorOuptutProps) => {
  const isIndustryLoading = industryLoading || industryFetching;
  const openLinkedin = (jobTitle) => {
    const jobTitleEncoded = encodeURIComponent(jobTitle); // encode the jobTitle parameter

    const url = `https://www.linkedin.com/jobs/search/?keywords=${jobTitleEncoded}&location=Nigeria&refresh=true`;

    window.open(url, "_blank");
  };
  return (
    <div className="py-4 px-4">
      <div className="py-2 px-3 font-semibold">Industries</div>
      {industryError && <ErrorAlert />}
      {isIndustryLoading && (
        <div className="py-1 px-3">
          <ButtonSkeleton />
        </div>
      )}
      {!isIndustryLoading &&
        industries?.map((industry, index) => (
          <button
            key={industry}
            className="transition-opacity ease-in duration-1000 opacity-100 rounded-full enabled:bg-gray-100 disabled:bg-blue-600 border-2 enabled:border-blue-400 disabled:border-blue-600 disabled:text-white enabled:text-blue-700 enabled:hover:border-gray-300 enabled:hover:bg-gray-300 text-xs font-semibold shadow-sm py-1 px-2 mx-3 my-2"
            onClick={() => handleIndustryChange(index)}
            disabled={selectedIndustry == index}
          >
            {industry}
          </button>
        ))}
      <hr className="my-8" />

      <div className="mt-8 py-2 px-3 font-semibold">
        {industries && (
          <>Relevant Units in Companies within {industries[selectedIndustry]}</>
        )}
        {!industries && <>Relevant Units in Companies</>}
      </div>
      <Department
        errors={departmentsError}
        isIndustryLoading={isIndustryLoading}
        isLoading={departmentsLoading}
        isFetching={departmentsFetching}
        departments={departments}
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
      />
      <hr className="my-8" />

      <div className="mt-4 py-2 px-3 font-semibold">
        Potential Job Roles within {departments?.[selectedDepartment]}
      </div>
      {jobTitlesError && <ErrorAlert />}
      {(isIndustryLoading ||
        departmentsLoading ||
        departmentsFetching ||
        jobTitlesFetching ||
        jobTitlesLoading) && (
        <div className="py-1 px-3">
          <ButtonSkeleton />
        </div>
      )}
      {!isIndustryLoading &&
        !departmentsLoading &&
        !departmentsFetching &&
        !jobTitlesFetching &&
        !jobTitlesLoading &&
        jobTitles?.map((jobTitle) => (
          <button
            key={jobTitle}
            className="transition duration-300 rounded-full bg-gray-100 border-2 border-blue-400 text-blue-700 hover:border-gray-300 hover:bg-gray-300 text-xs font-semibold shadow-sm py-1 px-2 mx-3 my-2"
            onClick={() => openLinkedin(jobTitle)}
          >
            {jobTitle}
          </button>
        ))}

      <hr className="my-8" />
    </div>
  );
};
export default CareerAdvisorOutput;
