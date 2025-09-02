import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="w-full shadow-sm border-b border-border bg-background px-6 fixed top-0 left-0 z-100">
      <div className="flex items-center justify-between max-w-[1440px] px-6 mx-auto">
        <img src="/trustmail.png" alt="Brand TrustMail" className="h-8" />

        <nav className="flex items-center gap-3 p-4">
          <ul className="flex gap-3 mr-4">
            <li>
              <a className="text-text" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="text-text" href="#">
                Sobre
              </a>
            </li>
            <li>
              <a className="text-text" href="#">
                Contato
              </a>
            </li>
          </ul>

          <a>
            <QuestionMarkCircleIcon className="h-6 w-6 text-text" />
          </a>

          <div className="h-10 w-10">
            <img
              className="h-10 w-10 rounded-full object-center object-cover"
              src="https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg"
              alt=""
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
