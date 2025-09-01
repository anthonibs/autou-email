import { useCallback, useMemo, useState, type KeyboardEvent } from "react";

import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "../../helpers";
import useFetch from "../../hooks/useFetch";
import MessageData from "../../components/MessageData";
import SkeletonEmail from "../../components/SkeletonEmail";

const CATEGORY: Record<string, string> = {
  productive: "Produtivo",
  unproductive: "Improdutivo",
  spam: "Spam",
};

type Email = {
  id: string;
  message: string;
  suggestedReply: string;
  datetime: Date | string;
  category: string;
};

const EmailAnalyticsDashboard = () => {
  const { data: emails, isError, isLoading } = useFetch<Email[]>();

  const [searchSubject, setSearchSubject] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [emailContent, setEmailContent] = useState<string | undefined>("");

  const handleClearSearch = useCallback(() => {
    setSearchSubject("");
    setEmailContent("");
  }, []);

  const handleKeyDownSearch = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setEmailContent(searchSubject?.toLowerCase().trim());
      }
      if (event.key === "Escape") {
        if (handleClearSearch) {
          handleClearSearch();
        }
      }
    },
    [handleClearSearch, searchSubject]
  );

  const handleSearchChange = useCallback(() => {
    setEmailContent(searchSubject?.toLowerCase().trim());
  }, [searchSubject]);

  const filteredEmails = useMemo(() => {
    if (!emails) return [];

    return emails.filter((email) => {
      const matchesSubject =
        emailContent?.length === 0 ||
        email.suggestedReply
          .toLowerCase()
          .includes(emailContent?.toLowerCase() || "");
      const matchesCategory =
        selectedCategory === undefined ||
        selectedCategory === "all" ||
        email.category === selectedCategory;

      return matchesSubject && matchesCategory;
    });
  }, [emailContent, emails, selectedCategory]);

  if (isError) {
    return (
      <section className="bg-surface mt-8 w-full h-fit mx-auto p-10 rounded-lg shadow-md border border-border">
        <MessageData />
      </section>
    );
  }

  return (
    <section className="bg-surface mt-8 w-full h-fit mx-auto p-6 rounded-lg shadow-md border border-border">
      <header className="flex items-center">
        <h2 className="text-1xl font-bold text-text">Detalhes dos E-mails</h2>

        <div className="ml-auto flex gap-2 items-center">
          <div className="flex gap-2 items-center border border-border relative p-2 rounded-lg w-full h-10 max-w-sm">
            <button
              type="button"
              onClick={handleSearchChange}
              className="cursor-pointer"
            >
              <MagnifyingGlassIcon className="w-[20px] h-[20px] text-text-muted" />
            </button>

            <button
              type="button"
              onClick={handleClearSearch}
              className={`absolute right-2 bg-surface z-10 cursor-pointer ${
                searchSubject ? "visible" : "invisible"
              }`}
            >
              <XMarkIcon className="w-[20px] h-[20px] text-text-muted" />
            </button>

            <input
              type="search"
              placeholder="Digite o assunto do email"
              className="border-none w-[200px] outline-none text-text-muted resize-none text-[.875rem]"
              value={searchSubject}
              onKeyDown={handleKeyDownSearch}
              onChange={(e) => setSearchSubject(e.target.value)}
            />
          </div>

          <select
            name="categoria"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-2 outline-none cursor-pointer border border-border rounded-lg text-text-muted text-[.875rem]"
          >
            <option value="all">Todas as Categorias</option>
            <option value="productive">Produtivo</option>
            <option value="unproductive">Improdutivo</option>
          </select>

          <button className="flex cursor-pointer items-center  gap-2 w-fit h-10 px-4 border text-text-muted text-[.875rem] border-border rounded-lg hover:bg-gray-100">
            <ArrowDownTrayIcon className="w-[20px] h-[20px] text-text-muted" />
            Exportar
          </button>
        </div>
      </header>

      <ul className="mt-2 flex flex-col gap-4">
        {!isLoading &&
          filteredEmails.map((email) => (
            <li
              key={email.id}
              className="border  border-border p-4 relative rounded-md"
            >
              <span className="text-[.75rem] text-text-muted">
                {formatDate(email.datetime)}
              </span>

              <span
                className={`absolute right-4 top-4 text-[.675rem] px-3 h-6 flex items-center rounded-full ${
                  email.category === "unproductive"
                    ? "text-red-600 bg-red-100"
                    : "text-primary bg-blue-100"
                }`}
              >
                {CATEGORY[email.category]}
              </span>

              <h4 className="text-[.875rem] font-bold text-text">
                {email.message}
              </h4>

              <div className="mt-4">
                <h5 className="text-[.75rem] font-bold text-text-muted">
                  Resposta Sugerida
                </h5>

                <div className="mt-1 border p-3 rounded-lg border-border bg-gray-50">
                  <p className="text-[.75rem] text-text-muted line-clamp-1 text-ellipsis overflow-hidden">
                    {email.suggestedReply}
                  </p>
                </div>
              </div>
            </li>
          ))}

        <SkeletonEmail skeletonItems={3} isLoading={isLoading} />
      </ul>
    </section>
  );
};

export default EmailAnalyticsDashboard;
