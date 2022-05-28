import { ValidationOptions, Matches } from 'class-validator';

export function pgDateFormat(validationOptions?: ValidationOptions) {
  return Matches(/^(19|20)\d\d(-)(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/, {
    ...{ message: 'Postgres requires a date format to be yyyy-mm-dd' },
    ...validationOptions,
  });
}
