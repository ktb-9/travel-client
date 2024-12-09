import React, { useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from "@tanstack/react-query";
import { NETWORK } from "@/constants/api";

// React Query 클라이언트 생성 함수
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // 윈도우 포커스 시 데이터 재요청
        refetchOnWindowFocus: true,

        // 컴포넌트 마운트 시 데이터 재요청
        refetchOnMount: true,

        // 네트워크 재연결 시 데이터 재요청
        refetchOnReconnect: true,

        // 재시도 로직 커스터마이징
        retry: (failureCount, error) => {
          // 특정 오류 타입에 대해 재시도 방지
          if (error instanceof TypeError) return false;
          return failureCount < NETWORK.RETRY_COUNT; // 최대 2회 재시도
        },

        // 재시도 지연 시간 (exponential backoff)
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

        // 데이터 만료 시간 (10분)
        staleTime: 1000 * 60 * 10,

        // 가비지 컬렉션 시간 (1시간)
        gcTime: 1000 * 60 * 60,

        // 조건부 쿼리 실행
        enabled: true,
      },
      mutations: {
        // 뮤테이션 에러 핸들링
        onError: (error) => {
          console.error("뮤테이션 오류:", error);
        },
      },
    },
  });

const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = useMemo(() => createQueryClient(), []);
  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
};
export default QueryClientProvider;
