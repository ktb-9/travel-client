// types/createTrip/createTrip.ts

// 기본 위치 좌표 인터페이스
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// 통합된 Location 인터페이스
export interface Location {
  name: string;
  address: string;
  visitTime: string;
}

// LocationItem 컴포넌트 props 인터페이스
export interface LocationItemProps {
  location: Location;
  isLast: boolean;
  onDelete: () => void;
}

// 하루 일정 인터페이스
export interface DayPlan {
  day: number;
  destination: string;
  locations: Location[];
}

// 전체 여행 계획 인터페이스
export interface TripPlan {
  days: DayPlan[];
}
export interface ScheduleData {
  date: string;
  groupId: number;
  groupName: string;
}
