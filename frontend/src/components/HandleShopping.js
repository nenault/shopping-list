import { useState } from "react";

function HandleShopping({ onCreate, onClick, data }) {
  const [item, setItem] = useState("");
  const [search, setSearch] = useState({
    query: "",
    list: [],
  });

  const clearSearch = () => {
    setSearch({
      query: "",
      list: [],
    });
  };

  const handleChange = (event) => {
    setItem(event.target.value);

    if (event.target.value.length >= 2) {
      const results = data.data.filter((post) => {
        if (post.isDeleted === true) {
          return post.text
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        } else {
          return false;
        }
      });
      setSearch({
        query: event.target.value,
        list: results,
      });
    } else {
      clearSearch();
    }
  };

  const handleClick = (item) => {
    onClick(item);
    clearSearch();
    setItem("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(item);
    setItem("");
    clearSearch();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="input is-medium"
          type="search"
          value={item}
          onChange={handleChange}
        />
      </form>
      <div className="tile is-child">
        <ul>
          {search.query === ""
            ? ""
            : search.list.map((post) => {
                return (
                  <li
                    style={{ cursor: "pointer" }}
                    className="box mb-1 has-background-white"
                    key={post._id}
                    onClick={() => handleClick(post)}
                  >
                    {post.text}
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}

export default HandleShopping;
