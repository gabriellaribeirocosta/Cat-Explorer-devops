import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SearchForm from "../components/SearchForm"
import { MockCatProvider } from "../helpers/MockCatProvider"
import { CatProvider } from "../contexts/CatContext"
import App from "../App"

test("renderiza input de busca e botão", () => {
    render(
        <MockCatProvider stateOverrides={{ loading: true }}>
            <SearchForm />
        </MockCatProvider>
    )

    expect(screen.getByLabelText(/Buscar raça/i)).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
})

test("exibe alert ao enviar busca vazia", () => {
    window.alert = jest.fn();

    render(
        <MockCatProvider>
            <SearchForm />
        </MockCatProvider>
    );

    const button = screen.getByRole("button", { name: /Buscar/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith(
        "Preencha o campo de busca antes de enviar."
    );
});

test("botão fica desabilitado quando loading = true", () => {
    render(
        <MockCatProvider stateOverrides={{ loading: true }}>
            <SearchForm />
        </MockCatProvider>
    )

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent(/buscando/i)
})

test("envio de busca válida chama função search com o valor correto", () => {
    const mockSearch = jest.fn();

    render(
        <MockCatProvider mockSearch={mockSearch}>
            <SearchForm />
        </MockCatProvider>
    );

    const input = screen.getByLabelText(/Buscar raça/i);
    const button = screen.getByRole("button", { name: /Buscar/i });

    fireEvent.change(input, { target: { value: "Siamese" } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("Siamese");
});

test("botão mostra 'Buscando...' enquanto loading = true após submit", async () => {
    const mockSearch = jest.fn(() => new Promise(() => { }));

    render(
        <MockCatProvider mockSearch={mockSearch}>
            <SearchForm />
        </MockCatProvider>
    );

    const input = screen.getByLabelText(/Buscar raça/i);
    fireEvent.change(input, { target: { value: "Bengal" } });

    const button = screen.getByRole("button", { name: /Buscar/i });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalled();
})

test('exibe mensagem de erro quando a API falha', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => { })
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')))

    render(
        <CatProvider>
            <App />
        </CatProvider>
    )

    fireEvent.change(screen.getByLabelText(/Buscar raça/i), {
        target: { value: 'siamese' },
    })

    fireEvent.click(screen.getByRole('button', { name: /buscar/i }))

    expect(await screen.findByText(/network error/i)).toBeInTheDocument()
})