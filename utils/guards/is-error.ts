type ServerError = {
  isError: true;
  error?: string;
};

export const isError = (value: unknown): value is ServerError => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isError' in value &&
    typeof value.isError == 'boolean' &&
    value.isError
  );
};
