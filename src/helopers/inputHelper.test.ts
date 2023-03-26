import { describe, expect, test } from 'vitest';
import { validateInput, ValidateInputArgument } from './inputHelper';
import { printableOperators } from '../components/OperatorsBoard';

describe('inputHelper', function () {
    describe('validateInput', function () {
        describe('when nexInput is null', function () {
            test('should return true', function () {
                const result = validateInput({ currentValue: null, newInput: null });

                expect(result).toBe(true);
            });
        });

        describe('when currentValue is null', function () {
            function prepareValidateArgument(newInput: string,) {
                return { currentValue: null, newInput };
            }

            describe('and nextInput is number', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('1');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is open bracket', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('(');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is close bracket', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument(')');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is + operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('+');

                    const result = validateInput(validateArgument);

                    expect(result, 'operator + should not be allowed as first character').toBe(false);
                });
            });

            describe('and nextInput is - operator', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('-');

                    const result = validateInput(validateArgument);

                    expect(result, 'operator - should be allowed as first character').toBe(true);
                });
            });

            describe('and nextInput is * operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('*');

                    const result = validateInput(validateArgument);

                    expect(result, 'operator * should not be allowed as first character').toBe(false);
                });
            });

            describe('and nextInput is / operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('/');

                    const result = validateInput(validateArgument);

                    expect(result, 'operator / should not be allowed as first character').toBe(false);
                });
            });

            describe('and nextInput is ^ operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('^');

                    const result = validateInput(validateArgument);

                    expect(result, 'operator ^ should not be allowed as first character').toBe(false);
                });
            });

            describe('and nextInput is sqrt operator', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('sqrt');

                    const result = validateInput(validateArgument);

                    expect(result, 'operator sqrt should be allowed as first character').toBe(true);
                });
            });
        });

        describe('when prevInput is digit', function () {
            function prepareValidateArgument(newInput: string) {
                return { currentValue: '12', newInput };
            }

            describe('and nextInput is digit', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('1');
                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is open bracket', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('(');
                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is close bracket', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument(')');
                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is a operator', function () {
                test('should return true', function () {
                    const validateArguments = printableOperators.map(operator =>
                        prepareValidateArgument(operator)
                    );
                    const results = validateArguments.map(argument => validateInput(argument));

                    expect(results, 'operator should be able to be insert before digit').not.contains(false);
                });
            });
        });

        describe('when prevInput is opening bracket', function () {
            function prepareValidateArgument(newInput: string) {
                return { currentValue: '12(', newInput };
            }

            describe('and nextInput is digit', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('1');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is open bracket', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('(');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is close bracket', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument(')');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is + operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('+');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is - operator', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('-');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is / operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('/');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is * operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('*');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is ^ operator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('^');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is sqrt operator', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('sqrt');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });
        });

        describe('when prevInput is closing bracket', function () {
            function prepareValidateArgument(newInput: string) {
                return { currentValue: '12)', newInput };
            }

            describe('and nextInput is digit', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('1');
                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is open bracket', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('(');
                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and nextInput is close bracket', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument(')');
                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });

            describe('and nextInput is a operator', function () {
                test('should return true', function () {
                    const validateArguments = printableOperators.map(operator =>
                        prepareValidateArgument(operator)
                    );
                    const results = validateArguments.map(argument => validateInput(argument));

                    expect(results, 'operators should be able to be insert after closing bracket').not.toContain(false);
                });
            });
        });

        describe('when prevInput is operator', function () {
            function prepareValidateArguments(newInput: string) {
                return printableOperators.map(operator => ({
                    currentValue: `12${operator === 'sqrt' ? 'sqrt(' : operator}`,
                    newInput
                }));
            }

            describe('and nextInput is digit', function () {
                test('should return true', function () {
                    const validateArguments = prepareValidateArguments('1');

                    const results = validateArguments.map(argument => validateInput(argument));

                    expect(results, 'digit should be able to be insert after operator').not.toContain(false);
                });
            });

            describe('and nextInput is open bracket', function () {
                test('should return true', function () {
                    const validateArguments = prepareValidateArguments('(');

                    const results = validateArguments.map(argument => validateInput(argument));

                    expect(results, 'opening bracket should be able to be insert after operator').not.toContain(false);
                });
            });

            describe('and nextInput is close bracket', function () {
                test('should return false', function () {
                    const validateArguments = prepareValidateArguments(')');
                    const result0 = validateInput(validateArguments[0]);
                    const result1 = validateInput(validateArguments[1]);
                    const result2 = validateInput(validateArguments[2]);
                    const result3 = validateInput(validateArguments[3]);
                    const result4 = validateInput(validateArguments[4]);
                    const result5 = validateInput(validateArguments[5]);

                    expect(result0, `wrong behavior for value ${validateArguments[0].currentValue}`).toBe(false);
                    expect(result1, `wrong behavior for value ${validateArguments[1].currentValue}`).toBe(false);
                    expect(result2, `wrong behavior for value ${validateArguments[2].currentValue}`).toBe(false);
                    expect(result3, `wrong behavior for value ${validateArguments[3].currentValue}`).toBe(false);
                    expect(result4, `wrong behavior for value ${validateArguments[4].currentValue}`).toBe(false);
                    expect(result5, `wrong behavior for value ${validateArguments[5].currentValue}`).toBe(false);
                    expect.assertions(printableOperators.length);
                });
            });

            describe('and nextInput is + operator', function () {
                test('should return false', function () {
                    const validateArguments = prepareValidateArguments('+');

                    const result0 = validateInput(validateArguments[0]); // +
                    const result1 = validateInput(validateArguments[1]); // -
                    const result2 = validateInput(validateArguments[2]); // *
                    const result3 = validateInput(validateArguments[3]); // /
                    const result4 = validateInput(validateArguments[4]); // ^
                    const result5 = validateInput(validateArguments[5]); // sqrt

                    expect(result0, `wrong behavior for value ${validateArguments[0].currentValue}`).toBe(false);
                    expect(result1, `wrong behavior for value ${validateArguments[1].currentValue}`).toBe(false);
                    expect(result2, `wrong behavior for value ${validateArguments[2].currentValue}`).toBe(false);
                    expect(result3, `wrong behavior for value ${validateArguments[3].currentValue}`).toBe(false);
                    expect(result4, `wrong behavior for value ${validateArguments[4].currentValue}`).toBe(false);
                    expect(result5, `wrong behavior for value ${validateArguments[5].currentValue}`).toBe(false);
                });
            });

            describe('and nextInput is - operator', function () {
                test('should return false', function () {
                    const validateArguments = prepareValidateArguments('-');

                    const result0 = validateInput(validateArguments[0]); // +
                    const result1 = validateInput(validateArguments[1]); // -
                    const result2 = validateInput(validateArguments[2]); // *
                    const result3 = validateInput(validateArguments[3]); // /
                    const result4 = validateInput(validateArguments[4]); // ^
                    const result5 = validateInput(validateArguments[5]); // sqrt

                    expect(result0, `wrong behavior for value ${validateArguments[0].currentValue}`).toBe(true);
                    expect(result1, `wrong behavior for value ${validateArguments[1].currentValue}`).toBe(true);
                    expect(result2, `wrong behavior for value ${validateArguments[2].currentValue}`).toBe(true);
                    expect(result3, `wrong behavior for value ${validateArguments[3].currentValue}`).toBe(true);
                    expect(result4, `wrong behavior for value ${validateArguments[4].currentValue}`).toBe(true);
                    expect(result5, `wrong behavior for value ${validateArguments[5].currentValue}`).toBe(true);
                });
            });

            describe('and nextInput is / operator', function () {
                test('should return false', function () {
                    const validateArguments = prepareValidateArguments('/');

                    const result0 = validateInput(validateArguments[0]); // +
                    const result1 = validateInput(validateArguments[1]); // -
                    const result2 = validateInput(validateArguments[2]); // *
                    const result3 = validateInput(validateArguments[3]); // /
                    const result4 = validateInput(validateArguments[4]); // ^
                    const result5 = validateInput(validateArguments[5]); // sqrt

                    expect(result0, `wrong behavior for value ${validateArguments[0].currentValue}`).toBe(false);
                    expect(result1, `wrong behavior for value ${validateArguments[1].currentValue}`).toBe(false);
                    expect(result2, `wrong behavior for value ${validateArguments[2].currentValue}`).toBe(false);
                    expect(result3, `wrong behavior for value ${validateArguments[3].currentValue}`).toBe(false);
                    expect(result4, `wrong behavior for value ${validateArguments[4].currentValue}`).toBe(false);
                    expect(result5, `wrong behavior for value ${validateArguments[5].currentValue}`).toBe(false);
                });
            });

            describe('and nextInput is * operator', function () {
                test('should return false', function () {
                    const validateArguments = prepareValidateArguments('*');

                    const result0 = validateInput(validateArguments[0]); // +
                    const result1 = validateInput(validateArguments[1]); // -
                    const result2 = validateInput(validateArguments[2]); // *
                    const result3 = validateInput(validateArguments[3]); // /
                    const result4 = validateInput(validateArguments[4]); // ^
                    const result5 = validateInput(validateArguments[5]); // sqrt

                    expect(result0, `wrong behavior for value ${validateArguments[0].currentValue}`).toBe(false);
                    expect(result1, `wrong behavior for value ${validateArguments[1].currentValue}`).toBe(false);
                    expect(result2, `wrong behavior for value ${validateArguments[2].currentValue}`).toBe(false);
                    expect(result3, `wrong behavior for value ${validateArguments[3].currentValue}`).toBe(false);
                    expect(result4, `wrong behavior for value ${validateArguments[4].currentValue}`).toBe(false);
                    expect(result5, `wrong behavior for value ${validateArguments[5].currentValue}`).toBe(false);
                });
            });
        });

        describe('when prevInput is decimal separator', function () {
            function prepareValidateArgument(newInput: string) {
                return {
                    currentValue: `(12.`,
                    newInput
                };
            }

            describe('and newInput is digit', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('1');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(true);
                });
            });

            describe('and newInput is a operator', function () {
                test('should return true', function () {
                    const validateArguments = printableOperators.map(operator =>
                        prepareValidateArgument(operator)
                    );

                    const results = validateArguments.map(argument => validateInput(argument));

                    expect(results, 'all operators should be allowed after decimal operator').not.toContain(false);
                });
            });

            describe('and newInput is bracket', function () {
                test('should return true', function () {
                    const validateArguments = ['(', ')'].map(bracket =>
                        prepareValidateArgument(bracket)
                    );

                    const results = validateArguments.map(argument => validateInput(argument));

                    expect(results, 'all brackets should be allowed after decimal operator').not.toContain(false);
                });
            });

            describe('and newInput is decimal separator', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('.');

                    const result = validateInput(validateArgument);

                    expect(result).toBe(false);
                });
            });
        });

        describe('when newInput is closing bracket', function () {
            describe('and there is at least one opening brackets more then closing one', function () {

                function prepareValidateArgument(currentValueLastCharacter: string) {
                    return { currentValue: `(1${currentValueLastCharacter}`, newInput: ')' };
                }

                describe('and prevInput is digit', function () {
                    test('should return true', function () {
                        const validateArgument = prepareValidateArgument('1');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(true);
                    });
                });

                describe('and prevInput is open bracket', function () {
                    test('should return false', function () {
                        const validateArgument = prepareValidateArgument('(');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(false);
                    });
                });

                describe('and prevInput is close bracket', function () {
                    test('should return false', function () {
                        const validateArgument = prepareValidateArgument(')');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(false);
                    });
                });

                describe('and prevInput is + operator', function () {
                    test('should return false', function () {
                        const validateArgument = prepareValidateArgument('+');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(false);
                    });
                });

                describe('and prevInput is - operator', function () {
                    test('should return false', function () {
                        const validateArgument = prepareValidateArgument('-');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(false);
                    });
                });

                describe('and prevInput is / operator', function () {
                    test('should return false', function () {
                        const validateArgument = prepareValidateArgument('/');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(false);
                    });
                });

                describe('and prevInput is * operator', function () {
                    test('should return false', function () {
                        const validateArgument = prepareValidateArgument('*');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(false);
                    });
                });

                describe('and prevInput is ^ operator', function () {
                    test('should return false', function () {
                        const validateArgument = prepareValidateArgument('^');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(false);
                    });
                });

                describe('and prevInput is decimal separator', function () {
                    test('should return true', function () {
                        const validateArgument = prepareValidateArgument('.');

                        const result = validateInput(validateArgument);

                        expect(result).toBe(true);
                    });
                });

                describe('and closing bracket input position is before first opening bracket', function () {
                    test('should return false', function () {
                        const validateArgument = { currentValue: `12+(12+12`, newInput: ')', inputPosition: 2 };

                        const result = validateInput(validateArgument);

                        expect(result, 'closing bracket was placed before first opening bracket').toBe(false);
                    });
                });
            });

            describe('and there are no opening brackets', function () {
                let validateArgument: ValidateInputArgument;

                describe('and closing bracket input position is before first opening bracket', function () {
                    test('should return false', function () {
                        validateArgument = { currentValue: `11+3`, newInput: ')', inputPosition: 1 };

                        const result = validateInput(validateArgument);

                        expect(result, 'closing bracket was placed without opening bracket').toBe(false);
                    });
                });
            });
        });

        describe('when newInput is opening bracket', function () {
            function prepareValidateArgument(operator: string) {
                return { currentValue: `12${operator}12`, newInput: '(', inputPosition: 3 };
            }

            describe('and operator is equal to +', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('+');

                    const result = validateInput(validateArgument);

                    expect(result, 'opening bracket was input before + operator').toBe(false);
                });
            });

            describe('and operator is equal to -', function () {
                test('should return true', function () {
                    const validateArgument = prepareValidateArgument('-');

                    const result = validateInput(validateArgument);

                    expect(result, 'opening bracket was not able to be input before - operator').toBe(true);
                });
            });

            describe('and operator is equal to /', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('/');

                    const result = validateInput(validateArgument);

                    expect(result, 'opening bracket was input before / operator').toBe(false);
                });
            });

            describe('and operator is equal to *', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('*');

                    const result = validateInput(validateArgument);

                    expect(result, 'opening bracket was input before * operator').toBe(false);
                });
            });

            describe('and operator is equal to ^', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('^');

                    const result = validateInput(validateArgument);

                    expect(result, 'opening bracket was input before ^ operator').toBe(false);
                });
            });

            describe('and operator is equal to sqrt', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('sqrt');

                    const result = validateInput(validateArgument);

                    expect(result, 'opening bracket was not able to be input before sqrt operator').toBe(true);
                });
            });
        });

        describe('when newInput is decimal separator', function () {
            function prepareValidateArgument(value: string, inputPosition: number) {
                return { currentValue: value, newInput: '.', inputPosition };
            }

            describe('and prev character is a digit', function () {
                test('should return true', function () {
                    const validateArguments = prepareValidateArgument('12', 3);

                    const result = validateInput(validateArguments);

                    expect(result, `decimal separator should be allowed after digit`).toBe(true);
                });
            });

            describe('and prev character is operator', function () {
                test('should return false', function () {
                    const validationsArguments = printableOperators.map(operator => prepareValidateArgument(`12${operator}`, 4));

                    const results = validationsArguments.map(validateArguments => validateInput(validateArguments));

                    expect(results, 'decimal operator should not be placed before operator').not.contains(true);
                });
            });

            describe('and prev character is bracket', function () {
                test('should return false', function () {
                    const brackets = ['(', ')'];
                    const validationsArguments = brackets.map(bracket => prepareValidateArgument(`12${bracket}`, 4));

                    const results = validationsArguments.map(validateArguments => validateInput(validateArguments));

                    expect(results, 'decimal operator should not be placed before bracket').not.contains(true);
                });
            });
        });

        describe('when nexInput is decimal separator', function () {
            function prepareValidateArgument(value: string) {
                return { currentValue: `12${value}.4`, newInput: value, inputPosition: 4 };
            }

            describe('and newInput is digit', function () {
                test('should return true', function () {
                    const validateArguments = prepareValidateArgument('1');

                    const result = validateInput(validateArguments);

                    expect(result, `decimal separator should be allowed after digit`).toBe(true);
                });
            });

            describe('and newInput is operator', function () {
                test('should return false', function () {
                    const validatesArguments = printableOperators.map(operator =>
                        prepareValidateArgument(operator === 'sqrt' ? 'sqrt(' : operator)
                    );

                    const results = validatesArguments.map(argument => validateInput(argument));

                    expect(results, `operator should not be allowed before decimal separator`).not.toContain(true);
                });
            });

            describe('and newInput is bracket', function () {
                test('should return false', function () {
                    const validatesArguments = ['(', ')'].map(bracket =>
                        prepareValidateArgument(bracket)
                    );

                    const results = validatesArguments.map(argument => validateInput(argument));

                    expect(results, `bracket should not be allowed before decimal separator`).not.toContain(true);
                });
            });
        });

        describe('when user enter digit and try to put operator at first place', function () {
            function prepareValidateArgument(newInput: string) {
                return { currentValue: '12', newInput, inputPosition: 1 };
            }

            describe('and operator is equal to +', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('+');
                    const result = validateInput(validateArgument);

                    expect(result, '+ operator was placed as first character').toBe(false);
                });
            });

            describe('and operator is equal to -', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('-');

                    const result = validateInput(validateArgument);

                    expect(result, '- operator was block as first character').toBe(true);
                });
            });

            describe('and operator is equal to *', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('*');
                    const result = validateInput(validateArgument);

                    expect(result, '* operator was placed as first character').toBe(false);
                });
            });

            describe('and operator is equal to /', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('/');
                    const result = validateInput(validateArgument);

                    expect(result, '/ operator was placed as first character').toBe(false);
                });
            });

            describe('and operator is equal to ^', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('^');
                    const result = validateInput(validateArgument);

                    expect(result, '^ operator was placed as first character').toBe(false);
                });
            });

            describe('and operator is equal to sqrt', function () {
                test('should return false', function () {
                    const validateArgument = prepareValidateArgument('sqrt');
                    const result = validateInput(validateArgument);

                    expect(result, 'sqrt operator was blocked as first character').toBe(true);
                });
            });
        });

        describe('when user enter a letter', function () {
            test('should return false', function () {
                const validateArgument = { currentValue: '12', newInput: 's', inputPosition: 1 };
                const result = validateInput(validateArgument);

                expect(result, 'letters should not be allowed').toBe(false);
            });
        });
    });
});