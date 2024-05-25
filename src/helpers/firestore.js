const ERROR = {
    permissionDenied: 'permission-denied',
    notFound: 'not-found',
    unavailable: 'unavailable'
};

export const firestoreErrorHandler = (error) => {
    switch (error.code) {
      case ERROR.permissionDenied:
        console.error("Error: Permission denied. You do not have access to this resource.");
        break;
      case ERROR.notFound:
        console.error("Error: Resource not found. The specified document or collection does not exist.");
        break;
      case ERROR.unavailable:
        console.error("Error: Firestore service is currently unavailable. Please try again later.");
        break;
      default:
        console.error("An unexpected error occurred:", error);
    }
};