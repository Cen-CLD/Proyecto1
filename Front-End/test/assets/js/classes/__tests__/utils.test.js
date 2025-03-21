import { prettifyText } from "@utils/prettify.js";

describe("prettifyText", () => {
    test("should convert line breaks into <p>", () => {
        const input = "Linea1\nLinea2\n\nLinea3";
        const result = prettifyText(input);
        expect(result).toContain("<p>Linea1</p>");
        expect(result).toContain("<p>Linea2</p>");
        expect(result).toContain("<p>Linea3</p>");
    });

    test("should convert text into <strong>", () => {
        const input = "Esto es **importante** y **fuerte**";
        const result = prettifyText(input);
        expect(result).toContain("<strong>importante</strong>");
        expect(result).toContain("<strong>fuerte</strong>");
    });
});
