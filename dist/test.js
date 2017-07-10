
document.addEventListener('DOMContentLoaded', () => {
  const containerElement = document.querySelector('#main')

  const treeView = carrot.treeView()
  containerElement.appendChild(treeView.render({
    tree: {
      title: 'Hello',
      children: [
        {
          title: 'World!',
          children: [
            {
              title: 'Some',
              children: [
                {
                  title: 'things'
                }
              ]
            }
          ]
        }
      ]
    }
  }))

  const css = csjs.getCss(carrot.treeView.styles)
  styleElement = document.createElement('style')
  styleElement.textContent = css

  document.head.appendChild(styleElement)
})
