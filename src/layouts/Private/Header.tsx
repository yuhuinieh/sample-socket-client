import { logout } from '@/service/auth.service';
import { userAtom } from '@/states/userAtom';
import { useAtomValue } from 'jotai';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useAtomValue(userAtom);
  const [cookies, setCookie] = useCookies(['isAuth']);

  const handleLogout = async () => {
    try {
      await logout();
      setCookie('isAuth', false);
    } catch (error) {
      return cookies;
    }
  };

  return (
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          to="/chat"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="ChatRoom"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            ChatRoom
          </span>
        </Link>
        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="mr-4 dark:text-white">{user?.nickname}</div>
          <button
            type="button"
            className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
