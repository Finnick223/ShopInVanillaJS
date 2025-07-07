export const createParagraph = (textContent, id, className) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = textContent;
    if (id) paragraph.id = id;
    if (className) paragraph.classList.add(className);

    return paragraph;
};