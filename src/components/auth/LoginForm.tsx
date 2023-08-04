import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
const LoginForm: React.FC = ( ) => {
  const navigate = useNavigate()
  const handleLogin = async (values: any) => {
    // alert("TODO 요구사항에 맞추어 기능을 완성해주세요.");
    const { email, password } = values
    try {
      // 물음표를 기준으로 왼쪽이 url 오른쪽이 parameter.
      // http://localhost:4000/users?email=${email}&password=${password}가 있다면
      // http://localhost:4000/users까지를 url이라고 하고
      // email=${email}&password=${password}를 parameter라고 부른다.
      // 그럼 서버에서는 url주소로 일을 처리할 곳을 찾고, parameter를 사용해서 어떤 작업을 해준다.
      // 그리고 위의 예시처럼 파라미터 두 개 보내주면 이 두개를 찾아서 답을 준다.
      
      // 보통 Restful API에서는 "GET"할 때 이렇게 쓰는데,
      // ?를 통해 통신을 하고,
      // &사인으로 각 parameter를 구분한다.
      // 추가 : endpoint는 url이다.
      const response = await axios.get(`http://localhost:4000/users?email=${email}&password=${password}`);
      if (response.data.length <= 0) {
        alert("일치하는 유저를 찾을 수 없습니다.")
        return false
      }
      //shortid 다운받을 때 type shortid?? 이것도 받아야 한대.
      const token = shortid.generate()
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      alert("로그인에 성공하였습니다. 메인 페이지로 이동합니다.")
      navigate('/')
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.")
    }
    
    // console.log("values",values)
    // TODO: email과 password를 DB에서 찾아서 로그인 검증
    // TODO: 일치하는 유저가 없는 경우 "일치하는 유저를 찾을 수 없습니다." alert
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
    // TODO: 성공 시(1), "로그인에 성공하였습니다. 메인 페이지로 이동합니다." alert
    // TODO: 성공 시(2), localStorage에 token과 email을 저장
    // TODO: 성공 시(3), token은 shortId로 생성
    // TODO: 성공 시(4), "/" 라우터로 이동
  };

  return (
    <FormWrapper onFinish={handleLogin}>
      <Form.Item
        label="이메일"
        name="email"
        rules={[{ required: true, message: "이메일을 입력해주세요." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default LoginForm;

const FormWrapper = styled(Form)`
  width: 300px;
`;
