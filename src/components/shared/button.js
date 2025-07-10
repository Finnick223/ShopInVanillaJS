export const createButton = ({ textContent, type = "button", className, id, onClick }) => {
    const button = document.createElement("button");
    Object.assign(button, { textContent, type, id });
    if (className) button.classList.add(className);
    if (typeof onClick === 'function') {
        button.addEventListener('click', onClick)
    }

    return button;
};