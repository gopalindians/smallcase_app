import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

let router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
       meta: {
        title: 'Home • smallcase app',
        metaTags: [
          {
            name: 'description',
            content: 'Home page.'
          },
          {
            property: 'og:description',
            content: 'Home page.'
          }
        ]
},
    },
    {
      path: '/symbol/:id',
      name: 'symbol',
      // route level code-splitting
      // this generates a separate chunk (symbol.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "symbol" */ './views/Symbol.vue'),
      meta: {
        title: 'Symbol • smallcase app',
        metaTags: [
          {
            name: 'description',
            content: 'Symbol page.'
          },
          {
            property: 'og:description',
            content: 'Symbol page.'
          }
        ]
},
    },
    {
      path: '/favorites',
      name: 'favorites',
      // route level code-splitting
      // this generates a separate chunk (favorites.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "favorites" */ './views/Favorites.vue'),
      meta: {
        title: 'Favorites • smallcase app',
        metaTags: [
          {
            name: 'description',
            content: 'Your favorites'
          },
          {
            property: 'og:description',
            content: 'Your favorites'
          }
        ]
}},{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        title: 'About • smallcase app',
        metaTags: [
          {
            name: 'description',
            content: 'About'
          },
          {
            property: 'og:description',
            content: 'About'
          }
        ]
      }
    }

  ]
})

router.beforeEach((to, from, next) => {

  if (!to.matched.length) {
    next('/404');
  } else {
    next();
  }

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.

  console.log(to);
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
   console.log('%c ॐ+🤘 https://github.com/gopalindians ', 'background: #222; color: #bada55');

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));


  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');
    
    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});


export default router;
