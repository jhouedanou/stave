export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    if (to.path === '/quizz') {
      document.body.classList.add('zequestion')
    } else if(to.path==='/resutats'){
            document.body.classList.add('zeresultat')
    }else {
      document.body.classList.remove('zequestion')
    }
  }
})
