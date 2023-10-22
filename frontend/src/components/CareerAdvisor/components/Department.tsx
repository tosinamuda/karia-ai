import { ButtonSkeleton, ErrorAlert } from "@/components/CareerAdvisor/components";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type DepartmentProps = {
  errors?: FetchBaseQueryError | SerializedError;
  isIndustryLoading: boolean;
  isLoading: boolean;
  isFetching: boolean;
  departments?: string[];
  selectedDepartment: number;
  handleDepartmentChange: (newDepartmentIndex: number) => void;
};

export const Department = ({
  errors,
  isLoading,
  isFetching,
  departments,
  selectedDepartment,
  isIndustryLoading,
  handleDepartmentChange,
}: DepartmentProps) => {
  return (
    <>
      {errors && <ErrorAlert />}
      {(isIndustryLoading || isLoading || isFetching) && (
        <div className="py-1 px-3">
          <ButtonSkeleton />
        </div>
      )}
      {!(isIndustryLoading || isLoading || isFetching) &&
        departments?.map((dept, index) => (
          <button
            key={dept}
            className="rounded-full enabled:bg-gray-100 disabled:bg-blue-600 border-2 enabled:border-blue-400 disabled:border-blue-600 disabled:text-white enabled:text-blue-700 enabled:hover:border-gray-300 enabled:hover:bg-gray-300 text-xs font-semibold shadow-sm py-1 px-2 mx-3 my-2"
            onClick={() => handleDepartmentChange(index)}
            disabled={selectedDepartment == index}
          >
            {dept}
          </button>
        ))}
    </>
  );
};
