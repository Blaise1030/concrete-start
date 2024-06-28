import {PolymorphicProps} from "@kobalte/core";
import {ValidComponent} from "solid-js";

export const Link = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T>
) => {
  return (
    <a
      href={props.href}
      onClick={(e) => {
        e.preventDefault();
        document.location.href = props.href;
      }}
      {...props}
    />
  );
};
