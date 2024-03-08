export const headerHandler = (context: any) => {
  return context.text(
    "You must enter all parameters via header, see https://applio.org/api/docs for more information.", 
    404
  );
};
