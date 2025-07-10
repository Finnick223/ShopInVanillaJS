export const createButton = ({ textContent, type = "button", className, id, onClick }) => {
    const button = document.createElement("button");
    button.textContent = textContent;
    if (type) button.type = type;
    if (className) button.classList.add(className);
    if (id) button.id = id;
    if (typeof onClick === 'function') {
        button.addEventListener('click', onClick)
    }

    return button;
};