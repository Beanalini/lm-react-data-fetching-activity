import { ChangeEvent, SetStateAction } from "react";
import { PoemData, PoemsResponse } from "./poem_container";

interface PoemProps {
  poem: PoemData;
  setPoems: React.Dispatch<SetStateAction<PoemsResponse>>;
}

export const Poem: React.FC<PoemProps> = ({
  poem: { id, title, body, author, isLiked },
  setPoems,
}) => {
  const handleIsLiked = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await fetch("/poetriumph.com/api/v1/poems", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.target.id,
          isLiked: event.target.checked,
        }),
      });
      if (response.ok) {
        const updatedPoem = await response.json();

        setPoems((prevPoems) => {
          prevPoems.forEach((poem, index) => {
            if (poem.id === updatedPoem.id) {
              prevPoems[index].isLiked = updatedPoem.isLiked;
            }
          });
          return [...prevPoems];
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <li key={id} className="poem-item">
        <h3>{title}</h3>
        <p className="poem-text">{body}</p>
        <p>{author}</p>
        <label>
          Like:{" "}
          <input
            className="tick-box"
            type="checkbox"
            id={id.toString()}
            checked={isLiked}
            onChange={handleIsLiked}
          />
        </label>
      </li>
    </>
  );
};
