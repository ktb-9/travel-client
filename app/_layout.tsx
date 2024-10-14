import { Stack } from "expo-router";
import { RecoilRoot } from "recoil";
interface RootLayoutProps {
  children: ReactNode; // children의 타입을 명시적으로 설정
}
export default function RootLayout() {
  return (
    <RecoilRoot>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RecoilRoot>
  );
}
