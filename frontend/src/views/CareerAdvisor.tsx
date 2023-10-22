import {
  CareerAdvisorForm,
  CareerAdvisorOutput,
} from "../components/CareerAdvisor/components";
import { useCareerAdvisor } from "../components/CareerAdvisor/hooks/useCareerAdvisor";

const CareerAdvisorView = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    formErrors,
    industryLoading,
    industryFetching,
    isSuccess,
    industryError,
    industries,
    departments,
    departmentsLoading,
    departmentsFetching,
    selectedIndustry,
    selectedDepartment,
    handleIndustryChange,
    handleDepartmentChange,
    jobTitles,
    jobTitlesFetching,
    jobTitlesLoading,
    departmentsError,
    jobTitlesError,
  } = useCareerAdvisor();

  const careerAdvisorOutputProps = {
    industryLoading,
    industryFetching,
    isSuccess,
    industryError,
    departmentsError,
    jobTitlesError,
    industries: industryLoading ? undefined : industries,
    departments,
    departmentsLoading,
    departmentsFetching,
    selectedIndustry: selectedIndustry,
    selectedDepartment: selectedDepartment,
    handleIndustryChange,
    handleDepartmentChange,
    jobTitles,
    jobTitlesFetching,
    jobTitlesLoading,
  };

  return (
    <section className="bg-white ">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 mt-8 ">
          <div className="lg:col-span-3">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
              Discover your career options
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">
              Explore career paths aligned with your Field of Study or
              Interests.
            </p>

            <CareerAdvisorForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={formErrors}
              industryLoading={industryLoading}
              industryFetching={industryFetching}
            />
          </div>

          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <div className="w-full rounded-xl bg-slate-100 min-h-full ">
              <CareerAdvisorOutput {...careerAdvisorOutputProps} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerAdvisorView;
