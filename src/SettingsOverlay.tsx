import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {colors, localStorageKey, zIndexes} from "./Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {end_point, httpToJson, Return, User} from "./Api";
import {ImageMapContext, PainValue} from "./MainPage";

type Props = {
  open: boolean;
  onClose: () => void;
  pains: PainValue[];
  onChangePains: (value: PainValue[]) => void;
};

export const SettingsOverlay = ({open, onClose, pains, onChangePains}: Props) => {
  const [user, setUser] = useState({
    name: '',
    description: '',
  });
  const [editingPains, setEditingPains] = useState('');

  const { userMap } = useContext(ImageMapContext);

  const apply = async (value: { name: string, description: string }) => {
    return await fetch(`${end_point}/user/create_user`, {
      method: "PUT",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify(value)
    }).then(httpToJson);
  };

  const handleClose = () => {
    apply(user);
    onChangePains(JSON.parse(editingPains));
    onClose();
  };

  useEffect(() => {
    (async () => {
      // ユーザー情報のサーバーからの取得（localStorageから取得できなかったときに発動）
      if(!Object.entries(userMap).length) return;

      // localStorageから取得できてれば、ここを通らない。
      if(user.name || user.description) return;

      const res: Return = await apply({name: '', description: ''});
      const dummyMyUser: User = await fetch(`${end_point}/user/${res.id}`, {
        headers: {Authorization: "HelloWorld"},
      }).then(httpToJson);

      const myUser = userMap[dummyMyUser._user_id];
      if(!myUser) return;

      const myUserValue = {
        name: myUser.name,
        description: myUser.description,
      };
      setUser(myUserValue);
      await apply(myUserValue);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMap]);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keyup', handleKeyup, false);

    // ユーザー初期値
    const localStorageMyUser = localStorage.getItem(localStorageKey.myUser);
    if (localStorageMyUser) {
      setUser(JSON.parse(localStorageMyUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!user.name) return;
    if(!user.description) return;

    localStorage.setItem(localStorageKey.myUser, JSON.stringify(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  useEffect(() => {
    setEditingPains(JSON.stringify(pains, null, 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pains]);

  return (
    <>
      {open ?
        <StyledMain enabled={open} >
          <StyledBackground />
          <StyledImageOverlay>
            <StyledHeaderContainer>
              <div>Settings</div>
              <FontAwesomeIcon className="clickable ml1" icon={faTimesCircle} onClick={handleClose}/>
            </StyledHeaderContainer>
            <StyledForm>
              <div>
                <label htmlFor="SettingsOverlay_name">name</label>
                <input
                  name="name"
                  id="SettingsOverlay_name"
                  type="text"
                  value={user.name}
                  onChange={e => {
                    setUser(prev => ({...prev, name: e.target.value}));
                  }}
                />
              </div>
              <div>
                <label htmlFor="SettingsOverlay_description">description</label>
                <textarea
                  name="description"
                  id="SettingsOverlay_description"
                  cols={30}
                  rows={5}
                  value={user.description}
                  onChange={e => {
                    setUser(prev => ({...prev, description: e.target.value}));
                  }}
                />
              </div>
              <div>
                <label htmlFor="SettingsOverlay_pains">pains</label>
                <textarea
                  name="pains"
                  id="SettingsOverlay_pains"
                  cols={50}
                  rows={15}
                  value={editingPains}
                  onChange={e => {
                    setEditingPains(e.target.value);
                  }}
                />
              </div>
            </StyledForm>
          </StyledImageOverlay>
        </StyledMain> : null
      }
    </>
  );
};

const StyledMain = styled.div<{enabled: boolean}>`
  position: absolute;
  top: 0px;
  z-index: 300;
  width: 100vw;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const StyledBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${zIndexes.previewImagesBackground};
  top: 0px;
  background: gray;
  opacity: 0.5;
`;

const StyledImageOverlay = styled.div`
  z-index: ${zIndexes.settings};
  background: ${colors.background};
  padding: 16px;
  border-radius: 8px;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledForm = styled.div`
  & label {
    display: block;
    margin-top: 8px;
  }
`;
