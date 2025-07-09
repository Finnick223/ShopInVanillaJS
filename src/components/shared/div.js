export const createDiv = ({ className }) => {
    const div = document.createElement('div');
    div.classList.add(className);

    return div;
};