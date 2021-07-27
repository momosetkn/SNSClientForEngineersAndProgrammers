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

export type Like = {
  id: string;
  _updated_at: string;
  like_count: number;
}

export type Return = {
  id: string;
}

export const imageMaxSize = 100_000;

export const uploadImages = async ({base64s, bindTextId}:{base64s: string[], bindTextId: string}) => {
  const fileUploader = async (base64: string) => {

    if (base64.length > imageMaxSize) throw new Error();
    const params = {
      base64,
      bind_text_id: bindTextId,
    }
    await fetch(`${end_point}/image`, {
      method: "POST",
      headers: {Authorization: "evolution"},
      body: JSON.stringify(params),
    }).then((res) => res.json()).then(x => console.log(x));
  };

  await Promise.all(Array.from(base64s).map(fileUploader));
};

export const httpToJson = (res: Response) => res.ok ? res.json() : res.text();