import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Otp from "./modules/auth/components/otp/otp";
import SignUp from "./modules/auth/components/signup/signup";
import CaseStudies from "./modules/home/caseStudies/caseStudies";
import ChooseReason from "./modules/home/chooseReason/chooseReason";
import Premium from "./modules/home/premium/premium";
import PurchaseProgram from "./modules/home/purchaseProgram/purchaseProgram";
import SelectProblem from "./modules/home/selectProblem/selectProblem";
import Welcome from "./modules/home/welcome/welcome";
import Dashboard from "./modules/dashboard/dashboard";
import DashboardHome from "./modules/dashboard/dashboardHome/dashboardHome";
import Boost from "./modules/dashboard/boost/boost";
import Settings from "./modules/dashboard/settings/settings";
import ShareFeeling from "./modules/home/shareFeeling/shareFeeling";
import SelectMultipleProblem from "./modules/home/selectMultipleProblem/selectMultipleProblem";
import Notification from "./modules/dashboard/notification/notification";
import VirtualMeeting from "./modules/dashboard/virtualMeeting/virtualMeeting";
import PageNotFound from "./shared/components/pageNotFound/pageNotFound";
import RequireAuth from "./modules/auth/components/requireAuth/requireAuth";
import EmailVerification from "./modules/auth/components/emailVerification/emailVerification";
import EmpowerOuterContainer from "./modules/dashboard/empowerment/empowerOuterContainer";
import UnstoppableOuterContainer from "./modules/dashboard/unstoppable/unstoppableOuterContainer";
import SuccessPaid from "./modules/dashboard/successPaid/successPaid";
import VirtualMeetingSuccessPaid from "./modules/dashboard/virtualMeeting/virtualMeetingSuccessPaid/virtualMeetingSuccessPaid";
import Explore from "./modules/dashboard/explore/explore";
import Messages from "./modules/chat/components/messages/messages";
import ReferralCode from "./modules/auth/components/referralCode/referralCode";

const routes = [
  { path: "/", component: <SignUp />, protectedPath: false },
  { path: "otp", component: <Otp />, protectedPath: true },
  { path: "explore", component: <Explore />, protectedPath: false },
  {
    path: "email-verification",
    component: <EmailVerification />,
    protectedPath: true,
  },
  {
    path: "referral-code",
    component: <ReferralCode />,
    protectedPath: true,
  },
  {
    path: "purchase-program",
    component: <PurchaseProgram />,
    protectedPath: false,
  },
  { path: "premium", component: <Premium />, protectedPath: true },
  { path: "plans", component: <Premium />, protectedPath: false },
  { path: "welcome", component: <Welcome />, protectedPath: false },
  { path: "choose-reason", component: <ChooseReason />, protectedPath: true },
  {
    path: "select-problem",
    component: <SelectProblem />,
    protectedPath: true,
  },
  { path: "case-studies", component: <CaseStudies />, protectedPath: true },
  { path: "share-feeling", component: <ShareFeeling />, protectedPath: true },
  {
    path: "select-multiple-problem",
    component: <SelectMultipleProblem />,
    protectedPath: true,
  },
  {
    path: "dashboard",
    component: <Dashboard />,
    protectedPath: true,
    childRoutes: [
      { path: "", component: <DashboardHome />, protectedPath: false },
      { path: "boost", component: <Boost />, protectedPath: false },
      {
        path: "empowerment",
        component: <EmpowerOuterContainer />,
        protectedPath: false,
      },
      {
        path: "success-paid",
        component: <SuccessPaid />,
        protectedPath: false,
      },
      {
        path: "unstoppable-success-paid",
        component: <SuccessPaid />,
        protectedPath: false,
      },
      {
        path: "success-paid-virtual-meeting",
        component: <VirtualMeetingSuccessPaid />,
        protectedPath: false,
      },
      {
        path: "unstoppable",
        component: <UnstoppableOuterContainer />,
        protectedPath: false,
      },
      { path: "settings", component: <Settings />, protectedPath: false },
      {
        path: "notification",
        component: <Notification />,
        protectedPath: false,
      },
      { path: "messages", component: <Messages />, protectedPath: false },
      {
        path: "virtual-meeting",
        component: <VirtualMeeting />,
        protectedPath: false,
      },
    ],
  },
  { path: "not-found", component: <PageNotFound />, protectedPath: false },
];

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component, childRoutes, protectedPath }) => (
          <Route
            key={Math.random()}
            path={path}
            element={
              <RequireAuth protectedPath={protectedPath}>
                {component}
              </RequireAuth>
            }
          >
            {childRoutes?.length > 0 &&
              childRoutes.map(({ path, component }) => (
                <Route key={Math.random()} path={path} element={component} />
              ))}
          </Route>
        ))}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouting;
