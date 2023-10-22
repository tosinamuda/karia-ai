from typing import List

from app.models import CareerAdvisor, CareerWithDepartment, CareerWithIndustry
from llmkit.models import Message, RoleEnum
from llmkit.transformers import PromptTransformer

SYSTEM_PROMPT = (
    "You are a career advisor helping Nigerian students explore potential"
    " career opportunities based on their course of study and career interests."
)


class IndustryPromptTransformer(PromptTransformer[CareerAdvisor]):
    """
    Class to transform Career Interest and Course of Study to Prompt
    """

    def format(self, input_data: CareerAdvisor) -> List[Message]:
        input_data.career_interest = (
            input_data.career_interest if input_data.career_interest else "None"
        )

        user_prompt = f"""I am a {input_data.course_of_study} major and I have {input_data.career_interest} other career interests.
        I am curious about industry where I can work in the future given my background and interest.
        Please provide a list of {input_data.limit} Nigeria-based industries  names without descriptions, disclaimers, or numbering."""
        assistant_prompt = (
            f"Sure, here are {input_data.limit} industries in Nigeria that can"
            " offer potential job opportunities for a"
            f" {input_data.course_of_study} major with"
            f" {input_data.career_interest} other career interest: "
        )

        # organize prompt into a List serially, - system, user and assistant
        messages = [
            Message(role=RoleEnum.system, content=SYSTEM_PROMPT).model_dump(),
            Message(role=RoleEnum.user, content=user_prompt).model_dump(),
            Message(
                role=RoleEnum.assistant, content=assistant_prompt
            ).model_dump(),
        ]

        print(messages)

        return messages


class DepartmentPromptTransformer(PromptTransformer[CareerWithIndustry]):
    """
    Class to transform Career Interest and Course of Study to Prompt
    """

    def format(self, input_data: CareerWithIndustry) -> List[Message]:
        input_data.career_interest = (
            input_data.career_interest if input_data.career_interest else "None"
        )

        user_prompt = f"""I am {input_data.course_of_study} student with  {input_data.career_interest} other career interest.
        I am curious about the {input_data.industry} industry in Nigeria and would like to know specific department or business unit names within companies in this industry that could offer them potential job opportunities.
        Task: Please provide a list of 3 department or business unit names without descriptions, disclaimers, or numbering."""
        assistant_prompt = (
            f"Sure, within companies in the {input_data.industry} industry, "
            " here are 3 department/business units where you ca potentially"
            f" work as a  {input_data.course_of_study} major with"
            f" {input_data.career_interest} other career interest: "
        )

        # organize prompt into a List serially, - system, user and assistant
        messages = [
            Message(role=RoleEnum.system, content=SYSTEM_PROMPT).model_dump(),
            Message(role=RoleEnum.user, content=user_prompt).model_dump(),
            Message(
                role=RoleEnum.assistant, content=assistant_prompt
            ).model_dump(),
        ]

        print(messages)

        return messages


class JobTitlePromptTransformer(PromptTransformer[CareerWithDepartment]):
    """
    Class to transform Career Interest and Course of Study to Prompt
    """

    def format(self, input_data: CareerWithDepartment) -> List[Message]:
        input_data.career_interest = (
            input_data.career_interest if input_data.career_interest else "None"
        )

        user_prompt = f"""I am {input_data.course_of_study} student with  {input_data.career_interest} other career interest.
        You recommended {input_data.department} Department/Business Units of companies within the {input_data.industry} industry as an Nigerian industry that can offer me potential job opportunities. Now I will like to know the future roles/job titles I can function within the department.
        Task: Please provide a list of 3 potential future job titles or roles, I can get in the future in the the {input_data.department} Department/Business Unit of companies within the {input_data.industry} industry without descriptions, disclaimers, or numbering.
        mention only industry name, don't add description and don't number your list."""
        assistant_prompt = (
            "Sure, here are 3 potential future job titles or roles you can get"
            f" in the future in the {input_data.department} Department/Business"
            f" Unit of companies within the {input_data.industry} industry in"
            " Nigeria given your background as"
            f" {input_data.course_of_study} and"
            f" {input_data.career_interest} interest: "
        )

        # organize prompt into a List serially, - system, user and assistant
        messages = [
            Message(role=RoleEnum.system, content=SYSTEM_PROMPT).model_dump(),
            Message(role=RoleEnum.user, content=user_prompt).model_dump(),
            Message(
                role=RoleEnum.assistant, content=assistant_prompt
            ).model_dump(),
        ]

        return messages
