
import { Text, type TextProps } from "react-native";

type HeadingProps = TextProps & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
};

const headingStyles = {
  1: "text-3xl font-bold text-foreground",
  2: "text-3xl font-bold text-foreground",
  3: "text-xl font-semibold text-foreground",
  4: "text-lg font-semibold text-foreground",
  5: "text-base font-semibold text-foreground",
  6: "text-sm font-semibold text-foreground",
};

export default function Heading({
  level,

  children,
  className = "",
  ...props
}: HeadingProps) {
  return (
    <Text
      role="heading"
      aria-level={level}
      className={`${headingStyles[level]} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
}
