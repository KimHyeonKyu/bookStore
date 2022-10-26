import client from "./client";

// 로그인
export const login = ({ id, password }) => 
    client.post('/api/auth/login', { id, password});

// 회원가입
export const register = ({ id, password, userName, phoneNumber, address, email }) => 
    client.post('/api/auth/register', { id, password, userName, phoneNumber, address, email });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/Check');