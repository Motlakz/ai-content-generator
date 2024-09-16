"use client"

import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useNotification } from '@/app/(context)/NotificationContext';

interface Notification {
    id: number;
    type: 'success' | 'info' | 'warning';
    title: string;
    message: string;
    read: boolean;
}

const NotificationItem: React.FC<{
    notification: Notification;
    onDismiss: (id: number) => void;
    onAction: (notification: Notification) => void;
}> = ({ notification, onDismiss, onAction }) => {
    const icons = {
        info: Info,
        success: CheckCircle,
        warning: AlertTriangle,
    };
    const Icon = icons[notification.type] || Bell;

    return (
        <div 
            className={`flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${
                notification.type === 'success' ? 'border-green-500' :
                notification.type === 'warning' ? 'border-yellow-500' :
                'border-blue-500'
            } cursor-pointer ${notification.read ? 'opacity-50' : ''}`} // Add opacity if read
            onClick={() => onAction(notification)}
        >
            <div className="flex items-center">
                <Icon className={`mr-4 ${
                    notification.type === 'success' ? 'text-green-500' :
                    notification.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                }`} />
                <div>
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <p className="text-gray-600">{notification.message}</p>
                </div>
            </div>
            <Button 
                variant="ghost" 
                onClick={(e) => { e.stopPropagation(); onDismiss(notification.id); }} 
                className="hover:bg-gray-100 rounded-full p-2"
            >
                <X size={18} />
            </Button>
        </div>
    );
};

const Notifications = () => {
    const { setNotificationCount } = useNotification();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/api/notifications');
            console.log('API response:', response.data);
            if (Array.isArray(response.data)) {
                setNotifications(response.data);
                setNotificationCount(response.data.filter(notif => !notif.read).length); // Update the notification count based on unread notifications
            } else {
                console.error('Unexpected data structure:', response.data);
                setNotifications([]);
                setNotificationCount(0); // Reset count if unexpected structure
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            setNotifications([]);
            setNotificationCount(0); // Reset count on error
        }
    };

    const dismissNotification = async (id: number) => {
        try {
            await axios.post('/api/notifications', { action: 'dismiss', notificationId: id });
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        } catch (error) {
            console.error('Failed to dismiss notification:', error);
            // Handle error
        }
    };

    const clearAllNotifications = async () => {
        try {
            await axios.post('/api/notifications', { action: 'clearAll' });
            setNotifications([]);
        } catch (error) {
            console.error('Failed to clear notifications:', error);
            // Handle error
        }
    };

    const handleNotificationAction = (notification: Notification) => {
        // Mark the notification as read
        setNotifications(prevNotifications => 
            prevNotifications.map(notif => 
                notif.id === notification.id ? { ...notif, read: true } : notif
            )
        );
    
        // Decrement the notification count
        setNotificationCount(prevCount => Math.max(prevCount - 1, 0)); // Ensure it doesn't go below 0
    
        switch (notification.title) {
            case 'Content Generated':
                router.push('/dashboard/history');
                break;
            case 'Approaching Usage Limit':
            case 'Usage Limit Reached':
                router.push('/dashboard/billing');
                break;
            default:
                console.log('No action defined for this notification');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <Button 
                    onClick={clearAllNotifications}
                    variant="outline"
                    className="text-blue-500 border-blue-500 hover:bg-blue-50"
                >
                    Clear All
                </Button>
            </div>
            {!Array.isArray(notifications) ? (
                <p className="text-gray-600 text-center py-8">Error loading notifications</p>
            ) : notifications.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No new notifications</p>
            ) : (
                notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onDismiss={dismissNotification}
                        onAction={handleNotificationAction}
                    />
                ))
            )}
        </div>
    );
};

export default Notifications;
