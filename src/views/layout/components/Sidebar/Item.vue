<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if(title == '攻击分析'){
        vnodes.push(<svg-icon style="font-size:16px" icon-class={icon}/>)
      }else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
      
    }

    if (title) {
      
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
