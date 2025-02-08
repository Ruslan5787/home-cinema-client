import { FaSignOutAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localtorage.helper';
import { toast } from 'react-toastify';

const Profile = () => {
  const userData = useAppSelector((state) => state.user.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    navigate('/');
    dispatch(logout());
    removeTokenFromLocalStorage();
    toast.success('Вы вышли из аккаунта!');
  };

  return (
    <div className="rounded-md bg-slate-800 px-5 py-10 text-center">
      <div className="inline-block">
        <h1 className="mb-8 text-center text-2xl">Данные о пользователе</h1>
        <div className="mb-5 flex flex-col gap-y-3 text-lg">
          <div>
            Ваше имя - <span className="font-bold">{userData?.firstName}</span>
          </div>
          <div>
            Ваша фамиля -{' '}
            <span className="font-bold">{userData?.lastName}</span>
          </div>
          <div>
            Ваша почта - <span className="font-bold">{userData?.email}</span>
          </div>
        </div>
        {isAuth && (
          <button
            className="btn btn-red w-full justify-center text-center"
            onClick={logoutHandler}
          >
            <span>Выйти</span>
            <FaSignOutAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
