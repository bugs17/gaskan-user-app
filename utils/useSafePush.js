import { useRef } from "react";
import { useRouter } from "expo-router";

export function useSafePush(delay = 500) {
  const router = useRouter();
  const locked = useRef(false);

  const safePush = (path) => {
    if (locked.current) return;

    locked.current = true;
    router.push(path);

    setTimeout(() => {
      locked.current = false;
    }, delay);
  };

  return safePush;
}
