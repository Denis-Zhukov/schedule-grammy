type ServerSuccess = {
  isSuccess: true;
};

export const isSuccess = (value: unknown): value is ServerSuccess => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isSuccess' in value &&
    typeof value.isSuccess == 'boolean'
  );
};
