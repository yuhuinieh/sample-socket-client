import { useCookies } from 'react-cookie';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

const Public = () => {
  const [cookies] = useCookies(['isAuth']);

  if (cookies.isAuth) return <Navigate to="/chat"></Navigate>;

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <Link
            to="/"
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="mr-2 size-8"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            ChatRoom
          </Link>
          <Outlet />
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default Public;
