from functools import lru_cache

from app.models import (
    CareerAdvisor,
    CareerWithDepartment,
    CareerWithIndustry,
    CareerWithJobTitle,
)
from app.transformers import (
    DepartmentPromptTransformer,
    ExplainDepartmentPromptTransformer,
    ExplainIndustryPromptTransformer,
    ExplainJobTitlePromptTransformer,
    IndustryPromptTransformer,
    JobTitlePromptTransformer,
)
from llmkit import LLMKit
from llmkit.transformers import (
    DefaultGeneratedTextTransformer,
    EnumeratedListTransformer,
)


@lru_cache(maxsize=10)
def generate_industries(
    career: CareerAdvisor, model_provider: str = "cloudflare"
):
    """
    Generate Industries
    """
    app = LLMKit()

    # Generate the text, and transform to expected data
    output = app.generate_data(
        input_data=career,
        prompt_transformer=IndustryPromptTransformer(),
        response_transformer=EnumeratedListTransformer(),
        llm_model_provider_name=model_provider,
    )

    return output


@lru_cache(maxsize=10)
def explain_industry_choice(
    career: CareerWithIndustry, model_provider: str = "cloudflare"
):
    """
    Generate Industries
    """
    app = LLMKit()

    # Generate the text, and transform to expected data
    output = app.generate_data(
        input_data=career,
        prompt_transformer=ExplainIndustryPromptTransformer(),
        response_transformer=DefaultGeneratedTextTransformer(),
        llm_model_provider_name=model_provider,
    )

    return output


@lru_cache(maxsize=10)
def generate_departments(
    career: CareerWithIndustry, model_provider: str = "cloudflare"
):
    """
    Generate Departments
    """
    app = LLMKit()

    # Generate the text, and transform to expected data
    output = app.generate_data(
        input_data=career,
        prompt_transformer=DepartmentPromptTransformer(),
        response_transformer=EnumeratedListTransformer(),
        llm_model_provider_name=model_provider,
    )

    return output


@lru_cache(maxsize=10)
def explain_department_choice(
    career: CareerWithDepartment, model_provider: str = "cloudflare"
):
    """
    Generate Departments
    """
    app = LLMKit()

    # Generate the text, and transform to expected data
    output = app.generate_data(
        input_data=career,
        prompt_transformer=ExplainDepartmentPromptTransformer(),
        response_transformer=DefaultGeneratedTextTransformer(),
        llm_model_provider_name=model_provider,
    )

    return output


@lru_cache(maxsize=10)
def generate_roles(
    career: CareerWithDepartment, model_provider: str = "cloudflare"
):
    """
    Generate Departments
    """
    app = LLMKit()

    # Generate the text, and transform to expected data
    output = app.generate_data(
        input_data=career,
        prompt_transformer=JobTitlePromptTransformer(),
        response_transformer=EnumeratedListTransformer(),
        llm_model_provider_name=model_provider,
    )

    return output


@lru_cache(maxsize=10)
def explain_job_title_choice(
    career: CareerWithJobTitle, model_provider: str = "cloudflare"
):
    """
    Generate Departments
    """
    app = LLMKit()

    # Generate the text, and transform to expected data
    output = app.generate_data(
        input_data=career,
        prompt_transformer=ExplainJobTitlePromptTransformer(),
        response_transformer=DefaultGeneratedTextTransformer(),
        llm_model_provider_name=model_provider,
    )

    return output
