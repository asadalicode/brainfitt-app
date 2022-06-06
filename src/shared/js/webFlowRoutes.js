import { UserStatus } from "./enums";

export const webFlowRoutes = [
  {
    status: UserStatus.pending,
    route: "/email-verification",
  },
  {
    status: UserStatus.referral,
    route: "/referral-code",
  },
  {
    status: UserStatus.onboarding,
    route: "/choose-reason",
  },
  {
    status: UserStatus.postOnboarding,
    route: "/choose-reason",
  },
  {
    status: UserStatus.active,
    route: "/dashboard",
  },
  {
    status: UserStatus.deleted,
    route: "/",
  },
];
