import { useState, useEffect } from "react";
import axios from "axios";
import BookImageBlock from "./common/BookImageBlock";

const BookSearch = ({ query }) => {
  const [bookSelect, setBookSelect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchQuery = query === false ? "" : `&Query=${query}`;

        const reponse = await axios.get(
          `/ttb/api/ItemSearch.aspx?ttbkey=ttbdnjsvud651636001&Query=${searchQuery}&QueryType=Title&MaxResults=10&Cover=Big&start=1&SearchTarget=Book&output=js&Version=20131101`
        );
        setBookSelect(reponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [query]);

  if (!bookSelect) {
    return null;
  }

  return (
    <>
      {!bookSelect.item[0] ? (
        <>
          <p>
            -입력한 검색어의 철자 또는 띄어쓰기가 정확한지 다시 한번 확인해
            주세요.
          </p>
          <br></br>
          <p>
            -검색어의 단어 수를 줄이거나, 보다 일반적인 검색어를 사용하여 검색해
            보세요.
          </p>
        </>
      ) : (
        bookSelect.item.map((book) => (
          <BookImageBlock key={book.title} bookData={book}></BookImageBlock>
        ))
      )}
    </>
  );
};

export default BookSearch;
