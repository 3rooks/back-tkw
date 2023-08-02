import { HttpException, HttpStatus } from '@nestjs/common';

export class Exception extends Error {
    constructor({
        message,
        status
    }: {
        message: string;
        status: keyof typeof HttpStatus;
    }) {
        super(`${message} :|: ${status}`);
    }

    public static catch(error: string) {
        const [message, status] = error.split(' :|: ');
        if (message && status)
            throw new HttpException(
                {
                    statusCode: HttpStatus[status],
                    message,
                    error: status
                },
                HttpStatus[status]
            );
        else
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message,
                    error: 'INTERNAL_SERVER_ERROR'
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
    }
}
