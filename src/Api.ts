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

export type Response = {
  id: string;
}

export const uploadImages = async ({files, bindTextId}:{files: File[] | FileList, bindTextId: string}) => {
  const fileUploader = async (file: File) => {
    const convertBase64Promise = new Promise((r) => {
      const fr = new FileReader();
      fr.onload = (e) => {
        r(e.target?.result);
      };
      fr.readAsDataURL(file);
    });
    const base64 = (await convertBase64Promise) as any as string;
    if (base64.length > 100_000) {
      console.error(`base64 size is ${base64.length}`);
    }
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

  await Promise.all(Array.from(files).map(fileUploader));
};
