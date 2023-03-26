export type ValidateInputArgument = {
    currentValue: string | null,
    newInput: string | null
    inputPosition?: number | null
}

const isDigitRegExp = new RegExp('\\d');
const isDecimalSeparatorRegExp = new RegExp('\\.');
const isPrivilegedOperatorRegExp = new RegExp('^(?:-|sqrt)$');
const isNormalOperatorRegExp = new RegExp('^(\\+|-|\\*|\\/|\\^)$');
const isAnyOperatorRegExp = new RegExp(`${isNormalOperatorRegExp.source}|${isPrivilegedOperatorRegExp.source}`);
const isOpenBracketRegExp = new RegExp('\\(');
const isCloseBracketRegExp = new RegExp('\\)');

export function validateInput({ currentValue, newInput, inputPosition }: ValidateInputArgument): boolean {
    if (!newInput) {
        return true;
    }

    if (!currentValue) {
        return multiTestOr(newInput, [isDigitRegExp, isOpenBracketRegExp, isPrivilegedOperatorRegExp]);
    }

    inputPosition ??= currentValue.length + 1;
    const prevInputPosition = inputPosition - 1;
    const prevInputIndex = prevInputPosition - 1;
    const nextInputIndex = prevInputPosition;

    const prevInput = getInput(currentValue, prevInputIndex, GetInputDirection.PREV);
    const nextInput = getInput(currentValue, nextInputIndex, GetInputDirection.NEXT);

    const isFirstCharacter = prevInputIndex < 0;
    const isLastCharacter = nextInputIndex === currentValue.length;

    if (isFirstCharacter) {
        return multiTestOr(newInput, [isDigitRegExp, isOpenBracketRegExp, isPrivilegedOperatorRegExp]);
    }

    if (isCloseBracketRegExp.test(newInput)) {
        return canCloseBracket(currentValue, inputPosition) && multiTestOr(prevInput, [isDigitRegExp, isDecimalSeparatorRegExp]);
    }

    if (isDecimalSeparatorRegExp.test(nextInput)) {
        return isDigitRegExp.test(newInput);
    }

    if (isDecimalSeparatorRegExp.test(newInput)) {
        return isDigitRegExp.test(prevInput);
    }

    if (!isLastCharacter && isOpenBracketRegExp.test(newInput)) {
        return multiTestOr(nextInput, [isDigitRegExp, isOpenBracketRegExp, isPrivilegedOperatorRegExp]);
    }

    if (multiTestOr(prevInput, [isDigitRegExp, isCloseBracketRegExp])) {
        return multiTestOr(newInput, [isDigitRegExp, isAnyOperatorRegExp, isOpenBracketRegExp]);
    }

    if (isDecimalSeparatorRegExp.test(prevInput)) {
        return multiTestOr(newInput, [isDigitRegExp, isAnyOperatorRegExp, isOpenBracketRegExp])
    }

    if (isAnyOperatorRegExp.test(prevInput)) {
        return multiTestOr(newInput, [isDigitRegExp, isOpenBracketRegExp, isPrivilegedOperatorRegExp]);
    }

    if (isOpenBracketRegExp.test(prevInput)) {
        return multiTestOr(newInput, [isDigitRegExp, isPrivilegedOperatorRegExp]);
    }

    return false;
}

function multiTestOr(valueToTest: string, regexps: RegExp[]): boolean {
    return regexps.reduce((lasResult, regexp) => {
        if (lasResult) {
            return lasResult;
        }

        return regexp.test(valueToTest);
    }, false);
}

function canCloseBracket(currentValue: string, inputPosition: number): boolean {
    const openedCount = currentValue.match(/\(/g)?.length || 0;
    const firstOpeningIndex = currentValue.indexOf('(') || -1;
    const firstOpeningPosition = firstOpeningIndex + 1;
    const closedCount = currentValue.match(/\)/g)?.length || 0;

    return openedCount > closedCount && firstOpeningPosition < inputPosition;
}

enum GetInputDirection {
    PREV,
    NEXT
}

function getInput(expression: string, inputStartPosition: number, direction: GetInputDirection): string {
    const SQRT_LENGTH = 4;

    const nextValue = expression.at(inputStartPosition);
    let potentialSqrtOperator = expression.substring(inputStartPosition, inputStartPosition + SQRT_LENGTH);

    if (direction === GetInputDirection.PREV) {
        potentialSqrtOperator = expression.substring(inputStartPosition - SQRT_LENGTH, inputStartPosition);
    }

    const isSqrtOperator = potentialSqrtOperator === 'sqrt';


    if (isSqrtOperator) {
        return 'sqrt';
    }

    return nextValue!;
}