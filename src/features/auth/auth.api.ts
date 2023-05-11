import { instance } from "common/api/common.api";

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
    return instance.post("https://neko-back.herokuapp.com/2.0/auth/forgot", {
      email,
      from: "test-front-admin <ai73a@yandex.by>",
      message:
        "<div>password recovery link:\n" +
        '<a href="http://localhost:3000/#/set-new-password/$token$">\n' +
        "link</a></div> ",
    });
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

// export type ForgotPasswordArg = {
//   email: string;
//   from?: string;
//   message: string;
// };
