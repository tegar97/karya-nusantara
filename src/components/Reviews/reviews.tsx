import moment from 'moment';
import React from 'react'

function Reviews({ review }) {
  return (
    <div className="flex-row w-full flex lg:mb-10 border-b border-gray-200 pb-5">
      <img
        src="https://images.tokopedia.net/img/cache/100-square/default_picture_user/default_toped-16.jpg"
        className="border rounded-full w-12 h-12"
      />
      <div className="flex-col ml-4 ">
        <span className="font-semiBold">{review.buyers.name}</span>
        <div className="flex flex-row mt-1 items-center ">
          <div className="items-center flex flex-row  ">
            <img src="/assets/icon/star-yellow.svg" className="lg:w-5 lg:h-5" />
            <span className="font-bold ml-1 text-sm">{review.stars}/5</span>
          </div>
          <span className="text-gray-400 text-xs ml-2">
            {moment(review.created_at).format("DD MMM  YY")}
          </span>
        </div>
        <div className="mt-2">
          <p
            className="text-sm w-full text-gray-700"
            style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
          >
            {review.review}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reviews