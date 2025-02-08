import { FC } from 'react';
import { useNavigate } from 'react-router';

import img from '../assets/page_not_found_404.png';
import { Link } from 'react-router';

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-900 font-roboto text-white">
      <img className="w-[700px]" src={img} />
      <Link
        to={'..'}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="rounded-md bg-cyan-700 px-6 py-2 hover:bg-cyan-600"
      >
        Вернуться на предыдущую страницу
      </Link>
    </div>
  );
};

export default ErrorPage;
