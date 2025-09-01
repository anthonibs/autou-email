import NotErrorIcon from "../../assets/svgs/not-error.svg?react";

const MessageData = () => {
  return (
    <div className="w-full max-w-[640px] m-auto">
      <div className="w-56 m-auto">
        <NotErrorIcon />
      </div>

      <div className="mt-2">
        <p className="text-center text-text-muted text-[.875rem]">
          Não foi possível carregar os emails. Tente novamente mais tarde.
        </p>
      </div>
    </div>
  );
};

export default MessageData;
