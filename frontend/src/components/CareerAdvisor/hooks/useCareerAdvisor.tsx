import {
  useLazyGenerateDepartmentQuery,
  useLazyGenerateIndustryQuery,
  useLazyGenerateJobTitlesQuery,
} from "@/redux/services/career";
import { ValidationSchema, validationSchema } from "@/redux/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useCareerAdvisor = () => {
  const [
    generateIndustry,
    {
      isLoading: industryLoading,
      isFetching: industryFetching,
      isSuccess,
      error: industryError,
      data: industries,
    },
  ] = useLazyGenerateIndustryQuery();

  const [
    generateDepartments,
    {
      isLoading: departmentsLoading,
      isFetching: departmentsFetching,
      error: departmentsError,
      data: departments,
    },
  ] = useLazyGenerateDepartmentQuery();

  const [
    generateJobTitles,
    {
      isLoading: jobTitlesLoading,
      isFetching: jobTitlesFetching,
      error: jobTitlesError,
      data: jobTitles,
    },
  ] = useLazyGenerateJobTitlesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });

  const [courseOfStudy, setCourseOfStudy] = useState<string | undefined>(
    undefined
  );
  const [careerInterest, setCareerInterest] = useState<string | undefined>(
    undefined
  );

  // Uplift selected industry to here
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const [selectedDepartment, setSelectedDepartment] = useState(0);

  const fetchDepartmentAndJobTitles = async ({
    selectedIndustry,
    selectedDepartment,
    industries,
    course_of_study,
    career_interest,
  }: {
    selectedIndustry: number;
    selectedDepartment: number;
    industries: string[];
    course_of_study: string;
    career_interest?: string;
  }) => {
    try {
      const departmentResult = await generateDepartments({
        course_of_study: course_of_study,
        career_interest: career_interest ?? "None",
        industry: industries[selectedIndustry],
      }).unwrap();
      if (departmentResult) {
        generateJobTitles({
          course_of_study: course_of_study,
          career_interest: career_interest ?? "None",
          industry: industries[selectedIndustry],
          department: departmentResult[selectedDepartment],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setSelectedIndustry(0);
    setSelectedDepartment(0);
    setCareerInterest(data.career_interest);
    setCourseOfStudy(data.course_of_study);
    const industryResult = await generateIndustry(data).unwrap();

    if (industryResult) {
      await fetchDepartmentAndJobTitles({
        selectedDepartment: 0,
        selectedIndustry: 0,
        industries: industryResult,
        course_of_study: data.course_of_study,
        career_interest: data.career_interest,
      });
    }
  };

  // Function to handle industry change
  const handleIndustryChange = async (newIndustryIndex: number) => {
    // Update the selected industry
    setSelectedIndustry(newIndustryIndex);
    setSelectedDepartment(0);

    if (industries && courseOfStudy) {
      await fetchDepartmentAndJobTitles({
        selectedDepartment: 0,
        selectedIndustry: newIndustryIndex,
        industries: industries,
        course_of_study: courseOfStudy,
        career_interest: careerInterest,
      });
    }
  };

  // Function to handle industry change
  const handleDepartmentChange = async (newDepartmentIndex: number) => {
    // Update the selected industry
    setSelectedDepartment(newDepartmentIndex);
    // Fetch the departments for the newly selected industry
    if (industries && departments && courseOfStudy) {
      generateJobTitles({
        course_of_study: courseOfStudy,
        career_interest: careerInterest ?? "None",
        industry: industries[selectedIndustry],
        department: departments[newDepartmentIndex],
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    formErrors,
    isSuccess,
    industryError,
    industryLoading,
    industryFetching,
    industries,
    selectedIndustry,
    handleIndustryChange,
    departments,
    departmentsLoading,
    departmentsFetching,
    departmentsError,
    selectedDepartment,
    handleDepartmentChange,
    jobTitlesFetching,
    jobTitlesLoading,
    jobTitlesError,
    jobTitles,
  };
};
