import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useStore } from '../store/useStore';
import Navbar from '../components/Navbar';
import ReferralCard from '../components/ReferralCard';
import StatsCard from '../components/StatsCard';
import PurchaseButton from '../components/PurchaseButton';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const { user, referrals, credits, setReferrals, setCredits, setUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    // Check for token if user is null (persistence)
    const token = localStorage.getItem('token');
    if (!user && !token) {
      router.push('/login');
      return;
    }

    // If we have a token but no user, we might want to fetch profile (optional, but good practice)
    // For now, we assume if user is null but token exists, we might need to re-fetch or just let the API calls fail/redirect

    const fetchData = async () => {
      try {
        // If user is missing but token exists, try to fetch profile first
        if (!user && token) {
          try {
            const profileRes = await api.get('/auth/profile');
            setUser(profileRes.data.data.user);
          } catch (e) {
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
        }

        const [referralsRes, statsRes] = await Promise.all([
          api.get('/referral/referred-users'),
          api.get('/referral/stats'),
        ]);

        setReferrals(referralsRes.data.data);
        setCredits(statsRes.data.data.totalCreditsEarned);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // If 401, redirect to login
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push('/login');
        }
      }
    };

    fetchData();
  }, [user, router, setReferrals, setCredits, setUser]);

  if (!user) return null;

  const totalReferred = referrals.length;
  const convertedUsers = referrals.filter((r) => r.status === 'converted').length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard title="Total Referred Users" value={totalReferred} icon="👥" />
          <StatsCard title="Converted Users" value={convertedUsers} icon="✅" />
          <StatsCard title="Total Credits Earned" value={credits} icon="💰" />
        </div>
        <ReferralCard />
        <div className="mt-6">
          <PurchaseButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
