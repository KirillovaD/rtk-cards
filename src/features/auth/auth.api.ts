import { instance, instanceHeroku } from "common/api/common.api";
import { emailRecoveryMessage } from "common/constants/emailRecoveryMessage";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  me: () => {
    return instance.post<RegisterResponseType>("auth/me");
  },
  forgotPassword: (email: string) => {
    debugger;
    return instanceHeroku.post("auth/forgot", {
      email,
      from: "test-front-admin <ai73a@yandex.by>",
      message: emailRecoveryMessage,
    });
  },
  setNewPassword(arg: NewPasswordRequestType) {
    return instanceHeroku.post<{ info: string }>("auth/set-new-password", arg);
  },
  logout: () => {
    return instance.delete("auth/me");
  },
};

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">;
export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
};
export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};
export type NewPasswordRequestType = {
  password: string;
  resetPasswordToken: string;
};
