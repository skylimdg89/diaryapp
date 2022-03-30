const DiaryItem = ({ emotion, id, content }) => {
  // console.log("content = ", content);
  return (
    <div className="DiaryItem">
      <span>
        {content} Emotion: {emotion}
      </span>
    </div>
  );
};

export default DiaryItem;
