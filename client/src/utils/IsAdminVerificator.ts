export const IsAdminVerificator = (currentStatus: string) => {
    if (currentStatus === "Admin") {
        return true;
      } else {
        return false;
      }
}