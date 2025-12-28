import loading from '../../img/loading.svg';

import Styles from './Loading.module.css';

function Loading() {
  return (
    <div className={Styles.loader_container}>
      <img className={Styles.loader} src={loading} alt='Loading'/>
    </div>
  );
}

export default Loading;