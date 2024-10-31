// detox.d.ts
import "detox";
import "jest";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeVisible(): R;
      not: {
        toBeVisible(): R;
      };
    }
  }
}
