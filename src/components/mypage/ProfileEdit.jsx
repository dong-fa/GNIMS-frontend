import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import inputImgIcon from "../../img/Component01.png";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const imgRef = useRef();
  const profileImage = localStorage.getItem("profileImage");
  const [image, setImage] = useState(profileImage);
  const [imageFile, setImageFile] = useState("");

  const imagePreview = () => {
    const reader = new FileReader();
    reader.readAsDataURL(imgRef.current.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };
  const editProfileAxios = async ({ formData, data, url }) => {
    console.log(data);
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    console.log(blob);
    formData.append("data", blob);
    await axios
      .patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error.response);
        if (data.status === 400) {
          console.log(data.message);
        }
      });
  };
  const editHandler = async () => {
    try {
      // 이미지 파일 업로드
      const formData = new FormData();
      //선택한 파일들 중 첫번째파일 선택
      formData.append("profileImage", imgRef.current.files[0]);
      //fetch를 이용해 서버로 PATCH요청보냄
      const response = await fetch("https://eb.jxxhxxx.shop/users/profile", {
        method: "PATCH",
        body: formData,
      });
      const { imageUrl } = await response.json();
      // 프로필 이미지 업데이트
      localStorage.setItem("profileImage", imageUrl);
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
    }

    // setImageFile(imgRef.current.files[0]);
    // const imgFile = imgRef.current.files[0];
    // const formData = new FormData();
    // //formData객체에 image라는 키에 imgFile변수 추가
    // if (imgFile !== undefined) {
    //   formData.append("image", imgFile);
    // } else {
    //   formData.append("image", null);
    // }
    // const url = "https://eb.jxxhxxx.shop/users/profile";
    // editProfileAxios({ formData, url });
  };
  return (
    <div>
      <div className="text-left text-[25px] font-thin mt-[30px] ml-[15px]">
        현재 설정된 프로필이미지를 <br />
        변경할 수 있어요.
      </div>
      <div className="grid grid-flow-row ml-[20px] mr-[20px]">
        <div className="grid grid-flow-row gap-[9px]">
          <div className="font-[700] text-[32px] text-textBlack"></div>
          <div className="text-textBlack font-[400] text-[24px]">
            <label htmlFor="userName" className="cursor-pointer "></label>
          </div>
        </div>
        <div>
          <div className="mt-[53px]">
            <div className="mt-[75px] mb-[125px] relative">
              <div className="h-[100px] w-[100px] justify-center mx-auto">
                <img
                  className="w-full h-full rounded-full drop-shadow-lg"
                  src={image}
                  alt="프로필이미지"
                />
              </div>
              <div className="h-[40px] w-[40px] justify-center mx-auto absolute right-0 left-14 bottom-0 ">
                <label htmlFor="profileImg">
                  <img
                    className="w-full h-full rounded-full drop-shadow-lg"
                    src={inputImgIcon}
                    alt="프로필이미지"
                  />
                </label>
              </div>
            </div>

            <div>
              <input
                //모든타입의 이미지허용
                accept="image/*"
                id="profileImg"
                type="file"
                ref={imgRef}
                style={{ display: "none" }}
                multiple
                onChange={imagePreview}
              />
            </div>
          </div>
          <button
            className="h-[50px] rounded w-full bg-[#002C51] font-[700] text-[#ffff] mt-[24px]"
            onClick={editHandler}
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
