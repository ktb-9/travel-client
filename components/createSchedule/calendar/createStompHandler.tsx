import { PUB_ENDPOINT, SERVER_URL, SUB_ENDPOINT } from "@/constants/api";
import {
  CalendarMessage,
  StompHandlerProps,
  UserDateRanges,
} from "@/types/calendar/calendar";
import { Client, IFrame, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const createStompHandler = ({
  setIsEnterChat,
  setUserDateRanges,
  setWsClient,
  userId,
}: StompHandlerProps) => {
  let wsClient: Client | undefined;

  const handleCalendarMessages = (messages: CalendarMessage[]) => {
    const newRanges: UserDateRanges = {};
    messages.forEach((message) => {
      if (message.type === "SELECT_DATE") {
        newRanges[message.userId] = {
          start: message.dateRange.start,
          end: message.dateRange.end,
          userId: message.userId,
          nickname: message.nickname || null,
        };
      }
    });
    setUserDateRanges(newRanges);
  };

  return {
    connect: () => {
      const client = new Client({
        webSocketFactory: () => new SockJS(SERVER_URL),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: (frame: IFrame) => {
          console.log("[+] 웹소켓에 성공적으로 연결했습니다.", frame);
          setIsEnterChat(true);

          // 구독 설정
          client.subscribe(SUB_ENDPOINT, (message: IMessage) => {
            const calendarMessages: CalendarMessage[] = JSON.parse(
              message.body
            );
            handleCalendarMessages(calendarMessages);
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
