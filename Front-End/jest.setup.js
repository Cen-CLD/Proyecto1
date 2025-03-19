global.Swal = {
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
};
