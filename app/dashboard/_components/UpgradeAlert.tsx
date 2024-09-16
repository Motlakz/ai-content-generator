import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'

interface UpgradeAlertProps {
    isOpen: boolean;
    onClose: () => void;
}

const UpgradeAlert: React.FC<UpgradeAlertProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    const handleUpgrade = () => {
        router.push('/dashboard/billing');
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="p-0 overflow-hidden bg-transparent border-none">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-2 text-gray-200 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <AlertDialogTitle className="text-2xl font-bold mb-4 text-white">Credit Limit Exceeded</AlertDialogTitle>
                            <AlertDialogDescription className="mb-6 text-gray-200">
                                You have reached the maximum credits for your current plan. 
                                Upgrade now to continue generating content and unlock more features!
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleUpgrade}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Upgrade Plan
                                </motion.button>
                            </AlertDialogFooter>
                        </motion.div>
                    )}
                </AnimatePresence>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UpgradeAlert
