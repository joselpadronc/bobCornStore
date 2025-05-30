from pydantic import BaseModel

class SuccessResponse(BaseModel):
    message: str
    status_code: int

class RateLimitResponse(BaseModel):
    detail: str

class ValidationErrorResponse(BaseModel):
    detail: str

responses = {
    200: {
        "description": "Successful purchase",
        "model": SuccessResponse,
        "content": {"application/json": {"example": {"message": "Successful purchase", "status_code": 200}}}
    },
    429: {
        "description": "Rate limit exceeded",
        "model": RateLimitResponse,
        "content": {"application/json": {"example": {"detail": "You can only buy one corn per minute"}}}
    },
    400: {
        "description": "Validation error",
        "model": ValidationErrorResponse,
        "content": {"application/json": {"example": {"detail": "Invalid client_id format"}}}
    }
}
