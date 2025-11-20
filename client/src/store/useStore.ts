import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  credits: number;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'converted';
  joinedAt: string;
}

interface Store {
  user: User | null;
  referrals: Referral[];
  credits: number;
  setUser: (user: User | null) => void;
  setReferrals: (referrals: Referral[]) => void;
  setCredits: (credits: number) => void;
  logout: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  referrals: [],
  credits: 0,
  setUser: (user) => set({ user }),
  setReferrals: (referrals) => set({ referrals }),
  setCredits: (credits) => set({ credits }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, referrals: [], credits: 0 });
  },
}));
