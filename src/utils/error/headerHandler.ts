export const headerHandler = (context: any) => {
  return context.json(
    "You must enter all parameters via header, see https://applio.org/api/docs for more information.",
    404,
  );
};
