module.exports = {
  transpileDependencies: ['@editorjs/editorjs'],
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Jonah Butler Dev'
      return args
    })
  }
}
