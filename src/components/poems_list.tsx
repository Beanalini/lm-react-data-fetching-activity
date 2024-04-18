import { PoemsResponse } from "./poem_container";
import { Poem } from "./poem";

interface PoemsListProps {
  poems: PoemsResponse;
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
}

export const PoemsList: React.FC<PoemsListProps> = ({ poems, setPoems }) => {
  return (
    <>
      <div>
        {poems.map((poem) => (
          <Poem key={poem.id} poem={poem} setPoems={setPoems} />
        ))}
      </div>
    </>
  );
};
