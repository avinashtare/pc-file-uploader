export class AppError extends Error {
  status: number;
  code: string;
  data?: any;

  constructor(
    message: string,
    {
      status = 500,
      code = "INTERNAL_ERROR",
      data,
    }: {
      status?: number;
      code?: string;
      data?: any;
    } = {}
  ) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export class BadRequestError extends AppError{
    constructor(message="Bed request",data:any){
        super(message,{status:400,code:"BAD_REQUEST",data})
    }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", data?: any) {
    super(message, {
      status: 401,
      code: "UNAUTHORIZED",
      data,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden", data?: any) {
    super(message, {
      status: 403,
      code: "FORBIDDEN",
      data,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", data?: any) {
    super(message, {
      status: 404,
      code: "NOT_FOUND",
      data,
    });
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", data?: any) {
    super(message, {
      status: 409,
      code: "CONFLICT",
      data,
    });
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", data?: any) {
    super(message, {
      status: 422,
      code: "VALIDATION_ERROR",
      data,
    });
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests", data?: any) {
    super(message, {
      status: 429,
      code: "TOO_MANY_REQUESTS",
      data,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal server error", data?: any) {
    super(message, {
      status: 500,
      code: "INTERNAL_ERROR",
      data,
    });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service unavailable", data?: any) {
    super(message, {
      status: 503,
      code: "SERVICE_UNAVAILABLE",
      data,
    });
  }
}
