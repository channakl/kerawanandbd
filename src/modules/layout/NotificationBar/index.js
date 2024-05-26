import { useState, useEffect } from "react";
import { mergeClasses } from "@/helpers/className";

const DEFAULT_NOTIFICATION_BAR_ATTRIBS = {
    open: false,
    message: 'Notification',
    type: 'info',
    duration: 2500,
};

const CLASSNAME_BY_TYPE = {
    info: mergeClasses('border-green-600', 'text-green-900'),
    error: mergeClasses('border-red-600', 'text-red-900'),
}
const NotificationBar = () => {
    const [notificationBarAttribs, setNotificationBarAttribs] = useState(DEFAULT_NOTIFICATION_BAR_ATTRIBS);
    const showNotification = (attribs = {}) => {
        const {
            message = DEFAULT_NOTIFICATION_BAR_ATTRIBS.message,
            type = DEFAULT_NOTIFICATION_BAR_ATTRIBS.type,
            duration = DEFAULT_NOTIFICATION_BAR_ATTRIBS.duration
        } = attribs;
        setNotificationBarAttribs({
            open: true,
            message, type, duration
        });
    };

    useEffect(() => {
        window.showNotification = showNotification;
    }, []);

    useEffect(() => {
        let notificationBarTimeout;
        if (notificationBarAttribs?.open) {
            const notificationBarDuration = notificationBarAttribs?.duration || DEFAULT_NOTIFICATION_BAR_ATTRIBS.duration;
            notificationBarTimeout = setTimeout(() => {
                setNotificationBarAttribs(DEFAULT_NOTIFICATION_BAR_ATTRIBS);
            }, notificationBarDuration);
        }
        return () => {
            if (notificationBarTimeout) {
                clearTimeout(notificationBarTimeout);
            }
        }
    }, [notificationBarAttribs]);

    return (
        <>
            <div className={mergeClasses(
                'notification-bar',
                'absolute z-[9999] -bottom-0 left-1/2 translate-y-full -translate-x-1/2',
                'w-[480px] max-w-[90vw] py-4 px-6',
                'bg-white rounded-xl',
                'border border-r-8',
                'text-md break-words whitespace-normal',
                notificationBarAttribs.open && '!block -translate-y-8 !transition-all !duration-100',
                CLASSNAME_BY_TYPE[notificationBarAttribs.type]
            )}>{notificationBarAttribs.message}</div>
        </>
    )
}

export default NotificationBar;