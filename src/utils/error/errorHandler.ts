export const errorHandler = (error: any, context: any) => {
  console.error(error);
  return context.json(
    "500: Unexpected error, if this continues do not hesitate to report it at https://github.com/IAHispano/Applio-API/issues",
    500,
  );
};
