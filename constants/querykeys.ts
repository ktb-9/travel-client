export const queryKeys = {
  example: ["example"] as const,
  upcomming: ["upcomming"] as const,
  hotplace: ["hotplace"] as const,
  getGroup: ["getGroup"] as const,
  getMember: ["getMember"] as const,
  getInvite: ["getInvite"] as const,
  getTrip: ["getTrip"] as const,
  getMyTrip: ["getMyTrip"] as const,
  getPayment: ["getPayment"] as const,
} as const;
type QueryKeys = typeof queryKeys;
export type QueryKey = QueryKeys[keyof QueryKeys];
