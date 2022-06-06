let _onboardingRoutes = [
  "/",
  "/email-verification",
  "/referral-code",
  "/welcome",
  "/choose-reason",
];
export const userStatusBasedRoute = {
  PENDING: ["/", "/email-verification"],
  REFERRAL: ["/", "/email-verification", "/referral-code"],
  ONBOARDING: _onboardingRoutes,
  POST_ONBOARDING: _onboardingRoutes,
  ACTIVE: [
    "/email-verification",
    "/referral-code",
    "/choose-reason",
  ],
};
