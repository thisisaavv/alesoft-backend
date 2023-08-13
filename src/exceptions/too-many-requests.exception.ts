import HttpException from "./http.exception";

class TooManyRequestsException extends HttpException {
	constructor(message?: string) {
		super(429, message || "Too Many Requests");
	}
}

export default TooManyRequestsException;
