import React from 'react';
// 把getOne方法从其他模块导入
import { getOne } from '../lib/Picture';

class Index extends React.Component<{
  pickDir: string,
}> {
  render() {
    // react  jsx(tsx)语法, 返回一个div元素 <div></div> 包裹的内容作为子元素,整体返回
    return <div style={{ position:'fixed', display: 'flex', width: '100%', height: '100%', overflow: 'auto' }}>
      { // {大括号, react 语法,表示接下来的内容是表达式
        // 三元运算符, js语法, 如果 this.props.pickDir是有值的, 返回一个img元素, 否则返回一个div元素
        // <img 标签, src属性设置图片地址, 这里 src=this.props.pickDir. 我们已经在下面导出一个方法,在服务器渲染时已经获得了返回值.这里可以直接使用.
        this.props.pickDir ? <img style={{ margin: 'auto' }} src={this.props.pickDir} /> : <div>连个图片都没有看毛线</div>
      }
    </div>
  }
}
// nextjs 框架约定方法, 该方法将在服务器执行,返回props用于服务器渲染页面
export function getServerSideProps(): { props: { pickDir: string }} {
  // 获取一个随机图片
  const pic = getOne();
  let pickDir: string = null;
  if (pic) {
    // 如果图片有值的话, 返回图片的http相对地址
    pickDir = `/random-pick/${pic.name}`;
  }
  // 返回对象
  return { props: { pickDir } }
}
// 导出这个React类,供React识别
export default Index;