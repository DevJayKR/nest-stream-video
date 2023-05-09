import { ValidationArguments } from 'class-validator';

type DecoratorType = 'IsString' | 'IsNotEmpty' | 'IsEmail';

export const customMessage =
  (type: DecoratorType) =>
  (args: ValidationArguments): string => {
    const { property } = args;

    const baseText = `${property} 필드는 `;

    if (type === 'IsString') return baseText + '문자열이어야 합니다.';
    if (type === 'IsNotEmpty') return baseText + '필수 입력값입니다.';
    if (type === 'IsEmail') return baseText + '이메일 형식이어야 합니다.';
  };
