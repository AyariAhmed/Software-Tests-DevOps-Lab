import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import GovMunicip from '../auth/entities/SupportedCities';

export function ValidMunicipality(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'ValidMunicipality',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            GovMunicip[relatedValue] != null &&
            GovMunicip[relatedValue].includes(value)
          );
        },
      },
    });
  };
}
