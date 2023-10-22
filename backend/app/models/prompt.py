from typing import Optional

from pydantic import BaseModel


class CareerBase(BaseModel):
    course_of_study: str
    career_interest: Optional[str] = ""

    def __hash__(self) -> int:
        key = self.course_of_study + self.career_interest
        return key.__hash__()


class CareerAdvisor(CareerBase):
    limit: int = 3

    def __hash__(self) -> int:
        key = self.course_of_study + self.career_interest + str(self.limit)
        return key.__hash__()


class CareerWithIndustry(CareerBase):
    industry: str

    def __hash__(self) -> int:
        key = self.course_of_study + self.career_interest + self.industry
        return key.__hash__()


class CareerWithDepartment(CareerWithIndustry):
    department: str

    def __hash__(self) -> int:
        key = (
            self.course_of_study
            + self.career_interest
            + self.industry
            + self.department
        )
        return key.__hash__()


class CareerWithJobTitle(CareerWithDepartment):
    job_title: str

    def __hash__(self) -> int:
        key = (
            self.course_of_study
            + self.career_interest
            + self.industry
            + self.department
            + self.job_title
        )
        return key.__hash__()
