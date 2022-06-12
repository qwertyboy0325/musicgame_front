import React, { useEffect, useRef, useState } from "react";
import './NavBar.css'

export function NavBar() {
    const [user_avatar, user_avatar_isHover] = useHover();
    const [user_info, user_info_isHover] = useHover();
    return (
        <div>
            <div id="navbar">
                <div id="user-avatar" ref={user_avatar} style={{ opacity: user_avatar_isHover || user_info_isHover ? '0%' : '100%' }}></div>
            </div>
            <div id="trigger">
                <div id="user-info" ref={user_info} style={{ display: user_avatar_isHover || user_info_isHover ? 'block' : 'none' }}>
                    <div id="user-avatar" style={{ right: '35%', top: '90%' }}></div>
                </div>
            </div>
        </div>
    )
}

const useHover = () => {
    const [value, setValue] = useState(false);
    const ref = useRef(null);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);
        }
    });
    return [ref, value];
}