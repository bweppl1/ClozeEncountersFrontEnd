const Question = ({ spanish, english }) => {
  return (
    <div className="w-full my-5">
      <div className="bg-gray-200 w-full rounded p-10 gap-5 flex flex-col">
        <div className="text-3xl bold mx-auto">{spanish}</div>
        <div className="italic text-gray-600 mx-auto">{english}</div>
      </div>
    </div>
  );
};

export default Question;
