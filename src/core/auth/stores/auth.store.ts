import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/core/supabase/config';
import type { User } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);

  const login = async (email: string, password: string) => {
    const { data: { user: loggedInUser }, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    isAuthenticated.value = !!loggedInUser;
    user.value = loggedInUser;
  };

  const register = async (email: string, password: string) => {
    const { data: { user: registeredUser }, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    isAuthenticated.value = !!registeredUser;
    user.value = registeredUser;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    console.log('User logged out');
    isAuthenticated.value = false;
    user.value = null;
  };

  const checkAuth = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    isAuthenticated.value = !!currentUser;
    user.value = currentUser;
  };

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    checkAuth,
  };
});