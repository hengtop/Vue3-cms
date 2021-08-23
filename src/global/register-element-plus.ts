//按需引入element-plus
import { App } from 'vue';
import 'element-plus/lib/theme-chalk/base.css';
import { ElButton } from 'element-plus';

const components = [ElButton];

export function registerElementPlus(app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
