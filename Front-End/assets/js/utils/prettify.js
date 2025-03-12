export const prettifyText = (rawText) => {
    const paragraphs = rawText
        .split("\n")
        .filter((p) => p.trim().length > 0)
        .map((p) => `<p>${p.trim()}</p>`)
        .join("");

    const formattedText = paragraphs.replace(
        /\*\*(.+?)\*\*/g,
        "<strong>$1</strong>",
    );

    return formattedText;
};
