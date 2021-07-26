import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {zIndexes} from "./Constants";
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
      if(!Object.entries(userMap).length) return;

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
  }, [userMap]);

  return (
    <>
      {open ?
        <StyledMain enabled={open} >
          <StyledBackground />
          <StyledImageOverlay>
            <FontAwesomeIcon className="clickable ml1" icon={faTimesCircle} onClick={handleClose}/>
            <form>
              <div>
                <input
                  name="name"
                  type="text"
                  value={state.name}
                  onChange={e => {
                    update(prev => ({...prev, name: e.target.value}));
                  }}
                />
              </div>
              <div>
              <textarea
                name="description"
                cols={30}
                rows={5}
                value={state.description}
                onChange={e => {
                  update(prev => ({...prev, description: e.target.value}));
                }}
              />
              </div>
            </form>
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
`;
