"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/app/(context)/SubscriptionContext'
import { useRouter } from 'next/navigation'
import { HiOutlineCurrencyDollar, HiOutlineTemplate, HiOutlineClock, HiOutlineSparkles, HiOutlineMail, HiOutlineBell } from 'react-icons/hi'
import { InfinityIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { FaRobot } from 'react-icons/fa'

const plans = [
    {
        name: 'A taste of logic',
        price: 'Free',
        features: [
            { text: '10 000 credits/month', icon: HiOutlineCurrencyDollar },
            { text: 'Basic support', icon: HiOutlineMail },
            { text: '1 Week of History', icon: HiOutlineClock },
        ],
        color: 'bg-white hover:bg-gray-50',
        buttonColor: 'bg-gray-500 hover:bg-gray-600',
        level: 'free',
    },
    {
        name: 'Content Starter',
        price: '$4.99',
        features: [
            { text: '25 000 credits/month', icon: HiOutlineCurrencyDollar },
            { text: 'Email support', icon: HiOutlineMail },
            { text: '1 Month of History', icon: HiOutlineClock },
        ],
        color: 'bg-gradient-to-br from-indigo-100 to-indigo-200 hover:from-indigo-50 hover:to-indigo-300',
        buttonColor: 'bg-indigo-500 hover:bg-indigo-600',
        level: 'starter',
    },
    {
        name: 'Blox Pro',
        price: '$12.99',
        features: [
            { text: '50 000 credits/month', icon: HiOutlineCurrencyDollar },
            { text: 'Priority email support', icon: HiOutlineMail },
            { text: 'Post reminders', icon: HiOutlineBell },
            { text: '1 Year of History', icon: HiOutlineClock },
        ],
        color: 'bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200',
        buttonColor: 'bg-pink-400 hover:bg-pink-500',
        popular: true,
        level: 'pro',
    },
    {
        name: 'AI Mastermind',
        price: '$19.99',
        features: [
            { text: 'Unlimited credits/month', icon: HiOutlineCurrencyDollar },
            { text: 'Custom templates', icon: HiOutlineTemplate },
            { text: '24/7 email support', icon: HiOutlineMail },
            { text: 'Post reminders', icon: HiOutlineBell },
            { text: 'Unlimited History', icon: InfinityIcon },
        ],
        color: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-300 hover:to-blue-200',
        buttonColor: 'bg-blue-500 hover:bg-blue-600',
        level: 'mastermind',
    },
]

const BillingPage = () => {
    const { subscriptionLevel, setSubscriptionLevel } = useSubscription()
    const router = useRouter()

    const handleUpgrade = (level: string) => {
        // Here you would integrate with your payment gateway
        // For now, we'll just update the subscription level

        // @ts-ignore
        setSubscriptionLevel(level)
        alert(`Upgraded to ${level} plan!`)
        router.push('/dashboard')
    }

    const botVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                }
            }
        }
    };

    return (
        <section className="bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <motion.div 
                className="absolute text-6xl text-indigo-400 opacity-20"
                variants={botVariants}
                animate="animate"
                style={{ top: '10%', left: '10%' }}
            >
                <FaRobot />
            </motion.div>
            <motion.div 
                className="absolute text-6xl text-pink-400 opacity-20"
                variants={botVariants}
                animate="animate"
                style={{ bottom: '10%', right: '10%' }}
            >
                <FaRobot />
            </motion.div>
            <div className="py-8 sm:pt-16 z-10">
                <article className="max-w-4xl mx-auto text-center">
                    <h2 className="text-base font-semibold leading-7 text-pink-600">Unleash Your Content Potential</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Choose Your Perfect Plan</p>
                </article>
                <p className="text-gray-600 max-w-2xl mx-auto text-center text-lg leading-8 mt-6">
                    Select the ideal Content Blox plan to supercharge your creativity and productivity.
                </p>
            </div>
            <div className="space-y-4 mb-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl xl:max-w-none xl:mx-0">
                {plans.map((plan) => (
                    <PricingCard
                        key={plan.name}
                        title={plan.name}
                        price={plan.price}
                        description={plan.name === 'AI Mastermind' ? 'Tailored for your business' : 'per month'}
                        features={plan.features.map(feature => ({
                            icon: <feature.icon className="h-5 w-5" />,
                            text: feature.text,
                            available: true
                        }))}
                        buttonText={subscriptionLevel === plan.level ? 'Current Plan' : `Upgrade to ${plan.name}`}
                        buttonColor={plan.buttonColor}
                        cardStyle={`${plan.color} ${plan.popular ? 'ring-4 ring-indigo-300' : ''}`}
                        isPro={plan.popular}
                        onButtonClick={() => handleUpgrade(plan.level)}
                        loading={false}
                        hasActiveMembership={subscriptionLevel === plan.level}
                    />
                ))}
            </div>
        </section>
    )
}

interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    features: { icon: React.ReactElement; text: string; available: boolean; }[];
    buttonText: string;
    buttonColor: string;
    cardStyle: string;
    isPro?: boolean;
    onButtonClick: () => void;
    loading: boolean;
    hasActiveMembership: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
    title, 
    description, 
    price, 
    features, 
    buttonText, 
    buttonColor, 
    cardStyle, 
    isPro = false, 
    onButtonClick,
    loading,
    hasActiveMembership 
}) => (
    <motion.div 
        className={`rounded-3xl p-8 shadow-lg relative ${cardStyle}`}
        whileHover={{ scale: isPro ? 1.1 : 1.05 }}
        whileTap={{ scale: isPro ? 1.05 : 0.95 }}
    >
        <h3 className='text-2xl font-bold text-center text-indigo-600'>{title}</h3>
        <p className='mt-2 text-3xl font-bold text-center text-indigo-600'>{price}</p>
        <p className='mt-1 text-center text-slate-800'>{description}</p>
        {isPro && <p className="text-center text-cyan-400 absolute top-0 left-0 bg-white shadow-md shadow-pink-300 rounded-br-lg rounded-tl-3xl py-1 px-2 font-semibold">Most Popular</p>}
        <ul className="mt-6 space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <span className="mr-2 flex-shrink-0">{feature.icon}</span>
                    <span className='text-gray-800'>{feature.text}</span>
                </li>
            ))}
        </ul>
        <Button 
            onClick={onButtonClick}
            className={`mt-8 w-full py-3 rounded-md text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColor}`}
            disabled={loading || hasActiveMembership}
        >
            {loading ? 'Processing...' : buttonText}
        </Button>
    </motion.div>
);

export default BillingPage
