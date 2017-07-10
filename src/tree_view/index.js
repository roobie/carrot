const html = require('bel')
const microcomponent = require('microcomponent')
const csjs = require('csjs')

const akeymirror = require('akeymirror')

const styles = csjs`
.node {
  background: red;
}

.node .title {
  background: blue;
}

.root {
  background: violet;
}

.child {
  margin-left: 5px;
}
`

module.exports = treeViewComponent

treeViewComponent.EVENTS = akeymirror([
  'onNodeClick'
])

treeViewComponent.defs = {
  node: {
    title: 'string',
    children: 'array<node>'
  }
}

treeViewComponent.styles = styles

function treeViewComponent () {
  const component = microcomponent({
    name: 'carrot::TreeView',
    props: {
      level: 0,
      tree: {}
    },
    state: {
      foldState: 'folded'
    },
  })

  component.on('render', render)
  component.on('update', update)
  component.on('load', load)
  component.on('unload', unload)

  return component

  function render () {
    const node = this.props.tree
    const subTree = (childNode) => treeViewComponent().render({
      level: this.props.level + 1,
      tree: childNode
    })

    return html`
    <div class="${styles.node} ${this.props.level === 0 ? styles.root : styles.child}">
      <div class="${styles.title}">${node.title}</div>
      ${(node.children || []).map(subTree)}
    </div>`
  }

  function update (props) {
    return props.tree !== this.props.tree
  }

  function load () {
    console.log('mounted on DOM')
  }

  function unload () {
    console.log('removed from DOM')
  }
}
