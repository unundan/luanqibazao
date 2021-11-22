import React from 'react';
import { getOne } from '../lib/Picture';

class Index extends React.Component<{
  pickDir: string,
}> {
  render() {
    if (this.props.pickDir) {
      return <img src={this.props.pickDir}/>
    } else {
      return <div>连个图片都没有看毛线</div>
    }
  }
}
export function getServerSideProps() {
  const pic = getOne();
  let pickDir;
  if (pic) {
    pickDir = `/random-pick/${pic.name}`;
  }
  return { props: { pickDir } }
}
export default Index;