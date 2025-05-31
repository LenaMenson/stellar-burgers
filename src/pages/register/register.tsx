import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { TRegisterData } from '@api';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/slices/userInfo/userInfoSlice';
import { useDispatch } from '../../services/store';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUserData: TRegisterData = {
      name: name,
      email: email,
      password: password
    };
    dispatch(registerUser(newUserData)).then(() => navigate('/login'));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
