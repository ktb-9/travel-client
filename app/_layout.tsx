import React from "react";
import { Stack, useRouter } from "expo-router";
import { RecoilRoot as OriginalRecoilRoot } from "recoil";
import { TextDecoder, TextEncoder } from "text-encoding";
import QueryClientProvider from "@/provider/QueryClientProvider";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Error from "@/components/Error/Error";
import Toast from "react-native-toast-message"; // 추가
// TextEncoder와 TextDecoder 설정
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}
// RecoilRoot의 타입을 재정의합니다
const RecoilRoot: React.FC<React.PropsWithChildren> = OriginalRecoilRoot as any;

export default function RootLayout() {
  return (
    <>
      <ErrorBoundary Fallback={Error}>
        <QueryClientProvider>
          <RecoilRoot>
            <Stack screenOptions={{ headerShown: false }} />
          </RecoilRoot>
        </QueryClientProvider>
      </ErrorBoundary>
      <Toast />
    </>
  );
}
