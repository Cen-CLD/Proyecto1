import { ComplaintForm } from "@forms/ComplaintForm.js";
import { complaintData } from "@assets/constants.js";

beforeAll(() => {
    global.Swal = {
        fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
    };
});

afterAll(() => {
    delete global.Swal;
});

describe("ComplaintForm", () => {
    let complaintForm;
    let formElement;

    beforeEach(() => {
        document.body.innerHTML = `
      <form id="complaintForm">
        <input type="text" id="complaint-title" value="Titulo" />
        <input type="text" id="complaint-category" value="Categoria" />
        <textarea id="complaint-content">Contenido</textarea>
        <input type="file" id="complaint-image" />
      </form>
    `;
        complaintData.length = 0;
        complaintForm = new ComplaintForm("complaintForm");
        formElement = document.getElementById("complaintForm");
    });

    test("create a complaint WITHOUT a file, using a default image", async () => {
        const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        formElement.dispatchEvent(submitEvent);
        await Promise.resolve(); // allow onSuccess to run
        expect(complaintData.length).toBe(1);
        expect(complaintData[0].image).toBe(
            "../../assets/img/claims/default.jpg",
        );
    });

    test("create a complaint WITH a file, using FileReader", async () => {
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

        const input = document.getElementById("complaint-image");
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
        document.getElementById("complaintForm").dispatchEvent(submitEvent);

        await Promise.resolve();

        expect(fileReaderSpy).toHaveBeenCalledWith(mockFile);
        expect(complaintData.length).toBe(1);

        expect(complaintData[0].image).toBe(
            "data:image/png;base64,FAKE_BASE64_STRING",
        );

        fileReaderSpy.mockRestore();
    });

    test("does not create a complaint if a required field is missing (validation error)", async () => {
        document.getElementById("complaint-title").value = "";

        const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
        });
        formElement.dispatchEvent(submitEvent);

        await Promise.resolve(); // wait for handleSubmit

        expect(complaintData.length).toBe(0);

        expect(global.Swal.fire).toHaveBeenCalledWith(
            expect.objectContaining({
                icon: "warning",
                title: "Error",
                text: "Por favor, ingresa un título para la denuncia.",
            }),
        );
    });
});
