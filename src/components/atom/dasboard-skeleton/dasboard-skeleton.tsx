import React from 'react'
import SideBarMember from '../sidebar-member/sidebar-member'

function DasboardSkeleton({ children ,user}) {
  return (
    <div
      className=" relative h-full  py-0 lg:px-15 lg:pt-28 container-box-product px-5  pt-20 lg:pb-20 pb-20"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="grid grid-cols-6 ">
        <SideBarMember name={user.name} created_at={user.created_at} />
        {children}
      </div>
    </div>
  );
}

export default DasboardSkeleton