export const end_point = "https://versatileapi.herokuapp.com/api";

type Base = {
  id: string;
  _created_at: string;
  _updated_at: string;
  _user_id: string;
}

export type Text = Base & {
  text: string;
  in_reply_to_user_id?: string; //返信対象のUserId
  in_reply_to_text_id?: string; //返信対象のTextId
}

export type Image = Base & {
  base64: string;
  bind_text_id: string;
}

export type User = Base & {
  description: string;
  name: string;
}