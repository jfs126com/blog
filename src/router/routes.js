
export default[
  {
    name:'Login',
    path:'/login/:login',
    component:resolve=>require.ensure([],()=>resolve(require('@/views/Login.vue')),'Login'),
  },
  {
    path:'/blog',
    component:resolve => require.ensure([],() => resolve(require('@/views/Blog.vue')),'Blog'),
    redirect:'/blog/home',
    children:[{
      name:'Home',
      path:'home',
      component:resolve => require.ensure([],() => resolve(require('@/views/Home.vue')),'Home'),
    },{
      name:'Article',
      path:'article',
      meta: {
        requireAuth: true,
      },
      component:resolve => require.ensure([],()=>resolve(require('@/views/Article.vue')),'Article'),
    },{
      name:'Note',
      path:'note',
      meta: {
        requireAuth: true,
      },
      component:resolve => require.ensure([],()=>resolve(require('@/views/Note.vue')),'Note'),
    },{
      name:'Edit',
      path:'edit',
      meta: {
        requireAuth: true,
      },
      component:resolve => require.ensure([],()=>resolve(require('@/views/Edit.vue')),'Edit'),
    },{
      name:'AboutMe',
      path:'aboutMe',
      meta: {
        requireAuth: true,
      },
      component:resolve => require.ensure([],()=>resolve(require('@/views/AboutMe.vue')),'AboutMe'),
    },{
      name:'BlogDetail',
      path:'blogDetail/:number',
      component:resolve=>require(['@/views/BlogDetail.vue'],resolve)
    }]
  }
]



