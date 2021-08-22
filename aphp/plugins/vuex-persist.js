import VuexPersistence from 'vuex-persist'
 
export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: `store-${process.env.authSalt || 'static'}`
    }).plugin(store);
  });
}