class validationError extends Error {
  constructor(message, details = null, status) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
export default validationError;
