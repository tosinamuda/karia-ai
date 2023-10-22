const NewlineText = ({ text }: { text: string }) => {
  return text.split("\n").map((str, index) => (
    <p className="" key={index}>
      {str}
    </p>
  ));
};
export default NewlineText;
