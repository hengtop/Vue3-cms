import * as echarts from 'echarts';
//注册中国地图
import chinaMapData from '../data/china.json';

echarts.registerMap('china', chinaMapData);

export const useEchart = (el: HTMLElement) => {
  const echartInstance = echarts.init(el);
  const setOptions = (option: echarts.EChartsOption) => {
    echartInstance.setOption(option);
  };

  //监听浏览器尺寸变化
  window.addEventListener('resize', function () {
    echartInstance.resize();
  });
  //主动调用函数重新调整尺寸
  const setResize = () => {
    echartInstance.resize();
  };

  return {
    echartInstance,
    setOptions,
    setResize
  };
};
