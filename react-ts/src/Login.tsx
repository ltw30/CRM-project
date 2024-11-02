import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/login.module.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      valid = false;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/main');
      } else {
        const data = await response.json();
        if (data.message) {
          setPasswordError(data.message || '로그인에 실패했습니다.');
        }
      }
    } catch (error) {
      setPasswordError('서버에 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h2 className={styles.heading}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={styles.input}
              placeholder='이메일 입력'
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className={styles.input}
              placeholder='비밀번호 입력'
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>
          <button type="submit" className={styles.button}>로그인</button>
          <div className={styles.links}>
            <a href="/find-id" className={styles.link}>아이디 찾기</a> | 
            <a href="/find-password" className={styles.link}>비밀번호 찾기</a> | 
            <a href="/signup" className={styles.link}>회원가입</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
