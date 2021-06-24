import React from "react";
import FormInput from "../input-container/input-container";
import { TextArea } from "../input-container/input-container.styles";

function MediaSocialPopup({
  setMediaSocial,
  setSocialMediaName,
  setLinkSocialMedia,
  socialMediaName,
  linkSocialMedia,
}) {
  return (
    <div
      className="absolute top-0 w-full px-2 py-2 bg-white border-2 border-blue-100 "
      style={{ zIndex: 2 }}
    >
      <div className="flex flex-col">
        <FormInput
          name="socialMediaName"
          value={socialMediaName}
          placeholder="Facebook/instagram/Twitter"
          onChange={(e) => setSocialMediaName(e.target.value)}
        />
        <FormInput
          onChange={(e) => setLinkSocialMedia(e.target.value)}
          name="socialMediaLink"
          placeholder="Link Media Social"
          value={linkSocialMedia}
        />
      </div>
      <button
        onClick={() => setMediaSocial(false)}
        type="button"
        className="px-2 py-2 text-white bg-blue-100 "
      >
        Simpan
      </button>
    </div>
  );
}

export default MediaSocialPopup;
