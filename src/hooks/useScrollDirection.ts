import { createSignal, createEffect } from "solid-js";

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = createSignal("up");
  const [lastScrollY, setLastScrollY] = createSignal(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY()) setScrollDirection("down");
    else setScrollDirection("up");
    setLastScrollY(currentScrollY);
  };

  createEffect(() => {
    if (window) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  return { scrollDirection };
};
