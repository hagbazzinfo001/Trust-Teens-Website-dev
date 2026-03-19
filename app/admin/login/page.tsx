'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, ArrowLeft, Mail, KeyRound, ShieldCheck } from 'lucide-react';

type AuthStep = 'login' | 'forgot' | 'otp' | 'reset';

export default function AdminLoginPage() {
    const { login, forgotPassword, verifyOtp, resetPassword } = useAdmin();
    const router = useRouter();

    // Shared state
    const [step, setStep] = useState<AuthStep>('login');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Login state
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // OTP state
    const [otp, setOtp] = useState('');

    // Reset state
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const clearMessages = () => {
        setError('');
        setSuccessMessage('');
    };

    const goBackToLogin = () => {
        setStep('login');
        setOtp('');
        setResetToken('');
        setNewPassword('');
        setConfirmNewPassword('');
        clearMessages();
    };

    // ── Login ──
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);

        const success = await login(email, password);
        if (success) {
            router.push('/admin');
        } else {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    // ── Forgot Password ──
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);

        const result = await forgotPassword(email);
        if (result.success) {
            setSuccessMessage(result.message);
            setStep('otp');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    // ── Verify OTP ──
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);

        const result = await verifyOtp(email, otp);
        if (result.success && result.resetToken) {
            setResetToken(result.resetToken);
            setSuccessMessage(result.message);
            setStep('reset');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    // ── Reset Password ──
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        const result = await resetPassword(email, resetToken, newPassword, confirmNewPassword);
        if (result.success) {
            setSuccessMessage(result.message + ' Redirecting to login…');
            setTimeout(() => goBackToLogin(), 2000);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    // ── Header icon per step ──
    const stepConfig: Record<AuthStep, { icon: React.ReactNode; title: string; subtitle: string }> = {
        login: {
            icon: <Lock className="w-8 h-8 text-white" />,
            title: 'Trust Teens Admin',
            subtitle: 'Sign in to manage your content',
        },
        forgot: {
            icon: <Mail className="w-8 h-8 text-white" />,
            title: 'Forgot Password',
            subtitle: 'Enter your email to receive an OTP',
        },
        otp: {
            icon: <ShieldCheck className="w-8 h-8 text-white" />,
            title: 'Verify OTP',
            subtitle: 'Enter the 6-digit code sent to your email',
        },
        reset: {
            icon: <KeyRound className="w-8 h-8 text-white" />,
            title: 'Reset Password',
            subtitle: 'Create a new password for your account',
        },
    };

    const current = stepConfig[step];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="w-full max-w-md mx-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500 mb-4">
                        {current.icon}
                    </div>
                    <h1 className="text-2xl font-bold text-white">{current.title}</h1>
                    <p className="text-gray-400 mt-1">{current.subtitle}</p>
                </div>

                {/* Card */}
                <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
                    {/* Messages */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-5">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 text-sm mb-5">
                            {successMessage}
                        </div>
                    )}

                    {/* ── LOGIN FORM ── */}
                    {step === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>

                            <button
                                type="button"
                                onClick={() => { clearMessages(); setStep('forgot'); }}
                                className="w-full text-center text-sm text-orange-400 hover:text-orange-300 transition-colors mt-2"
                            >
                                Forgot Password?
                            </button>
                        </form>
                    )}

                    {/* ── FORGOT PASSWORD FORM ── */}
                    {step === 'forgot' && (
                        <form onSubmit={handleForgotPassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>

                            <button
                                type="button"
                                onClick={goBackToLogin}
                                className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-2"
                            >
                                <ArrowLeft size={16} />
                                Back to Login
                            </button>
                        </form>
                    )}

                    {/* ── OTP VERIFICATION FORM ── */}
                    {step === 'otp' && (
                        <form onSubmit={handleVerifyOtp} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    6-Digit OTP Code
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                        setOtp(val);
                                    }}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-center text-2xl tracking-[0.5em] font-mono"
                                    placeholder="000000"
                                    maxLength={6}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Check your email <span className="text-gray-300">{email}</span> for the code.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>

                            <button
                                type="button"
                                onClick={goBackToLogin}
                                className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-2"
                            >
                                <ArrowLeft size={16} />
                                Back to Login
                            </button>
                        </form>
                    )}

                    {/* ── RESET PASSWORD FORM ── */}
                    {step === 'reset' && (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
                                        placeholder="Min. 8 characters"
                                        minLength={8}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
                                        placeholder="Re-enter your password"
                                        minLength={8}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>

                            <button
                                type="button"
                                onClick={goBackToLogin}
                                className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-2"
                            >
                                <ArrowLeft size={16} />
                                Back to Login
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-gray-500 text-xs mt-6">
                    Trust Teens © {new Date().getFullYear()}. Admin Portal.
                </p>
            </div>
        </div>
    );
}
