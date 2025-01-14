import { defineStore } from 'pinia'
import { PushNotifications } from '@capacitor/push-notifications'
import {supabase} from "@/core/supabase/config";

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        pushToken: null as string | null,
    }),

    actions: {
        async initPushNotifications() {
            let permStatus = await PushNotifications.checkPermissions();

            if (permStatus.receive === 'prompt') {
                permStatus = await PushNotifications.requestPermissions();
            }

            if (permStatus.receive !== 'granted') {
                throw new Error('User denied permissions!');
            }

            await PushNotifications.register();

            await PushNotifications.addListener('registration', async (token) => {
                this.pushToken = token.value;
                console.log('Push Token:', token.value);
                await this.savePushToken(token.value);
            });
        },

        async savePushToken(token: string) {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { error } = await supabase
                    .from('device_tokens')
                    .upsert({
                        user_id: user.id,
                        push_token: token,
                        created_at: new Date()
                    })

                if (error) {
                    console.error('Erreur sauvegarde token:', error)
                }
            }
        }
    }
})