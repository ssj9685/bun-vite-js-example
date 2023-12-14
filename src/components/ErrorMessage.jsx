/**
 *
 * @param {Object} props
 * @param {String} props.text
 * @returns
 */
export function ErrorMessage(props) {
  const { text } = props;

  return (
    <div
      style={{
        color: "red",
      }}
    >
      {text}
    </div>
  );
}
