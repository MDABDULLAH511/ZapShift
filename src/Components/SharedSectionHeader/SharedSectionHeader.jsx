import React from "react";

const SharedSectionHeader = ({
  title,
  subtitle,
  titleClass,
  subtitleClass,
  align,
  parentClass,
}) => {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";
  return (
    <div className={`max-w-[80%] mb-5 ${alignClass} ${parentClass}`}>
      {/* title */}
      {title && (
        <h3 className={`text-[40px] font-extrabold mb-6 ${titleClass}`}>
          {title}
        </h3>
      )}

      {/* Subtile */}
      {subtitle && <p className={`${subtitleClass}`}>{subtitle}</p>}
    </div>
  );
};

export default SharedSectionHeader;
