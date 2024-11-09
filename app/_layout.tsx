import React from "react";
import { Stack } from "expo-router";
import { RecoilRoot as OriginalRecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TextDecoder, TextEncoder } from "text-encoding";

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
  // QueryClient 인스턴스를 생성합니다
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 30, // 30분
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* 상단 탭 없애기 */}
        <Stack screenOptions={{ headerShown: false }} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
