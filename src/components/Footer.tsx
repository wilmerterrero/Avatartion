export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 pt-5">
      <p className="text-md">
        Made by{" "}
        <a
          className="hover:text-black hover:underline transition duration-300 ease-in-out"
          href="https://twitter.com/wilterrero"
        >
          Wilmer Terrero
        </a>
      </p>
      <span className="text-gray-400 text-md hidden md:block">|</span>
      <p className="text-md">
        Artwork by{" "}
        <a
          className="hover:text-black hover:underline transition duration-300 ease-in-out"
          href="https://www.drawkit.com"
        >
          Drawkit
        </a>
      </p>
      <span className="text-gray-400 text-md hidden md:block">|</span>
      <p className="text-md">
        <a
          className="hover:text-black hover:underline transition duration-300 ease-in-out"
          href="https://buymeacoffee.com/wilmerterrero"
        >
          Buy me a coffee
        </a>
      </p>
      <span className="text-gray-400 text-md hidden md:block">|</span>
      <p className="text-md">
        <a
          className="hover:text-black hover:underline transition duration-300 ease-in-out"
          href="https://github.com/wilmerterrero/Avatartion"
        >
          GitHub
        </a>
      </p>
    </div>
  );
};
