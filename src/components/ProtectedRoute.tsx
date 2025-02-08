import { FC } from 'react';
import { useAppSelector } from '../store/hooks';
import img from '../assets/protected.png';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="flex flex-col justify-center gap-3 mt-36">
          <h1 className="text-center text-2xl">
            Чтобы перейти на эту страницу, нужно зарегистрироваться!
          </h1>
          <img src={img} alt="Замок" className='w-[550px] m-auto' />
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
