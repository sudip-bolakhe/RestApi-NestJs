export const configuration = () => {
  return {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    databaseUrl: process.env.DATABASE_URI,
    jwt_secret: process.env.JWT_SECRET,
  };
};
