export const userWithoutPassword = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userData } = user;
  return userData;
};
