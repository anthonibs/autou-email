import { useCallback, useRef, useState, type ChangeEvent } from "react";

const useFile = () => {
  const [base64, setBase64] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [messageError, setMessageError] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = useCallback(() => {
    setFile(null);
    setBase64("");
    setMessageError("");

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const fileEvent = event.target.files?.[0];

      try {
        if (!fileEvent) {
          throw new Error("Nenhum arquivo foi selecionado.");
        }

        const fileSizeInMB = fileEvent.size / (1024 * 1024);
        const MAX_FILE_SIZE = 10;
        const allowedTypes = ["text/plain", "application/pdf"];

        if (fileSizeInMB > MAX_FILE_SIZE) {
          throw new Error(
            `Tamanho do arquivo muito grande, limite permitido até ${MAX_FILE_SIZE} MB.`
          );
        }

        if (!allowedTypes.includes(fileEvent.type)) {
          throw new Error("Apenas arquivos .txt ou .pdf são permitidos.");
        }

        const reader = new FileReader();

        reader.onload = (uploadedFileEvent: ProgressEvent<FileReader>) => {
          const result = uploadedFileEvent.target?.result;

          if (result) {
            setMessageError("");
            setFile(fileEvent);
            setBase64(result as string);
          }
        };

        reader.onerror = () => {
          throw new Error("Erro ao ler o arquivo.");
        };

        reader.readAsDataURL(fileEvent);
      } catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        handleClear();
        setMessageError(err);
      }
    },
    [handleClear]
  );

  return {
    handleClear,
    handleFileChange,
    file,
    inputRef,
    base64,
    messageError,
  };
};

export default useFile;
