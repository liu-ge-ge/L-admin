<template>
  <a-modal v-model:visible="props.visible" title="权限分配" @ok="ok" @cancel="emits('cancel')">
    <a-tree
      @checked="checked"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys"
      checkable
      :tree-data="treeData"
    >
      <template #title="{ meta }">
        <span v-if="meta.id === '00'" style="color: #1890ff">{{ meta.title }}</span>
        <template v-else>{{ meta.title }}</template>
      </template>
    </a-tree>
  </a-modal>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
interface RoleProps {
  visible: boolean
}

interface RoleEmits {
  (e: 'cancel'): void
}

const props = defineProps<RoleProps>()

const emits = defineEmits<RoleEmits>()

const store = useUserStore()
const { routeList } = storeToRefs(store)

console.log(routeList, 'routeList')
const home = routeList.value[0].children
const treeData = home ? home[0]['children'] : []

const expandedKeys = ref<string[]>(['0-0', '0-1', '0-2'])
const selectedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>(['0-0-0', '0-1-0', '0-2-0'])
let permissionArr = ref<string[]>([])

const ok = () => {
  console.log(checkedKeys, 'checkKey')
}

const checked = () => {}

const deepPermission = (treeData: any, arr: string[], isInit = true): string => {
  if (arr.length >= 3 && isInit) {
    return deepPermission(treeData[Number(arr[1])].children, arr.splice(2), false)
  } else {
    if (arr.length == 1) {
      //递归终止
      return treeData[Number(arr[0])].name
    } else {
      //递归继续
      return deepChildren(treeData[Number(arr[0])], arr)
    }
  }
}

const deepChildren = (data: any[], arr: string[]): string => {
  if (arr.length == 1) {
    return data[Number(arr[0])].name
  } else {
    return deepChildren(data[Number(arr[0])].children, arr.splice(1))
  }
}

watch(checkedKeys, () => {
  permissionArr.value = []
  let levelThree = checkedKeys.value.filter((item) => item.length > 3)
  let splitArr = levelThree.map((item) => item.split('-'))
  splitArr.forEach((item) => {
    permissionArr.value.push(deepPermission(treeData, item))
  })
  console.log(permissionArr, 'permisssionArrr')
})
</script>
