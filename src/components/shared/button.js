export const createButton = ({ textContent, type = "button", className, id, onClick }) => {
    const btn = document.createElement("button");
    btn.textContent = textContent;
    if (type) btn.type = type;
    if (className) btn.classList.add(className);
    if (id) btn.id = id;
    if (typeof onClick === 'function') {
        btn.addEventListener('click', onClick)
    }

    return btn;
};