/*
 * 控制并发数
 *
 * @Author: xiaoguang_10@qq.com
 * @Date: 2020-04-01 23:25:02
 * @Last Modified by: xiaoguang@yzyw-inc.com
 * @Last Modified time: 2020-04-01 23:25:50
 */

interface CTOption {
  number?: number; // 并发量
  list?: []; // 任务队列(包含Promise对象的数组)
  success?: Function; // 每个任务成功后执行的方法
  fail?: Function;  // 每个任务失败后执行的方法
  finally?: Function; // 每个任务完成后执行的方法
}
export default class CT {
  totalTaskCount: number = 0; // 异步队列长度
  executedCount: number = 0; // 已执行操作数
  taskQueue: Array<any> = []; // 任务队列
  execQueue: Array<any> = []; // 执行队列
  option: CTOption; // 构造函数配置
  resolve: Function = function() {}; // 并发操作完成后执行
  constructor(option) {
    this.option = option;
    this.init();
  }
  init() {
    this.option.number = this.option.number || 5; // 默认并发量为5
    this.option.list = this.option.list || [];
    this.totalTaskCount = this.option.list.length;
    this.taskQueue = this.option.list.map((item: any, index) => {
      item.__index = index;
      return item;
    });
    // 初始化执行队列
    this.execQueue = this.taskQueue.splice(0, this.option.number);
  }
  start() {
    return new Promise((resolve, reject) => {
      try {
        this.resolve = resolve;
        // 遍历执行队列
        this.execQueue.forEach((item: any) => {
          // 并发执行
          this.exec(item);
        });
      } catch(err) {
        reject(err);
      }
    });
  }
  exec(task) {
    try {
      task().then(res => {
        typeof this.option.success === 'function' && this.option.success(task.__index);
      }).catch(err => {
        typeof this.option.fail === 'function' && this.option.fail(task.__index);
      }).finally(() => {
        typeof this.option.finally === 'function' && this.option.finally(task.__index);
        let newTask = this.taskQueue.splice(0, 1)[0];
        if (newTask) {
          // 递归调用（从任务队列中，取第一个插入到执行队列；保持并发量）
          this.exec(newTask);
        }
        // 每次执行完毕后，自增已执行次数
        this.executedCount++;
        // 判断任务是否全部执行完毕
        if (this.executedCount >= this.totalTaskCount) {
          // 清空相关数据
          this.execQueue = [];
          // 并发任务处理完毕，将Promise状态置为resolve
          typeof this.resolve === 'function' && this.resolve();
        }
      });
    } catch(err) {
      console.log(err);
    }
  }
}
