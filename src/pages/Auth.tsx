import { FC, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../helpers/localtorage.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';
import { useNavigate } from 'react-router';

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const data = await AuthService.login({ email, password });

      setTokenToLocalStorage(data?.token);
      dispatch(login(data));

      toast.success('Вы вошли в аккаунт!');
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data.message;

      if (errorMessage instanceof Array) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const registrationHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    try {
      event.preventDefault();

      const data = await AuthService.registration({
        email,
        password,
        firstName,
        lastName,
      });

      toast.success('Вы зарегистрировались!');
      setIsLogin(!isLogin);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setIsLogin(!isLogin);
    } catch (err: any) {
      const errorMessage = err.response?.data.message;

      if (errorMessage instanceof Array) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="mt-52 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-2xl">
        {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
      </h1>

      <form
        className="mx-auto flex w-1/3 flex-col gap-5"
        onSubmit={isLogin ? loginHandler : registrationHandler}
      >
        {!isLogin && (
          <>
            <input
              type="text"
              className="input bg-slate-700"
              placeholder="Имя"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              className="input bg-slate-700"
              placeholder="Фамилия"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </>
        )}

        <input
          type="text"
          className="input bg-slate-700"
          placeholder="Почта"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          className="input bg-slate-700"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label for="check" className='text-[17px] select-none'>
          <input
          className='mr-3'
            id="check"
            type="checkbox"
            value={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          Показать пароль
        </label>

        <button className="btn btn-green mx-auto mt-3">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="mt-6 flex justify-center">
        <button
          className="text-white/50 hover:text-white"
          onClick={() => {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? 'Хотите зарегистрироваться?' : 'Хотите войти в аккаунт?'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
