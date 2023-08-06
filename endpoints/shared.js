export const clearCache = (error) => {
  if (error === "Invalid token") {
    localStorage.setItem("token", "");
    window.location.href = "/login";
  }
};
