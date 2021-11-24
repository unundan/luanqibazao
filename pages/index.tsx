import React from 'react';
import { getOne } from '../lib/Picture';

class Index extends React.Component<{
  pickDir: string,
}> {
  render() {
    return <div style={{ position:'fixed', display: 'flex', width: '100%', height: '100%', overflow: 'auto' }}>
      {this.props.pickDir ? <img style={{ margin: 'auto' }} src={this.props.pickDir} /> : <div>连个图片都没有看毛线</div>}
    </div>
  }
}
export function getServerSideProps() {
  const pic = getOne();
  let pickDir = null;
  if (pic) {
    pickDir = `/random-pick/${pic.name}`;
  }
  return { props: { pickDir } }
}
export default Index;