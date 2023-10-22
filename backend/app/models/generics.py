from typing import Generic, Optional, TypeVar

from pydantic import BaseModel

Model = TypeVar("Model", bound=BaseModel)


class Response(BaseModel, Generic[Model]):
    data: Optional[Model]
