"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSubscription } from '@/app/(context)/SubscriptionContext';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const SettingsPage = () => {
    const { subscriptionLevel, setSubscriptionLevel } = useSubscription();
    const [settings, setSettings] = useState({
        language: 'en',
        tone: 'neutral',
        darkMode: false,
    });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        // Load settings from localStorage or API
        const savedSettings = localStorage.getItem('aiGeneratorSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    // @ts-ignore
    const handleSettingChange = (setting, value) => {
        setSettings(prev => ({ ...prev, [setting]: value }));
    };

    const handleSaveSettings = () => {
        // Save settings to localStorage or API
        localStorage.setItem('aiGeneratorSettings', JSON.stringify(settings));
        toast({
            title: "Settings saved",
            description: "Your settings have been successfully saved.",
        });
    };

    // @ts-ignore
    const handleSubscriptionChange = (level) => {
        setSubscriptionLevel(level);
        toast({
            title: "Subscription updated",
            description: `Your subscription has been changed to ${level}.`,
        });
    };

    return (
        <div className="m-4 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Content Generation Settings</h2>
                <div className="mb-4">
                    <label className="block mb-2">Language</label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tone</label>
                    <Select value={settings.tone} onValueChange={(value) => handleSettingChange('tone', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
                
                <div className="flex items-center justify-between mb-4">
                    <span>Dark Mode</span>
                    <Switch 
                        checked={settings.darkMode}
                        onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                    />
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Subscription</h2>
                <div className="flex gap-4">
                    <Button onClick={() => handleSubscriptionChange('free')} variant={subscriptionLevel === 'free' ? 'default' : 'outline'}>Free</Button>
                    <Button className="bg-indigo-200" onClick={() => handleSubscriptionChange('starter')} variant={subscriptionLevel === 'starter' ? 'default' : 'outline'}>Starter</Button>
                    <Button className="bg-pink-200" onClick={() => handleSubscriptionChange('pro')} variant={subscriptionLevel === 'pro' ? 'default' : 'outline'}>Pro</Button>
                    <Button className="bg-blue-200" onClick={() => handleSubscriptionChange('mastermind')} variant={subscriptionLevel === 'mastermind' ? 'default' : 'outline'}>Mastermind</Button>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Feedback</h2>
                <Textarea 
                    value={feedback} 
                    onChange={(e) => setFeedback(e.target.value)} 
                    placeholder="Provide your feedback here..." 
                    className="mb-4"
                />
                <Button className="bg-indigo-500 hover:bg-indigo-600" onClick={() => {
                    toast({
                        title: "Feedback submitted",
                        description: "Thank you for your feedback!",
                    });
                    setFeedback('');
                }}>Submit Feedback</Button>
            </section>

            <Button onClick={handleSaveSettings} className="w-full bg-indigo-500 hover:bg-indigo-600">Save All Settings</Button>
        </div>
    );
};

export default SettingsPage;
