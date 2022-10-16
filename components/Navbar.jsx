import Link from "next/link";
import Search from "./Search";
function Navbar({
  darkTheme,
  setDarkTheme,
  setQueryData,
  setIsLoading,
  queryTag,
}) {
  return (
    <>
      <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
        <div className="flex  items-center space-x-5 w-screen ">
          <Link href="/">
            <a className="text-3xl bg-blue-300 font-bold text-white py-1 px-2 rounded dark:text-gray-900 dark:bg-gray-500">
              KGPSearch</a>
          </Link>
          <Search
            setQueryData={setQueryData}
            setIsLoading={setIsLoading}
            queryTag={queryTag}
          />
          <button
            className="text-xl bg-gray-200 text-gray-900  dark:bg-gray-900 dark:text-gray-200  border rounded-full px-2 py-1 hover:shadow-xl"
            type="button"
            onClick={() => setDarkTheme(!darkTheme)}
          >
            {!darkTheme ? "Light 🤢 🖕 ఠ ͟ಠ" : "Dark 😊"}
          </button>
        </div>
      </div>
    </>
  );
}
export default Navbar;
