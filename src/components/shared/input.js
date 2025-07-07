export const createInput = ({ type, id, value, checked, min, max, inputMode, onInput, onChange }) => {
    const input = document.createElement('input');
    input.type = type;
    if (id) input.id = id;

    if (type === 'checkbox') {
        input.checked = !!checked;
        if (typeof onChange === 'function') {
            input.addEventListener('change', onChange);
        }
    }
    if (type === 'number') {
        if (value !== undefined) input.value = value;
        if (min !== undefined) input.min = min;
        if (max !== undefined) input.max = max;
        if (inputMode) input.inputMode = inputMode;
        if (typeof onInput === 'function') {
            input.addEventListener('input', onInput);
        }
    }

    return input;
}
