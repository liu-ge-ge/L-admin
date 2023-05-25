<template>
  <div class="setting">
    <div class="left">
      <slot name="plusTitle"></slot>
    </div>
    <div class="right" v-if="props.isShowTools">
      <a-tooltip placement="topLeft">
        <template #title>
          <span>刷新</span>
        </template>
        <reload-outlined @click="refresh" style="color: var(--ant-primary-color)" />
      </a-tooltip>
      <a-tooltip placement="topLeft">
        <template #title>
          <span>表格设置</span>
        </template>
        <setting-outlined
          style="color: var(--ant-primary-color); margin: 0 20px"
          @click="() => (isShowCol = !isShowCol)"
        />
      </a-tooltip>

      <a-tooltip placement="topLeft">
        <template #title>
          <span>全屏查看</span>
        </template>
        <fullscreen-outlined style="color: var(--ant-primary-color); margin-right: 20px" @click="toggleFullscreen" />
      </a-tooltip>

      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-tooltip placement="topLeft">
            <template #title>
              <span>表格大小</span>
            </template>
            <column-height-outlined style="color: var(--ant-primary-color)" />
          </a-tooltip>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="() => (tableSize = 'default')">默认</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="() => (tableSize = 'middle')">中等</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="() => (tableSize = 'small')">紧凑</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <transition name="col">
        <div class="checkBox" v-show="isShowCol">
          <div class="top">
            <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
              列展示
            </a-checkbox>
            <a @click="reset">重置</a>
          </div>
          <div class="bottom div-center">
            <a-checkbox-group @change="checkboxChange" v-model:value="checkedList" style="width: 100%">
              <div class="div-center div-item" v-for="(item, index) in plainOptions" :key="item">
                <a-checkbox :value="item">{{ item }}</a-checkbox>
                <div class="div-center">
                  <a-tooltip placement="topLeft">
                    <template #title>
                      <span>固定在左侧</span>
                    </template>
                    <vertical-right-outlined
                      @click="colChangeLR(index, 'left', item)"
                      style="margin-right: 10px"
                      :style="{ color: operate[index] == 'left' ? 'var(--ant-primary-color)' : '' }"
                    />
                  </a-tooltip>

                  <a-tooltip placement="topLeft">
                    <template #title>
                      <span>固定在右侧</span>
                    </template>
                    <vertical-left-outlined
                      @click="colChangeLR(index, 'right', item)"
                      :style="{ color: operate[index] == 'right' ? 'var(--ant-primary-color)' : '' }"
                    />
                  </a-tooltip>
                </div>
              </div>
            </a-checkbox-group>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <a-table
    :id="id"
    :scroll="{ y: tableHeight }"
    :data-source="props.dataSource"
    :columns="columns"
    :key="tableKey"
    v-bind="$attrs"
    :pagination="props.pagination"
    :size="tableSize"
  >
    <template v-for="k in Object.keys($slots)" v-slot:[k]="data" :key="k">
      <slot :name="k" v-bind="data"></slot>
    </template>
  </a-table>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { onMounted, reactive, ref, watch, useAttrs, useSlots } from 'vue'
import type { TablePlusProps } from './type'
import screenfull from 'screenfull'
import { uuid } from '@/utils'
const $attrs = useAttrs()
const $slots = useSlots()
console.log($slots)
let props = defineProps<TablePlusProps>()
const id = uuid(16, 16)

// 表格高度
let tableHeight = ref(0)
let isShowCol = ref(false)
let tableKey = ref(uuid(16, 16)) //用于刷新表格重新渲染
let operate = ref<string[]>([]) //列改变到最左/最右 保存操作
let tableSize = ref('large') //表格大小

const plainOptions = ref<Array<string>>([])
let indeterminate = ref(true)
let checkAll = ref(true)
let checkedList = ref<string[]>([])

const onCheckAllChange = (e: any) => {
  checkedList.value = e.target.checked ? plainOptions.value : []
  indeterminate.value = false
}

watch(
  () => checkedList.value,
  (val) => {
    indeterminate.value = !!val.length && val.length < plainOptions.value.length
    checkAll.value = val.length === plainOptions.value.length
  }
)

// 重置显示列
const reset = () => {
  checkedList.value = plainOptions.value
  indeterminate.value = false
  checkboxChange(checkedList.value)
  titleListPush()
}

const colChangeLR = (index: number, direction: string, col: string): void => {
  let columnsIndex = columns.findIndex((item) => item.title == col) //查找在数据中的索引位置
  if (operate.value[index] === direction) {
    let sourceIndex = sourceColumns.findIndex((item) => item.title == col) //查找在源数据中的索引位置
    //取消
    operate.value[index] = ''
    columns.splice(columnsIndex, 1)
    columns.splice(sourceIndex, 0, sourceColumns[sourceIndex])
  } else {
    //设置
    operate.value[index] = direction
    if (direction === 'left') {
      let item = columns[columnsIndex]
      columns.splice(columnsIndex, 1)
      columns.unshift(item) //插入到最左边
    } else {
      let item = columns[columnsIndex]
      columns.splice(columnsIndex, 1)
      columns.push(item) //插入到最右边
    }
  }
  refresh()
}

const sourceColumns = props.columns as Array<any>
let columns = reactive([...sourceColumns])
// 取消或显示哪一列
const checkboxChange = (e: string[]): void => {
  columns = sourceColumns.filter((item) => {
    return e.indexOf(item.title) !== -1 || item.customRender
  })
  refresh()
}
// 刷新table
const refresh = () => {
  tableKey.value = tableKey.value + '1'
}

//遍历所有colmns dataIndex
const colContent = () => {
  columns.forEach((item) => {
    if (item.dataIndex || item.key) {
      plainOptions.value.push(item.title)
    }
  })
  checkedList.value = [...plainOptions.value]
}
colContent()

//所有title
const titleListPush = () => {
  operate.value = []
  let length = sourceColumns.length
  operate.value = new Array(length)
}

const toggleFullscreen = () => {
  const ele = document.getElementById(id) as HTMLElement | undefined //指定全屏区域元素
  if (screenfull.isEnabled) {
    screenfull.request(ele)
  }
}

// 当页面显示的数据多时改变表格高度
onMounted(() => {
  tableHeight.value = Math.ceil(document.body.clientHeight * 0.55)
  window.addEventListener('resize', () => {
    tableHeight.value = Math.ceil(document.body.clientHeight * 0.55)
  })
})
</script>
<style lang="less">
// .ant-table-pagination.ant-pagination {
//   margin: 16px 130px;
// }
.setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .right {
    position: relative;
    .checkBox {
      z-index: 9;
      position: absolute;
      top: 40px;
      right: 0;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 0 3px @primary-color;
      width: 200px;
      background-color: @system-content;
      color: @system-text-color;
      .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #eee;
      }
      .bottom {
        width: 100%;
        .div-item {
          margin-bottom: 5px;
        }
      }
    }
  }
}

.col-enter-from,
.col-leave-to {
  opacity: 0;
}
.col-center-to,
.col-leave-from {
  opacity: 1;
}
.col-enter-active,
.col-leave-active {
  transition: opacity 1s ease;
}

.col-enter-active {
  animation: bounce 1s ease;
}

.col-leave-active {
  animation: lik 1s ease;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lik {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
