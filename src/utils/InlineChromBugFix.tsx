export default function InlineChromiumBugfix() {
  return (
    <span
      contentEditable={false}
      suppressContentEditableWarning={true}
      style={{ fontSize: 0 }}
    >
      {String.fromCodePoint(160) /* Non-breaking space */}
    </span>
  );
};