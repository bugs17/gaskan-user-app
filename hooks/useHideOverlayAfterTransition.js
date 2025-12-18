// hooks/useHideOverlayAfterTransition.ts
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export function useHideOverlayAfterTransition(onFinish) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', () => {
      onFinish();
    });

    return unsubscribe;
  }, [navigation, onFinish]);
}
