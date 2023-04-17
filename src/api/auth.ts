export const getAccessToken = (data: { username: string; password: string }) => {
  return {
    method: "post",
    url: "/auth/login",
    data,
  };
};
