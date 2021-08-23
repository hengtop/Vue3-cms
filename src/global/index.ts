import { App } from 'vue';
import { registerElementPlus } from './register-element-plus';

export default function (app: App): void {
  app.use(registerElementPlus);
}
