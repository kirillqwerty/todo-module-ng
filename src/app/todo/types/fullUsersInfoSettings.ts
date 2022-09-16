import { FullUserInfo } from "./fullUserInfo";

export type fullUserInfoSettings = {
    limit: number;
    skip: string;
    total: number;
    users: FullUserInfo[];
}