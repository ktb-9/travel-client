import React from "react";
import { Stack } from "expo-router";
import { RecoilRoot as OriginalRecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// RecoilRoot의 타입을 재정의합니다
const RecoilRoot: React.FC<React.PropsWithChildren> = OriginalRecoilRoot as any;

export default function RootLayout() {
  // QueryClient 인스턴스를 생성합니다
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* 상단 탭 없애기 */}
        <Stack screenOptions={{ headerShown: false }} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
