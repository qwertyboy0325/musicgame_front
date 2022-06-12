import React, { useEffect, useRef, useState } from "react";
import './NavBar.css'

export function NavBar() {

    // const [user_avatar, user_avatar_isHover] = useHover();
    // const [user_info, user_info_isHover] = useHover();
    const userInfoContentRef = useRef(null)
    const userInfoRef = useRef(null);
    const triggerRef = useRef(null);
    const triggerEvent = {
        onMouseHandler: () => {
            let userInfo = userInfoRef.current;
            userInfo.classList.add("hover");
        },
        onClickHandler: () => {
            // let userInfoContent = userInfoContentRef.current;
            let userInfo = userInfoRef.current;
            let trigger = triggerRef.current;
            trigger.style.display = "none";
            userInfo.classList.remove("hover");
            userInfo.classList.add("open");
        },
        onMouseLeaveHandler: () => {
            let userInfo = userInfoRef.current;
            userInfo.classList.remove("hover");
        }
    }

    return (
        <div>
            <div id="navbar">
                <div id="avatar-trigger" className="trigger"
                    onMouseEnter={triggerEvent.onMouseHandler}
                    onClick={triggerEvent.onClickHandler}
                    onMouseLeave={triggerEvent.onMouseLeaveHandler}
                    ref={triggerEvent.triggerRef}></div>
                <div className="user-info" ref={userInfoRef}>
                    <div className="user-avatar"  ></div>
                    <div className="user-info-content" ref={userInfoContentRef} >
                        {/* <div id="user-avatar" style={{ right: '35%', top: '90%' }}></div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

