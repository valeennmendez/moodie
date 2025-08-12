import { useEffect, useState } from "react";
import { X } from "lucide-react";

function UserPreferences({ cantidad, titulo, subtitulo }) {
  const [tags, setTags] = useState([]);
  const [word, setWord] = useState("");

  const handleTags = (e) => {
    e.preventDefault();
    console.log(e);
    if (word !== "" && tags.length < cantidad) {
      setTags([...tags, word]);
    }

    setWord("");
  };

  const deleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div>
      <div className="w-full bg-base-300 min-h-[10rem] rounded-lg p-5">
        <h3 className="text-2xl font-bold text-base-content">{titulo}</h3>
        <span className="text-sm font-semibold text-base-content/70">
          {subtitulo}
        </span>
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-3 py-3">
            <form onSubmit={(e) => handleTags(e)} className="flex w-full gap-3">
              <input
                onChange={(e) => setWord(e.target.value)}
                value={word}
                type="text"
                className="border-2 focus:outline-none focus:ring-0 focus:border-base-content/70 px-3 w-full h-8 border-base-content/20 rounded-md"
              />
              <button
                type="submit"
                className="cursor-pointer font-semibold w-10 rounded-md bg-base-content/20"
              >
                +
              </button>
            </form>
          </div>
          <div className="flex gap-2 flex-row flex-wrap py-2">
            {tags.map((tag, index) => (
              <div className="flex flex-row border-2 rounded-full gap-2 py-0.5 px-2">
                <p className="text-center m-auto" key={index}>
                  {tag}
                </p>
                <span
                  key={index}
                  onClick={() => deleteTag(index)}
                  className="font-semibold cursor-pointer"
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <span className="text-[0.8rem] font-semibold text-base-content/50">
            {tags.length}/{cantidad} elementos
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserPreferences;
