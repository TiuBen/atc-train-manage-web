import { Button, Dialog } from "@radix-ui/themes";
import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import { useDialog, useOnDutyUser, SERVER_URL } from "@utils";
import Webcam from "react-webcam";
import {X} from "lucide-react"
const Camera = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    const [isCameraReady, setIsCameraReady] = useState(false); // 新增状态，表示摄像头是否准备好

    const { authStatus } = useOnDutyUser();

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
        onCapture(imageSrc); // 将捕获的图像传递给父组件
    };


    useEffect(() => {
        console.log(authStatus);
        
    }, [authStatus])
    



    return (
        <>
            <div className="relative flex flex-col justify-center gap-2">
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Captured"
                        width={180}
                        height={120}
                        className=" absolute top-0 left-0 border-2 border-blue-700"
                    />
                )}

                <div className=" h-[360px] overflow-hidden w-full">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        height={360}
                        onUserMedia={() => setIsCameraReady(true)} // 摄像头准备好后设置状态为 true
                    />
                </div>

                <Button
                    className=" flex-1"
                    onClick={capture}
                    disabled={authStatus?.verifyResult || authStatus?.canAuth || !isCameraReady}
                >
                    {authStatus?.verifyResult === "VERIFYING"
                        ? "正在验证..."
                        : authStatus?.canAuth
                        ? "验证失败，重新拍照"
                        : "拍照"}
                </Button>
            </div>
        </>
    );
};

function FaceDialog(props) {
    const { dialogPayload, setDialogPayload } = useDialog();
    // const [capturedImage, setCapturedImage] = useState(null);
    const { authStatus, postFaceImageToServerUserGetIn } = useOnDutyUser();
    const handleCapture = (imageSrc) => {
        // setCapturedImage(imageSrc);
        // if (imageSrc) {
        // }
        postFaceImageToServerUserGetIn({ ...dialogPayload, image: imageSrc });
    };

    return (
        <Dialog.Root
            open={dialogPayload?.faceDialogDisplay}
            onOpenChange={() =>
                setDialogPayload((prev) => {
                    return { ...prev, faceDialogDisplay: false };
                })
            }
        >
            <Dialog.Content
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    zIndex: 9999,
                }}
            >
                <Dialog.Title>
                    <div className="flex flex-row flex-1 items-center  gap-4  ">
                        <h1 className="text-4xl font-bold text-blue-600 text-center flex-1">
                            {dialogPayload?.username}
                        </h1>

                        <h1 className="text-2xl font-bold text-red-600 text-center flex-1">
                            {authStatus.verifyResultMsg}
                        </h1>
                        <Button
                            color="red"
                            onClick={() => {
                                setDialogPayload((prev) => {
                                    return { ...prev, faceDialogDisplay: false };
                                })
                            }}
                            className="flex-grow-0 flex-shrink-0  self-end"
                        >
                            <X />
                        </Button>
                    </div>
                </Dialog.Title>
                <Dialog.Description></Dialog.Description>

                <Camera onCapture={handleCapture} username={dialogPayload.username} />
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default FaceDialog;
