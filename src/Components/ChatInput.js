import React, { useState } from "react";
import styled from "styled-components";
import { DialogContent, DialogTitle } from "@material-ui/core";
import { storage } from "../firebase";
// importing for the emoji picker 
import Picker from "emoji-picker-react";
//icons
import MoodIcon from "@material-ui/icons/Mood";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Dialog from "@material-ui/core/Dialog";
import SendIcon from "@material-ui/icons/Send";


function ChatInput({ sendMessage }) {
   const [videoUrl, setVideoUrl] = useState([]);
   const [fileUrl, setFileUrl] = useState([]);
   const [messageData, setMessageData] = useState({
     message: "",
     files: [],
     videos: [],
     voice: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSendButton, setDialogSendButton] = useState(false);

  const [emojiBox, setEmojiBox] = useState(false);

  const send = (e) => {
    e.preventDefault();
    if (messageData.message.length > 0) {
      sendMessage(messageData);
    }

    setMessageData({
      message: "",
      files: [],
      videos: [],
    });
    setFileUrl([]);
    setVideoUrl([]);
    setDialogOpen(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessageData({
      message: messageData.message + emojiObject.emoji,
      video: videoUrl,
      files: fileUrl,
    });
  };

  const AttachFilesSend = (e) => {
    if (messageData.videos.length > 0 || messageData.files.length > 0) {
      sendMessage(messageData);
    } else {
      alert("please Select a File");
    }

    setMessageData({
      message: "",
      files: [],
      videos: [],
    });
    setFileUrl([]);
    setVideoUrl([]);
    setDialogOpen(false);
  };

  const onfileChange = async (e) => {
    setDialogSendButton(false);
    const file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif"
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const link = await fileRef.getDownloadURL();
      setFileUrl((files) => [...files, link]);
      await setMessageData({
        message: messageData.message,
        files: [...fileUrl, link],
        videos: messageData.videos,
      });
    } else if (
      file.type === "video/mp4" ||
      file.type === "video/webm" ||
      file.type === "video/avi" ||
      file.type === "video/mov" ||
      file.type === "video/wmv" ||
      file.type === "video/webp"
    ) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const link = await fileRef.getDownloadURL();
      setVideoUrl((videoUrl) => [...videoUrl, link]);
      await setMessageData({
        message: messageData.message,
        videos: [...videoUrl, link],
        files: messageData.files,
      });
    }
    setDialogSendButton(true);
  };

  return (
    <Container>
      <Dialog open={dialogOpen} maxWidth="md" fullWidth={true}>
        <DialogTitle>
          <Title>
            <h3>Attach Files</h3>
            <p
              onClick={() => {
                setDialogOpen(false);
                setFileUrl([]);
              }}
            >
              X
            </p>
          </Title>
        </DialogTitle>
        <DialogContent>
          <FileContainer>
            <div className="files">
              {fileUrl?.map((file) => (
                <div
                  className="image__cont"
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "1px solid green",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={file}
                    alt="some thing went wrong"
                    style={{
                      width: "100%",

                      imageRendering: "pixelated",
                    }}
                  />
                </div>
              ))}

              {videoUrl?.map((video) => (
                <div
                  className="video__cont"
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "1px solid green",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <video src={video} alt="" width="100%" height="100%" />
                </div>
              ))}
            </div>

            <div className="btns">
              <input
                type="file"
                title=""
                name="attachfile"
                id="attachfile"
                accept="image/*,video/*"
                onChange={(e) => {
                  onfileChange(e);
                }}
              />
              <div className="send__btn">
                <SendIcon
                  onClick={() => {
                    if (dialogSendButton) {
                      AttachFilesSend();
                    } else {
                      alert("please wait");
                    }
                  }}
                />
              </div>
            </div>
          </FileContainer>
        </DialogContent>
      </Dialog>

      {emojiBox && <Picker onEmojiClick={onEmojiClick} />}

      <EmojiIcon onClick={() => setEmojiBox(!emojiBox)} />
      <AttachIcon onClick={() => setDialogOpen(!dialogOpen)} />

      <MessageInputContainer>
        <form onSubmit={send}>
          <input
            type="text"
            placeholder="Type in your Message"
            value={messageData.message}
            onChange={(e) =>
              setMessageData({
                message: e.target.value,
              })
            }
          />
        </form>
      </MessageInputContainer>

      
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  height: 60px;
  width: 100%;
  min-height: 60px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  position: relative;
  .emoji-picker-react {
    position: absolute;
    bottom: 70px;
    left: 20px;
  }

  ._1ceqH {
    position: absolute;
    bottom: 70px;
    right: 10px;
  }

  .recorder__container {
    display: flex;
    width: 200px;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
    transition: 2s ease-in;
  }

  .recorder__closeIcon {
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    border-radius: 50%;
    height: 35px;
    color: red;
    margin-left: 10px;
  }
  .recorder__checkIcon {
    border: 1px solid green;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    border-radius: 50%;
    height: 35px;
    color: green;
  }
`;

const EmojiIcon = styled(MoodIcon)`
  margin-left: 20px;
  font-size: 25px !important;
  font-weight: 300 !important;
  color: #868383;
  cursor: pointer;
`;

const AttachIcon = styled(AttachFileIcon)`
  margin-left: 15px;
  font-size: 25px !important;
  font-weight: 300 !important;
  color: #868383;
  cursor: pointer !important;
`;

const MessageInputContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  form {
    input {
      width: 100%;
      height: 35px;
      border-radius: 30px;
      border: none;
      padding-left: 15px;
      outline: none;
    }
  }
`;


const Title = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    cursor: pointer;
  }
  h3 {
    font-weight: 500 !important;
  }
`;

const FileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .btns {
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      color: transparent;
    }
    .send__btn {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: white;
      height: 40px;
      background-color: #128c7e;
      cursor: pointer;

      :hover {
        background-color: #075e54;
      }
    }
  }

  .files {
    min-height: 100px;
    height: fit-content;
    max-height: 500px;
    overflow-y: scroll;
    width: 680px;
    margin: 20px;
    display: grid;
    grid-template-columns: repeat(3, 200px);
    grid-gap: 20px;
    ::-webkit-scrollbar {
      width: 6px;
      scroll-behavior: smooth;
    }
    ::-webkit-scrollbar-thumb {
      background: #b6b6b6;
    }
  }

  .add_caption {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      height: 30px;
      margin-bottom: 10px;
      padding-left: 10px;
      font-size: 15px;

      width: 70%;
      border: none;
      outline: none;
      border-bottom: 2px solid #128c7e;
    }
  }
`;
