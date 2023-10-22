import AppConfig from '@/utils/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CareerAdvisor, CareerInIndustry, CareerWithDepartment, CareerWithJobTitle } from './types'



// Define a service using a base URL and expected endpoints
export const careerAdvisorApi = createApi({
  reducerPath: 'promptApi',
  baseQuery: fetchBaseQuery({ baseUrl: AppConfig.BASE_URL }),
  keepUnusedDataFor: 300,
  tagTypes: ["Industries", "ExplainIndustries", "Department", "ExplainDepartment", "Role", "ExplainRole"],
  endpoints: (builder) => ({
    generateIndustry: builder.query<string[], CareerAdvisor>({
      query: ({ ...career }: CareerAdvisor) => ({
        url: 'prompt/industry',
        params: career
      }),
      transformResponse: (response: { data: string[] }) => response.data,
      providesTags: ["Industries"]
    }),
    explainIndustryChoice: builder.query<string, CareerInIndustry>({
      query: ({ ...career }: CareerInIndustry) => ({
        url: 'prompt/explain/industry',
        params: career
      }),
      transformResponse: (response: { data: string }) => response.data,
      providesTags: ["ExplainIndustries"]
    }),
    generateDepartment: builder.query<string[], CareerInIndustry>({
      query: ({ ...career }: CareerInIndustry) => ({
        url: 'prompt/department',
        params: career
      }),
      transformResponse: (response: { data: string[] }) => response.data,
      providesTags: ["Department"]
    }),
    explainDepartmentChoice: builder.query<string, CareerWithDepartment>({
      query: ({ ...career }: CareerWithDepartment) => ({
        url: 'prompt/explain/department',
        params: career
      }),
      transformResponse: (response: { data: string }) => response.data,
      providesTags: ["ExplainDepartment"]
    }),
    generateJobTitles: builder.query<string[], CareerWithDepartment>({
      query: ({ ...career }: CareerWithDepartment) => ({
        url: 'prompt/role',
        params: career
      }),
      transformResponse: (response: { data: string[] }) => response.data,
      providesTags: ["Role"]
    }),
    explainJobTitleChoice: builder.query<string, CareerWithJobTitle>({
      query: ({ ...career }: CareerWithJobTitle) => ({
        url: 'prompt/explain/role',
        params: career
      }),
      transformResponse: (response: { data: string }) => response.data,
      providesTags: ["ExplainRole"]
    }),

  }),
})


export const {
  useGenerateIndustryQuery,
  useLazyGenerateIndustryQuery,

  useExplainIndustryChoiceQuery,
  useLazyExplainIndustryChoiceQuery,

  useGenerateDepartmentQuery,
  useLazyGenerateDepartmentQuery,

  useExplainDepartmentChoiceQuery,
  useLazyExplainDepartmentChoiceQuery,

  useGenerateJobTitlesQuery,
  useLazyGenerateJobTitlesQuery,

  useExplainJobTitleChoiceQuery,
  useLazyExplainJobTitleChoiceQuery
} = careerAdvisorApi
