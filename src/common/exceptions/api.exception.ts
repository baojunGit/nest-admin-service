import { HttpException } from '@nestjs/common';
import { ErrorCodeMap } from '../constant/error-code.constant';

/**
 * @description Api业务异常均抛出该方法
 */
export class ApiException extends HttpException {
  // 业务类型错误代码，非Http code
  private errorCode: number;
  constructor(errorCode: number) {
    super(ErrorCodeMap[errorCode], 200);
    this.errorCode = errorCode;
  }

  getErrorCode(): number {
    return this.errorCode;
  }
}
