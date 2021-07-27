import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {localStorageKey, zIndexes} from "./Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {end_point, httpToJson, Return, User} from "./Api";
import {ImageMapContext} from "./MainPage";

type State = {
  name: string,
  description: string,
};

export const SettingsOverlay = ({open, onClose}: {open: boolean; onClose: () => void}) => {
  const [state, update] = useState<State>({
    name: '',
    description: '',
  });

  const { userMap } = useContext(ImageMapContext);

  const apply = async (value: State) => {
    return await fetch(`${end_point}/user/create_user`, {
      method: "POST",
      headers: {Authorization: "HelloWorld"},
      body: JSON.stringify(value)
    }).then(httpToJson);
  };

  const handleClose = () => {
    apply(state);
    onClose();
  };

  useEffect(() => {
    (async () => {
      // ユーザー情報のサーバーからの取得（localStorageから取得できなかったときに発動）
      if(!Object.entries(userMap).length) return;

      // localStorageから取得できてれば、ここを通らない。
      if(state.name || state.description) return;

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
      update(myUserValue);
      await apply(myUserValue);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMap]);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keyup', handleKeyup, false);

    // ユーザー初期値
    const localStorageMyUser = localStorage.getItem(localStorageKey.myUser);
    if (localStorageMyUser) {
      update(JSON.parse(localStorageMyUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!state.name) return;
    if(!state.description) return;

    localStorage.setItem(localStorageKey.myUser, JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
                  value={state.name}
                  onChange={e => {
                    update(prev => ({...prev, name: e.target.value}));
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
                  value={state.description}
                  onChange={e => {
                    update(prev => ({...prev, description: e.target.value}));
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
  background: white;
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
