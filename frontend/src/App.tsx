import {
  DocumentArrowUpIcon,
  DocumentCheckIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Header from "./Layout/Header";
import { TagIcon } from "@heroicons/react/16/solid";
import EmailAnalyticsDashboard from "./Layout/EmailAnalyticsDashboard";
import { useCallback, useState } from "react";
import { formatFileSize, removeMaliciousScripts } from "./helpers";
import useFile from "./hooks/useFIle";
import { CATEGORY } from "./constants";

type EmailResponse = {
  id: string;
  message: string;
  datetime: Date;
  category: "productive" | "unproductive";
  suggestedReply: string;
  status: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const { file, inputRef, messageError, handleClear, handleFileChange } =
    useFile();

  const [textAreaValue, setTextAreaValue] = useState("");
  const [emailResponse, setEmailResponse] = useState<EmailResponse | null>(
    null
  );
  const [progress, setProgress] = useState(0);

  const handleFormSubmit = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/process-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: removeMaliciousScripts(textAreaValue),
        }),
      });

      // Simular progresso animado
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const data = await response.json();
      setEmailResponse(data);
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(100);
    }
  }, [textAreaValue]);

  const handleCancelUpload = () => {
    handleClear();
  };

  return (
    <>
      <Header />

      <main className="max-w-[1440px] min-h-screen px-6 pb-10 mx-auto pt-20">
        <div className="mt-8">
          <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-blue-500 via-blue-900 to-blue-100 bg-clip-text text-transparent">
            Processe seu e-mail
          </h1>

          <p className="mt-4 text-center text-text-muted">
            Carregue um arquivo de e-mail ou cole o conteúdo diretamente para
            categorizá-lo e gerar uma resposta sugerida.
          </p>
        </div>

        <section className="bg-surface mt-8 w-full h-fit mx-auto p-6 rounded-lg shadow-md border border-border">
          <form noValidate>
            <div className="flex gap-6 py-6">
              <div className="w-full h-[260px]">
                <h2 className="text-1xl font-bold text-text">
                  Upload arquivo no e-mail
                </h2>

                <div className="mt-1 flex h-full flex-col gap-4">
                  <label
                    htmlFor="upload-file-email"
                    className="flex flex-col h-full gap-1 items-center justify-center cursor-pointer  border border-dashed border-border p-4 rounded-lg bg-gray-50"
                  >
                    <DocumentArrowUpIcon className="h-12 w-12 text-primary" />

                    <div className="flex flex-col gap-1 items-center mt-3 justify-center">
                      <p className="text-sm text-text-muted">
                        Clique para fazer upload do arquivo
                      </p>

                      <span className="text-xs text-text-muted uppercase">
                        .txt ou .pdf (max. 10mb)
                      </span>
                    </div>
                  </label>

                  <input
                    ref={inputRef}
                    id="upload-file-email"
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileChange}
                    hidden
                  />

                  <div
                    className={`text-center w-full min-h-15 text-text-muted border border-border rounded-lg bg-gray-50 transition-all duration-300 ease-in-out ${
                      !file
                        ? "opacity-0 absolute bottom-0 left-0 pointer-events-none"
                        : "opacity-100 scale-100 bg-amber-200"
                    }`}
                  >
                    <div className="flex items-center h-full px-2">
                      <span className="flex items-center justify-center bg-gray-100 w-10 min-w-10 h-10 rounded-lg">
                        <DocumentCheckIcon className="w-[24px] h-[24px] text-text-muted" />
                      </span>

                      <div className="ml-4 w-full">
                        <p className="text-left text-text text-[.75rem]">
                          {file?.name}
                        </p>
                        <p className="text-left text-text-muted text-[.75rem]">
                          {formatFileSize(file?.size)}
                        </p>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={handleCancelUpload}
                          type="button"
                          className="cursor-pointer"
                        >
                          <TrashIcon className="w-[20px] h-[20px] text-text-muted" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="text-[.75rem] text-red-600">
                  {messageError}
                </span>
              </div>

              <div className="w-full h-[260px]">
                <h2 className="text-1xl font-bold text-text">
                  Ou cole o conteúdo do e-mail
                </h2>

                <div className="mt-1 flex border border-border p-4 rounded-lg h-full">
                  <textarea
                    className="w-full h-full border-none outline-none resize-none text-[.75rem]"
                    placeholder="Digite o conteúdo do e-mail"
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end h-15">
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={!file && !textAreaValue}
                className="mt-6 flex gap-2 items-center justify-center shadow-2xl cursor-pointer text-[.875rem] bg-primary text-white px-5 p-2  h-fit rounded-[8px] hover:bg-primary-dark transition-colors disabled:bg-gray-200 disabled:text-text-disabled disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-[20px] h-[20px] text-inherit" />
                Processar Email
              </button>
            </div>
          </form>
        </section>

        <section className="bg-surface mt-8 w-full h-fit mx-auto p-6 rounded-lg shadow-md border border-border">
          <header className="flex gap-2 items-center mb-6">
            <TagIcon className="w-[20px] h-[20px] text-primary" />

            <h2 className="text-1xl font-bold text-text">Resultado</h2>
          </header>

          {file?.size && (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-text">
                    Progresso do upload
                  </span>
                  <span className="text-sm text-text-muted">{`${progress}%`}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-text-muted">
                    Uploading {file?.name}...
                  </span>

                  <span className="text-xs text-text-muted">
                    {`${formatFileSize(file.size * (progress / 100))} /
                    ${formatFileSize(file.size)}`}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-6">
            <div className="flex-1">
              <h3 className="text-[.875rem] text-text">Categoria do Email</h3>

              <span className="text-5xl  mt-2 block font-extrabold bg-gradient-to-r from-blue-500 via-blue-900 to-blue-100 bg-clip-text text-transparent">
                {emailResponse?.category
                  ? CATEGORY[emailResponse?.category]
                  : "--"}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="text-[.875rem] text-text">Resposta Sugerida</h3>

              <div className="mt-1 border p-4 rounded-lg border-border bg-gray-50">
                <p className="text-[.75rem] text-text-muted">
                  {emailResponse?.suggestedReply}
                </p>
              </div>
            </div>
          </div>
        </section>

        <EmailAnalyticsDashboard />
      </main>
    </>
  );
}

export default App;
