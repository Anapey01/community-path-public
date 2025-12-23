import React, { useEffect } from 'react';

const VisualEffects = () => {
    // --- DYNAMIC FAVICON LOGIC (Zero Performance Cost) ---
    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                document.title = "Your Future is Waiting... | Community Path";
            } else {
                document.title = "The Community Path Project | EdTech for Ghana's Future Leaders";
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    return (
        <>
            {/* 
          REMOVED: Scroll Progress Bar (User Request)
          REMOVED: Custom Cursor (User Request / Performance)
          REMOVED: Noise Overlay (Performance for Rural Devices)
      */}
            {/* Keeps the component mounted for Favicon logic, but renders nothing visible */}
        </>
    );
};

export default VisualEffects;
