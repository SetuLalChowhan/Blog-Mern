import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiAnnotation, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { singOutSuccess } from "../redux/user/userSlice";
import { useDispatch,useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=>state.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(singOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56 ">
      <Sidebar.Items>
        <Sidebar.ItemGroup  className="flex flex-col gap-1">  
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.isAdmin?"Admin":"User"}
            labelColor="dark"
            onClick={() => (window.location.href = "/dashboard?tab=profile")}
            className="cursor-pointer"
          >
            Profile
          </Sidebar.Item>
          {
            currentUser.isAdmin && (
              <Link to={'/dashboard?tab=posts'}>
          <Sidebar.Item
            active={tab === "posts"}
            icon={HiDocumentText}
            as='div'
            className="cursor-pointer"
          >
            Post
          </Sidebar.Item>
          </Link>
            )
          }
          {
            currentUser.isAdmin && (
             <>
              <Link to={'/dashboard?tab=users'}>
          <Sidebar.Item
            active={tab === "users"}
            icon={HiOutlineUserGroup}
            as='div'
            className="cursor-pointer"
          >
           Users
          </Sidebar.Item>
          </Link>
              <Link to={'/dashboard?tab=comments'}>
          <Sidebar.Item
            active={tab === "comments"}
            icon={HiAnnotation}
            as='div'
            className="cursor-pointer"
          >
           Comments
          </Sidebar.Item>
          </Link>
             </>
            )
          }

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
