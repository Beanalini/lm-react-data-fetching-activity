import { PoemsResponse } from "./poem_container";
import { ChangeEvent, useState } from "react";

type AddPoemProps = {
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
  //setPoems: PoemsResponse;
};
export const AddPoem: React.FC<AddPoemProps> = ({ setPoems }) => {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    author: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputData((currentData) => {
      // console.log(currentData);
      return { ...currentData, [event.target.id]: event.target.value };
    });
  }

  async function handleSubmitPoem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch("poetriumph.com/api/v1/poems", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputData.title,
          body: inputData.body,
          author: inputData.author,
        }),
      });
      if (response.ok) {
        const { poem } = await response.json();
        setPoems((poems) => [...poems, poem]);
        setInputData({ title: "", body: "", author: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Post a New Poem</h2>
      <form onSubmit={handleSubmitPoem} className="add-poem">
        <label>
          Poem Title:{" "}
          <input
            type="text"
            name="title"
            id="title"
            value={inputData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Poem Text:{" "}
          <input
            type="textarea"
            name="body"
            id="body"
            value={inputData.body}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:{" "}
          <input
            type="text"
            name="author"
            id="author"
            value={inputData.author}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add to Collection</button>
      </form>
    </>
  );
};
