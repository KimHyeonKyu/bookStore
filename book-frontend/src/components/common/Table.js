import styled from "styled-components";
import Button from "./Button";
import PagingMoudle from "./PagingMoudle";

const StyledTableWrap = styled.div`
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
`;

const StyledTr = styled.tr`
  vertical-align: middle;
`;

const Table = ({
  boardList,
  onPageChange,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  handleWrite,
  handleRead,
  handleDelete,
}) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handlePageWrite = () => {
    if (localStorage.getItem("id")) {
      handleWrite();
    } else {
      alert("로그인 후 이용해 주세요.");
    }
  };
  const handlePageRead = (e) => {
    handleRead(e);
  };

  const handleDeleteItem = (e) => {
    if (localStorage.getItem("id")) {
      console.log(boardList);
      handleDelete(e);
    } else {
      alert("로그인 후 이용해 주세요.");
    }
  };

  return (
    <StyledTableWrap>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>

            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
            <th scope="col">보기/삭제</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {activePage &&
            boardList.map((data, index) => (
              <StyledTr key={data._id}>
                <td>{(activePage - 1) * 5 + index + 1}</td>
                <td>{data.subject}</td>

                <td>{data.username}</td>
                <td>{data.datetime}</td>
                <td>
                  <ButtonWrap>
                    <Button
                      type="small"
                      data={data._id}
                      onClick={handlePageRead}
                    >
                      보기
                    </Button>

                    {data.id === localStorage.getItem("id") && (
                      <Button
                        data={data._id}
                        type="small"
                        onClick={handleDeleteItem}
                      >
                        삭제
                      </Button>
                    )}
                  </ButtonWrap>
                </td>
              </StyledTr>
            ))}
          {!activePage &&
            boardList.map((data, index) => (
              <StyledTr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.subject}</td>
                <td>{data.username}</td>
                <td>{data.datetime}</td>
                <td>
                  <ButtonWrap>
                    <Button
                      type="small"
                      data={data._id}
                      onClick={handlePageRead}
                    >
                      보기
                    </Button>
                    {data.id === localStorage.getItem("id") && (
                      <Button
                        data={data._id}
                        type="small"
                        onClick={handleDeleteItem}
                      >
                        삭제
                      </Button>
                    )}
                  </ButtonWrap>
                </td>
              </StyledTr>
            ))}
        </tbody>
      </table>
      <PagingMoudle
        onPageChange={handlePageChange}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
      />
      <Button type="middle" variant="danger" onClick={handlePageWrite}>
        작성
      </Button>
    </StyledTableWrap>
  );
};
export default Table;
