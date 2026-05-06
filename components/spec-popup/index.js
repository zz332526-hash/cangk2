Component({
  properties: {
    visible: Boolean,
    groups: Array,
    basePrice: Number
  },
  data: {
    renderGroups: [],
    selectedMap: {},
    selectedText: '',
    totalPrice: '0.00'
  },
  observers: {
    visible(v) {
      if (v) this.initSelection()
    }
  },
  methods: {
    noop() {},
    initSelection() {
      const groups = (this.properties.groups || []).map(g => ({ ...g, options: g.options.map(o => ({ ...o, checked: false })) }))
      const selectedMap = {}
      groups.forEach(group => {
        if (group.type === 'single' && group.options[0]) {
          group.options[0].checked = true
          selectedMap[group.name] = [{ name: group.options[0].name, price: group.options[0].price }]
        } else {
          selectedMap[group.name] = []
        }
      })
      this.setData({ renderGroups: groups, selectedMap }, () => this.updateSummary())
    },
    onToggle(e) {
      const { gidx, oidx } = e.currentTarget.dataset
      const groups = this.data.renderGroups
      const group = groups[gidx]
      const option = group.options[oidx]
      if (group.type === 'single') {
        group.options.forEach(v => (v.checked = false))
        option.checked = true
      } else {
        option.checked = !option.checked
      }
      const selectedMap = { ...this.data.selectedMap }
      selectedMap[group.name] = group.options.filter(v => v.checked).map(v => ({ name: v.name, price: Number(v.price || 0) }))
      this.setData({ renderGroups: groups, selectedMap }, () => this.updateSummary())
    },
    updateSummary() {
      let total = Number(this.properties.basePrice || 0)
      const names = []
      Object.values(this.data.selectedMap).forEach(list => {
        list.forEach(v => {
          total += Number(v.price || 0)
          names.push(v.name)
        })
      })
      this.setData({ totalPrice: total.toFixed(2), selectedText: names.join(' / ') })
    },
    onClose() { this.triggerEvent('close') },
    onAdd() {
      this.triggerEvent('confirm', { selectedMap: this.data.selectedMap, selectedText: this.data.selectedText, totalPrice: Number(this.data.totalPrice) })
    }
  }
})
