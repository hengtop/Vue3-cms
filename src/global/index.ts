import type { App } from 'vue';
import { registerElementPlus } from './register-element-plus';
import { registerProperties } from './register-properties';

export default function (app: App): void {
  app.use(registerElementPlus);
  app.use(registerProperties);
}
