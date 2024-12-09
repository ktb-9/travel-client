import React from "react";
import { Stack } from "expo-router";
import { RecoilRoot as OriginalRecoilRoot } from "recoil";
import { TextDecoder, TextEncoder } from "text-encoding";
import QueryClientProvider from "@/provider/QueryClientProvider";
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
    <QueryClientProvider>
      <RecoilRoot>
        {/* 상단 탭 없애기 */}
        <Stack screenOptions={{ headerShown: false }} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
