import SockJS from "sockjs-client";
import { Client, IFrame, IMessage } from "@stomp/stompjs";
import moment from "moment";
import {
  CalendarMessage,
  StompHandlerProps,
  UserDateRanges,
} from "@/types/calendar/calendar";

const SERVER_URL = "http://localhost:8080/ws";
const SUB_ENDPOINT = "/topic/calendar";
const PUB_ENDPOINT = "/app/calendar";

const createStompHandler = ({
  setIsEnterChat,
  setUserDateRanges,
  setWsClient,
  userId,
}: StompHandlerProps) => {
  let wsClient: Client | undefined;

  const loadInitialData = async () => {
    try {
      // 먼저 시뮬레이션 API 호출
      await fetch("http://localhost:8080/api/calendar/simulate");

      // 그 다음 전체 데이터 로드
      const response = await fetch("http://localhost:8080/api/calendar/all");
      const data: CalendarMessage[] = await response.json();
      console.log("Initial calendar data:", data);

      const initialRanges: UserDateRanges = {};
      data.forEach((message) => {
        if (message.type === "SELECT_DATE") {
          initialRanges[message.userId] = {
            start: message.dateRange.start,
            end: message.dateRange.end,
            userId: message.userId,
          };
        }
      });

      setUserDateRanges(initialRanges);
    } catch (error) {
      console.error("초기 달력 데이터 조회 실패:", error);
    }
  };

  const handleCalendarMessage = (message: CalendarMessage) => {
    if (message.type === "SELECT_DATE") {
      setUserDateRanges((prev) => ({
        ...prev,
        [message.userId]: {
          start: message.dateRange.start,
          end: message.dateRange.end,
          userId: message.userId,
        },
      }));
    } else if (message.type === "CLEAR_DATE") {
      setUserDateRanges((prev) => {
        const newRanges = { ...prev };
        delete newRanges[message.userId];
        return newRanges;
      });
    }
  };

  return {
    connect: () => {
      const client = new Client({
        webSocketFactory: () => new SockJS(SERVER_URL),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: (frame: IFrame) => {
          console.log("[+] 웹소켓에 성공적으로 연결했숩니다.", frame);
          setIsEnterChat(true);
          loadInitialData();
          client.subscribe(SUB_ENDPOINT, (message: IMessage) => {
            const calendarMessage: CalendarMessage = JSON.parse(message.body);
            handleCalendarMessage(calendarMessage);
          });
        },
        onDisconnect: (frame: IFrame) => {
          console.log("[-] 웹소켓 연결 종료.", frame);
          setIsEnterChat(false);
        },
        onStompError: (frame: IFrame) => {
          console.error("브로커 경고 에러: " + frame.headers["message"]);
          console.error("추가적인 설명: " + frame.body);
        },
      });

      setWsClient(client);
      wsClient = client;
      client.activate();
    },

    sendCalendarUpdate: (newDateRange: {
      start: moment.Moment | null;
      end: moment.Moment | null;
    }) => {
      if (wsClient && wsClient.connected) {
        const message: CalendarMessage = {
          type: "SELECT_DATE",
          dateRange: {
            start: newDateRange.start?.format("YYYY-MM-DD") || null,
            end: newDateRange.end?.format("YYYY-MM-DD") || null,
          },
          userId,
        };

        wsClient.publish({
          destination: PUB_ENDPOINT,
          body: JSON.stringify(message),
        });
      }
    },

    clearDateRange: () => {
      if (wsClient && wsClient.connected) {
        const message: CalendarMessage = {
          type: "CLEAR_DATE",
          dateRange: { start: null, end: null },
          userId,
        };

        wsClient.publish({
          destination: PUB_ENDPOINT,
          body: JSON.stringify(message),
        });
      }
    },

    disconnect: () => {
      console.log("[-] Closing WebSocket connection.");
      if (wsClient) {
        wsClient.deactivate();
        setWsClient(undefined);
        setIsEnterChat(false);
      }
    },
  };
};

export default createStompHandler;
