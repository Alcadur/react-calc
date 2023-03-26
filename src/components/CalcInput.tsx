import style from './CalcInput.module.css';
import {
    ChangeEvent,
    MutableRefObject,
    SyntheticEvent,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState
} from 'react';
import { CalcContext } from './Calc';
import { useDispatch } from 'react-redux';
import {
    setCurrentExpression,
    useExpressionCurrentSelector,
    useExpressionWasUpdatedSelector
} from '../redux/expressionSlice';

type PropsTypes = {
    className?: string
}

export function CalcInput({ className }: PropsTypes) {
    const { updateLastPressedButton } = useContext(CalcContext);
    const inputValue = useExpressionCurrentSelector();
    const inputWasUpdated = useExpressionWasUpdatedSelector();
    const [shouldUpdateInputPosition, refreshInputPosition] = useReducer((x) => !x, false);
    const dispatch = useDispatch();
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const [inputPosition, setInputPosition] = useState(() => 1);

    useSelectionRangeUpdate(inputRef.current, inputPosition, inputWasUpdated, shouldUpdateInputPosition);

    async function update(event: ChangeEvent<HTMLInputElement>) {
        let { value, selectionStart } = event.currentTarget;
        const { data: pressedButton, inputType } = event.nativeEvent as InputEvent;

        const wasContentDelete = 'deleteContentBackward' === inputType;
        const wasOpeningBracketRemoved = inputValue[selectionStart!];

        if (wasContentDelete && wasOpeningBracketRemoved) {
            ({ value, selectionStart } = removeSqrtAndUpdateSelectionPosition(value, selectionStart!));
        }

        updateLastPressedButton(pressedButton!);
        setInputPosition(selectionStart!);

        refreshInputPosition();

        await dispatch(setCurrentExpression({
            currentValue: inputValue,
            updatedValue: value,
            newInput: pressedButton,
            inputPosition: selectionStart,
        }));
    }

    function selectUpdateResolver(event: SyntheticEvent<HTMLInputElement>) {
        const { type } = event.nativeEvent;
        const { selectionStart, selectionEnd } = event.currentTarget;

        if (selectionStart != selectionEnd) {
            setInputPosition(selectionStart!);
            return refreshInputPosition()
        }

        if (type === 'mouseup') {
            return updateSelectMouse(inputRef);
        }

        if (['selectionchange', 'keyup'].includes(type)) {
            return updateSelectKeyboard(inputRef);
        }
    }

    return (
        <input
            ref={inputRef}
            className={`${className} ${style.input}`}
            type="text"
            value={inputValue}
            onSelect={selectUpdateResolver}
            onChange={update}
            data-testid="expression-input"
        >
        </input>
    );
}

function useSelectionRangeUpdate(
    inputElement: HTMLInputElement | null,
    inputPosition: number,
    inputWasUpdated: boolean,
    shouldInputPosition: boolean
) {
    useEffect(() => {
        let inputIndex = inputPosition;

        if (!inputWasUpdated && inputIndex > 0) {
            inputIndex = inputPosition! - 1;
        }

        inputElement?.setSelectionRange(inputIndex, inputIndex);
    }, [shouldInputPosition]);
}

function removeSqrtAndUpdateSelectionPosition(value: string, selectionStart: number) {
    const sqrtStart = selectionStart! - 4;
    const isBracketPartOfSqrt = value.substring(sqrtStart, selectionStart!) === 'sqrt';

    if (isBracketPartOfSqrt) {
        const nextOpeningBracketIndex = value.indexOf('(', selectionStart);
        const nextClosingBracketIndex = value.indexOf(')', selectionStart);
        const canRemoveClosingBracket = nextOpeningBracketIndex != -1 && nextClosingBracketIndex < nextOpeningBracketIndex;

        if (canRemoveClosingBracket) {
            value = cutFromString(value, nextClosingBracketIndex, nextClosingBracketIndex + 1);
        }

        value = cutFromString(value, sqrtStart, selectionStart);

        selectionStart = sqrtStart;
    }

    return { value, selectionStart };
}

function cutFromString(value: string, start: number, end: number): string {
    return value.substring(0, start) + value.substring(end);
}

function updateSelectMouse(
    inputRef: MutableRefObject<HTMLInputElement | null>
) {
    const { selectionStart, value } = inputRef.current!;
    const characterMoveValueMap: { [character: string]: number } = {
        's': -1,
        'q': -2,
        'r': 2,
        't': 1,
    };

    const selectionMoveValue = characterMoveValueMap[value[selectionStart! - 1]] || 0;

    if (selectionMoveValue) {
        const selectionValue = selectionStart! + selectionMoveValue
        inputRef.current!.setSelectionRange(selectionValue, selectionValue);
    }
}

function updateSelectKeyboard(
    inputRef: MutableRefObject<HTMLInputElement | null>
) {
    const { value, selectionStart } = inputRef.current!;
    const leftFourCharacters = value.substring(selectionStart! - 4, selectionStart!);
    const rightThreeCharacters = value.substring(selectionStart!, selectionStart! + 3);

    const isSqrtOnLeft = leftFourCharacters === 'sqrt';
    const isSqrtOnRight = `s${rightThreeCharacters}` === 'sqrt';

    let selectionValue = selectionStart

    if (isSqrtOnLeft) {
        selectionValue = selectionStart! - 4;
    }

    if (isSqrtOnRight) {
        selectionValue = selectionStart! + 4;
    }

    inputRef.current!.setSelectionRange(selectionValue, selectionValue)
}