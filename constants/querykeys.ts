export const queryKeys = {
  example: ["example"] as const,
  upcomming: ["upcomming"] as const,
  hotplace: ["hotplace"] as const,
  getGroup: ["getGroup"] as const,
  getMember: ["getMember"] as const,
  getPrevious: ["getPrevious"] as const,
  getPaymentMember: ["getPaymentMember"] as const,
  getInvite: ["getInvite"] as const,
  getTrip: ["getTrip"] as const,
  getMyTrip: ["getMyTrip"] as const,
  getPayment: ["getPayment"] as const,
  getAnalysis: ["getAnalysis"] as const,
} as const;
type QueryKeys = typeof queryKeys;
export type QueryKey = QueryKeys[keyof QueryKeys];
