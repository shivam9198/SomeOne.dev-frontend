/* eslint-disable react/prop-types */
function BrandMark({ className = "" }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <span className="brand-mark-core">
        <span className="brand-mark-heart">♥</span>
        <span className="brand-mark-code">{"</>"}</span>
      </span>
    </span>
  );
}

export default BrandMark;
