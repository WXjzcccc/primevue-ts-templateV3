import { defineStore } from 'pinia';
import { GreetService } from '../../../bindings/changeme/services';

interface GreetState {
    message: string;
    loading: boolean;
    error: string | null;
}

export const useGreetStore = defineStore('greet', {
    state: (): GreetState => ({
        message: '',
        loading: false,
        error: null,
    }),
    actions: {
        async fetchGreet(name: string) {
            this.loading = true;
            this.error = null;
            try {
                this.message = await GreetService.Greet(name);
            } catch (err) {
                this.error = err instanceof Error ? err.message : '获取欢迎信息失败';
            } finally {
                this.loading = false;
            }
        },
    },
});
