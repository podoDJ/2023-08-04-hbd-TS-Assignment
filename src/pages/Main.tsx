import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import axios from "axios";

const Main: React.FC<any> = () => {
  const [data, setData] = useState([]);
  const [contents, setContents] = useState<string>("");
  const currentEmail = localStorage.getItem("email");
  const fetchData = async () => {
    // alert("TODO 요구사항에 맞추어 기능을 완성해주세요.");
    try {
      const boards = await axios.get("http://localhost:4000/boards");
      setData(boards.data);
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
      return false;
    }

    // TODO: 데이터베이스에서 boards 리스트 가져오기
    // TODO: 가져온 결과 배열을 data state에 set 하기
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
  };

  useEffect(() => {
    // TODO: 해당 useEffect는 최초 마운트시에만 동작하게 제어
    fetchData();
  }, []);

  const handleBoardSubmit = async (e: any) => {
    // alert("TODO 요구사항에 맞추어 기능을 완성해주세요.");
    e.preventDefault();
    try {
      //axios는 post할 때 객체로 보낸다.
      const postBoard = {
        email: currentEmail,
        contents,
        isDeleted: false,
      };
      await axios.post("http://localhost:4000/boards", postBoard);
      alert("작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다.");
      window.location.reload();
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
      return false;
    }
    // TODO: 자동 새로고침 방지
    // TODO: 이메일과 contents를 이용하여 post 요청 등록(isDeleted 기본값은 false)
    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
    // TODO: 성공한 경우, "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다." alert
    // TODO: 처리완료 후, reload를 이용하여 새로고침
  };

  const handleInputChange = (e: any) => {
    setContents(e.target.value);
  };
  // 아니 왜 여러번 새로고침하거나 삭제를 시도해야 e.target.id가 잡히는거지??
  // 그거 e.currentTarget.id로 하면 한번에 잡힘.
  // target만으로는 버블링이 안된다네?
  // 그래서 버튼 안의 텍스트를 클릭하면
  // target이 button이 아니라 텍스트가 잡혀서 undefined or 빈값이 뜨는 거래.
  const handleBoardDelete = async (e: any) => {
    e.preventDefault();
    const id: string = e.currentTarget.id;

    try {
      // !만 붙여서 boolean으로 형변환 하는 시도는 실패함.
      // why? e.currentTarget.value로 나온 값은 string인데,
      // !string을 해버리면 그냥 false만 나오잖아...
      // 그래서 삼항연산자로 현재 isDeleted가 false(string)면 바꿔줄 값인 true(boolean)로 할당하게 함. 
      // 이미  true(string)이면 false(boolean)가 할당되게 하고.
      const isDeletedChange: boolean = e.currentTarget.value === "false" ? true : false;
      console.log(isDeletedChange);
      // axios.patch의 경우 바꿀 주소/컬렉션/id랑 바꿀 녀석을 객채로 넘겨줘야 한다.
      await axios.patch(`http://localhost:4000/boards/${id}`, {
        isDeleted: isDeletedChange,
      });
      alert("삭제가 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다.");
      window.location.reload();
    } catch (error) {
      alert("삭제오류발생");
      return false;
    }
  };

  return (
    <MainWrapper>
      <h1>메인 리스트 페이지</h1>
      <StyledForm onSubmit={handleBoardSubmit}>
        <StyledInput placeholder="방명록을 입력해주세요." value={contents} onChange={handleInputChange} />
      </StyledForm>
      <ListWrapper>
        {data
          //방명록 삭제용 filter method
          .filter((item: any) => item.isDeleted === false)
          .map((item: any, index) => (
            <ListItem key={item.id}>
              <span>
                {index + 1}. {item.contents}
              </span>
              {/* // TODO: 로그인 한 user의 이메일과 일치하는 경우에만 삭제버튼 보이도록 제어 */}
              {currentEmail === item.email && (
                <Button id={item.id} value={item.isDeleted} onClick={(e) => handleBoardDelete(e)}>
                  삭제
                </Button>
              )}
            </ListItem>
          ))}
      </ListWrapper>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 50%;
  padding: 10px;
`;

const ListItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  width: 50%;
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;
