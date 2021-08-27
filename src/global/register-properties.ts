import { App } from 'vue';
import { formatUtcString } from '@/utils/date-format';
//定义全局的过滤器函数
export function registerProperties(app: App): void {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value);
    }
  };
}
