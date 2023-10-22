from typing import List

from app.models import (
    CareerWithDepartment,
    CareerWithIndustry,
    CareerWithJobTitle,
)
from llmkit.models import Message, RoleEnum
from llmkit.transformers import PromptTransformer

SYSTEM_PROMPT = (
    "You are Nigerian based Student Career Advisor that student ask"
    " advice on their career interest and roadmap"
)


class ExplainIndustryPromptTransformer(PromptTransformer[CareerWithIndustry]):
    """
    Class to format prompt for explaining industry choice
    """

    def format(self, input_data: CareerWithIndustry) -> List[Message]:
        input_data.career_interest = (
            input_data.career_interest if input_data.career_interest else "None"
        )

        user_prompt = f"""I am a {input_data.course_of_study} major and I have career interest in {input_data.career_interest}.
        You recommended {input_data.industry} as an industry in Nigeria that can offer me potential job opportunities.
        Give a short explanation of why you think {input_data.industry} is a good fit for my {input_data.course_of_study} major and {input_data.career_interest} interest.
        """
        assistant_prompt = (
            f"Sure, I recommended {input_data.industry} as an industry in"
            " Nigeria that can offer you potential job opportunities given"
            f" your {input_data.course_of_study} major and"
            f" {input_data.career_interest} interest. This is the reason why I"
            f" think the {input_data.industry} industry is a good fit for you:"
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


class ExplainDepartmentPromptTransformer(
    PromptTransformer[CareerWithDepartment]
):
    """
    Class to format prompt for explaining department choice
    """

    def format(self, input_data: CareerWithDepartment) -> List[Message]:
        input_data.career_interest = (
            input_data.career_interest if input_data.career_interest else "None"
        )

        user_prompt = f"""I am a {input_data.course_of_study} major and I have career interest in {input_data.career_interest}.
        You recommended {input_data.department} department/business unit in companies within {input_data.industry} industry in Nigeria as department or business unit that can offer me potential job opportunities.
        Give a short explanation of why you think {input_data.department} within {input_data.industry} is a good fit for my {input_data.course_of_study} major and {input_data.career_interest} interest.
        """
        assistant_prompt = (
            f"Sure, I recommended {input_data.department} department in"
            f" companies  within {input_data.industry}  industry in Nigeria"
            " that can offer you potential job opportunities given your"
            f" {input_data.course_of_study} major and"
            f" {input_data.career_interest} interest. This is the reason why I"
            f" think the {input_data.department} department is a good fit for"
            " you:"
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


class ExplainJobTitlePromptTransformer(PromptTransformer[CareerWithJobTitle]):
    """
    Class to format prompt for explaining job title choice
    """

    def format(self, input_data: CareerWithJobTitle) -> List[Message]:
        input_data.career_interest = (
            input_data.career_interest if input_data.career_interest else "None"
        )

        user_prompt = f"""I am a {input_data.course_of_study} major and I have career interest in {input_data.career_interest}.
        You recommended {input_data.job_title} job role in {input_data.department} department in companies within {input_data.industry} industry in Nigeria  as potential role I can function in the future.
        Give a short explanation of why you think {input_data.job_title} job role in {input_data.department} department in companies within {input_data.industry} industry in Nigeria is potential role I can get in the future as a {input_data.course_of_study} major and {input_data.career_interest} interest.
        """
        assistant_prompt = (
            f"Sure, I recommended {input_data.job_title} job role in"
            f" {input_data.department} department in companies within"
            f" {input_data.industry} industry in Nigeria as a  potential job"
            " role you can function in the future given your"
            f" {input_data.course_of_study} major and"
            f" {input_data.career_interest} interest. This is the reason why I"
            f" think the {input_data.job_title} matches your background and"
            " interest:"
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
