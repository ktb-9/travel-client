import { Socket, io } from "socket.io-client";
import { AXIOS_BASE_URL } from "@/constants/api";
import { Moment } from "moment";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { SetterOrUpdater } from "recoil";

interface DateRange {
  start: string | null;
  end: string | null;
}

interface CalendarData {
  userId: number;
  nickname: string;
  dateRange: DateRange;
}

interface UserDateRange {
  start: string | null;
  end: string | null;
  userId: string;
  nickname: string | null;
}

interface UserDateRanges {
  [key: string]: UserDateRange;
}

interface SocketHandlerProps {
  setIsConnected: (isConnected: boolean) => void;
  setUserDateRanges: React.Dispatch<React.SetStateAction<UserDateRanges>>;
  setSocket: (socket: Socket | undefined) => void;
  userId: number;
  groupId: number;
  router: ReturnType<typeof useRouter>;
  setTripId: SetterOrUpdater<number>;
}

const createSocketHandler = ({
  setIsConnected,
  setUserDateRanges,
  setSocket,
  userId,
  groupId,
  router,
  setTripId,
}: SocketHandlerProps) => {
  let socket: Socket | undefined;

  const handleCalendarUpdated = (data: {
    groupId: number;
    calendarData: CalendarData;
  }) => {
    setUserDateRanges((prev: UserDateRanges) => ({
      ...prev,
      [data.calendarData.userId]: {
        start: data.calendarData.dateRange.start,
        end: data.calendarData.dateRange.end,
        userId: String(data.calendarData.userId),
        nickname: data.calendarData.nickname,
      },
    }));
  };

  return {
    connect: () => {
      const newSocket = io(AXIOS_BASE_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });
      socket = newSocket;
      setSocket(newSocket);

      // Setup event listeners
      newSocket.on("connect", () => {
        console.log("[+] Socket.IO에 성공적으로 연결했습니다.");
        setIsConnected(true);

        // Join the group room after connection
        newSocket.emit("joinGroup", groupId);

        newSocket.emit("getCalendarDates", { groupId });

        newSocket.on(
          "redirectToTrip",
          (data: { tripId: number; message: string }) => {
            setTripId(data.tripId);
            if (router && router.push) {
              router.push(`/trip/${data.tripId}`);
            } else {
              // 대체 방안
              console.error("Router not initialized");
              Alert.alert("알림", "페이지 이동에 실패했습니다.");
            }
          }
        );
      });

      newSocket.on("disconnect", () => {
        console.log("[-] Socket.IO 연결이 종료되었습니다.");
        setIsConnected(false);
      });

      newSocket.on("error", (error: Error) => {
        console.error("Socket 에러:", error.message);
      });

      newSocket.on(
        "calendarDatesList",
        (data: { groupId: number; calendarData: CalendarData[] }) => {
          const newRanges: UserDateRanges = {};
          data.calendarData.forEach((item) => {
            newRanges[item.userId] = {
              start: item.dateRange.start,
              end: item.dateRange.end,
              userId: String(item.userId),
              nickname: item.nickname,
            };
          });
          setUserDateRanges(newRanges);
        }
      );

      // Listen for all calendar updates
      newSocket.on("calendarUpdated", handleCalendarUpdated);

      newSocket.on(
        "calendarDateCleared",
        (data: { groupId: number; userId: number }) => {
          setUserDateRanges((prev: UserDateRanges) => {
            const newRanges = { ...prev };
            delete newRanges[data.userId];
            return newRanges;
          });
        }
      );
    },

    sendCalendarUpdate: (newDateRange: {
      start: Moment | null;
      end: Moment | null;
    }) => {
      if (!socket?.connected) return;

      const dateRange = {
        start: newDateRange.start?.format("YYYY-MM-DD") || null,
        end: newDateRange.end?.format("YYYY-MM-DD") || null,
      };

      socket.emit("setCalendarDate", {
        groupId,
        userId,
        dateRange,
      });
    },

    clearDateRange: () => {
      if (!socket?.connected) return;

      socket.emit("clearCalendarDate", {
        groupId,
        userId,
      });
    },

    disconnect: () => {
      console.log("[-] Socket.IO 연결을 종료합니다.");
      if (socket) {
        socket.disconnect();
        setSocket(undefined);
        setIsConnected(false);
      }
    },
  };
};

export default createSocketHandler;
