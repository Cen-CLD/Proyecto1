import { InitiativeForm } from "@forms/InitiativeForm.js";
import { initiativeData } from "@assets/constants.js";

beforeAll(() => {
    global.Swal = {
        fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
    };
});

afterAll(() => {
    delete global.Swal;
});

describe("InitiativeForm", () => {
    let initiativeForm;
    let formElement;

    beforeEach(() => {
        document.body.innerHTML = `
      <form id="initiativeForm">
        <input type="text" id="initiative-title" value="Titulo" />
        <input type="text" id="initiative-category" value="Categoria" />
        <textarea id="initiative-content">Contenido</textarea>
        <input type="file" id="initiative-image" />
      </form>
    `;
        initiativeData.length = 0;
        initiativeForm = new InitiativeForm("initiativeForm");
        formElement = document.getElementById("initiativeForm");
    });

    test("creates an initiative WITHOUT a file, using a default image", async () => {
        const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        formElement.dispatchEvent(submitEvent);
        await Promise.resolve();

        expect(initiativeData.length).toBe(1);
        expect(initiativeData[0].image).toBe(
            "../../assets/img/iniciatives/default.jpg",
        );
    });

    test("creates an initiative WITH a file, using FileReader", async () => {
        const mockFile = new File(["fake-image-binary"], "test.png", {
            type: "image/png",
        });
        const mockFileList = {
            length: 1,
            0: mockFile,
            item(index) {
                return this[index];
            },
        };

        const input = document.getElementById("initiative-image");
        Object.defineProperty(input, "files", {
            value: mockFileList,
            writable: false,
        });

        const fileReaderSpy = jest
            .spyOn(FileReader.prototype, "readAsDataURL")
            .mockImplementation(function () {
                this.onload({
                    target: {
                        result: "data:image/png;base64,FAKE_BASE64_STRING",
                    },
                });
            });

        const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        formElement.dispatchEvent(submitEvent);

        await Promise.resolve();
        expect(fileReaderSpy).toHaveBeenCalledWith(mockFile);
        expect(initiativeData.length).toBe(1);
        expect(initiativeData[0].image).toBe(
            "data:image/png;base64,FAKE_BASE64_STRING",
        );

        fileReaderSpy.mockRestore();
    });

    test("does not create an initiative if a required field is missing (validation error)", async () => {
        document.getElementById("initiative-title").value = "";

        const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        formElement.dispatchEvent(submitEvent);

        await Promise.resolve();

        expect(initiativeData.length).toBe(0);
        expect(global.Swal.fire).toHaveBeenCalledWith(
            expect.objectContaining({
                icon: "warning",
                title: "Error",
                text: "Por favor, ingresa un título para la iniciativa.",
            }),
        );
    });
});
