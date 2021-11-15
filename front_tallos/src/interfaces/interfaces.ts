export interface PropsChat {
  id: string;
  name: string;
}

export interface GroupsModel{
  id: string
  name: string
}

export interface Message {
  name: string
  message: string
}

export interface reponseLogin extends Response {
  token: string
  userId: string
  userName: string
}
