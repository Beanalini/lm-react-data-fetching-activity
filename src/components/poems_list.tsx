import { PoemsResponse } from "./poem_container";
import { Poem } from "./poem";

interface PoemsListProps {
  poems: PoemsResponse;
}

export const PoemsList: React.FC<PoemsListProps> = ({ poems }) => {
  // receive the data on props and map over it here
  // you can use the Poem component for each item in the list
  console.log("inside poems list");
  console.log(poems);
  console.log(poems[0]);
  return (
    <>
      <p>
        {poems.map((poem) => (
          <Poem poem={poem} />
        ))}
      </p>
    </>
  );
};
