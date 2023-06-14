import React, { useContext } from 'react';
import { UserContext } from '../../contexts/context';  

function User() {
    const { userState } = useContext(UserContext);  // context.js에서 UserContext 불러옴
    const { user } = userState;  

    if (!user) {
        return <div>사용자가 로그인하지 않았습니다.</div>;
    }

    console.log(user);

    if (!user.nickName) {
        return <div>사용자 정보를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div>
        <h1>{user.nickName}님, 환영합니다!</h1>
        {/* <p>당신의 생년월일: {user.birthDate}</p>
        <p>당신의 성별: {user.gender}</p> */}
        </div>
    );
}

export default User;
